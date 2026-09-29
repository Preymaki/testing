import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { MousePosition } from '../../hooks/useMousePosition';

interface CharacterProps {
  mousePos: MousePosition;
}

export const Character: React.FC<CharacterProps> = ({ mousePos }) => {
  const { scene } = useGLTF('/3D-model/sample.glb');
  const { viewport } = useThree();

  // Root container
  const rootRef = useRef<THREE.Group>(null);

  // References to bones
  const bonesRef = useRef<{
    root: THREE.Bone;
    chest: THREE.Bone;
    neck: THREE.Bone;
    head: THREE.Bone;
  } | null>(null);

  // References to dynamic 3D eyes
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);

  // Reference to rotating 3D MAKI IS KING crown diadem
  const crownSpinRef = useRef<THREE.Group>(null);

  // Saccade micro-glance state for realistic living gaze
  const saccadeRef = useRef({
    nextTime: 0,
    offsetX: 0,
    offsetY: 0,
  });

  // Construct SkinnedMesh with programmatic articulated bones on load
  const { skinnedMesh, bones, leftEyeGroup, rightEyeGroup, crownSpinnerGroup } = useMemo(() => {
    // Find the original mesh
    let originalMesh: THREE.Mesh | null = null;
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && !originalMesh) {
        originalMesh = child as THREE.Mesh;
      }
    });

    if (!originalMesh) {
      return {
        skinnedMesh: scene.clone(true),
        bones: null,
        leftEyeGroup: new THREE.Group(),
        rightEyeGroup: new THREE.Group(),
        crownSpinnerGroup: new THREE.Group(),
      };
    }

    const geom = (originalMesh as THREE.Mesh).geometry.clone();
    const posAttr = geom.attributes.position;
    const vertexCount = posAttr.count;

    // Create skinning indices and weights
    // Chin and jaw start at y = 0.10. Everything at and above y = 0.095 is 100% Head
    // to guarantee the mouth, lips, jaw, and face never stretch or distort.
    const skinIndices = new Float32Array(vertexCount * 4);
    const skinWeights = new Float32Array(vertexCount * 4);

    for (let i = 0; i < vertexCount; i++) {
      const y = posAttr.getY(i);
      let w0 = 0, w1 = 0, w2 = 0, w3 = 0;

      if (y < -0.12) {
        w0 = 1.0; // Lower torso
      } else if (y < 0.0) {
        const t = (y - (-0.12)) / 0.12;
        w0 = 1.0 - t;
        w1 = t; // Shoulders / chest
      } else if (y < 0.05) {
        const t = (y - 0.0) / 0.05;
        w1 = 1.0 - t;
        w2 = t; // Lower neck transition
      } else if (y < 0.095) {
        const t = (y - 0.05) / 0.045;
        w2 = 1.0 - t;
        w3 = t; // Upper neck to head transition
      } else {
        w3 = 1.0; // 100% HeadBone (chin, jaw, mouth, nose, eyes, skull)
      }

      skinIndices[i * 4] = 0;
      skinIndices[i * 4 + 1] = 1;
      skinIndices[i * 4 + 2] = 2;
      skinIndices[i * 4 + 3] = 3;

      skinWeights[i * 4] = w0;
      skinWeights[i * 4 + 1] = w1;
      skinWeights[i * 4 + 2] = w2;
      skinWeights[i * 4 + 3] = w3;
    }

    geom.setAttribute('skinIndex', new THREE.BufferAttribute(skinIndices, 4));
    geom.setAttribute('skinWeight', new THREE.BufferAttribute(skinWeights, 4));

    // Create anatomical bone hierarchy
    // Bone 0: Root / Pelvis anchor
    const rootBone = new THREE.Bone();
    rootBone.name = 'RootBone';
    rootBone.position.set(0, -0.35, 0);

    // Bone 1: Torso / Chest & Shoulders
    const chestBone = new THREE.Bone();
    chestBone.name = 'ChestBone';
    chestBone.position.set(0, 0.35, 0); // world y = 0.0
    rootBone.add(chestBone);

    // Bone 2: Neck
    const neckBone = new THREE.Bone();
    neckBone.name = 'NeckBone';
    neckBone.position.set(0, 0.05, 0.012); // world y = 0.05
    chestBone.add(neckBone);

    // Bone 3: Head (articulates head, face, eyes, jaw, mouth, hair)
    const headBone = new THREE.Bone();
    headBone.name = 'HeadBone';
    headBone.position.set(0, 0.045, 0.005); // world y = 0.095
    neckBone.add(headBone);

    // Setup material with enhanced PBR response
    const origMat = (originalMesh as THREE.Mesh).material;
    let material: THREE.MeshStandardMaterial;

    if (origMat instanceof THREE.MeshStandardMaterial) {
      material = origMat.clone();
    } else {
      material = new THREE.MeshStandardMaterial({
        map: (origMat as any)?.map || null,
      });
    }

    material.roughness = 0.55;
    material.metalness = 0.1;
    material.needsUpdate = true;

    // Create SkinnedMesh and bind skeleton
    const newSkinnedMesh = new THREE.SkinnedMesh(geom, material);
    newSkinnedMesh.castShadow = true;
    newSkinnedMesh.receiveShadow = true;

    const skeleton = new THREE.Skeleton([rootBone, chestBone, neckBone, headBone]);
    newSkinnedMesh.add(rootBone);
    newSkinnedMesh.bind(skeleton);

    // --- Dynamic 3D Eyes anchored inside the Head Bone ---
    // HeadBone world position is at [0, 0.095, 0.017]
    // Eye world positions: [-0.048, 0.238, 0.170] and [+0.049, 0.238, 0.170]
    // Local to HeadBone: y = 0.238 - 0.095 = 0.143, z = 0.170 - 0.017 = 0.153
    const leftEye = new THREE.Group();
    leftEye.position.set(-0.048, 0.143, 0.153);

    const rightEye = new THREE.Group();
    rightEye.position.set(0.049, 0.143, 0.153);

    // Function to create realistic eye pupil / iris disc with gloss
    const createEyeVisual = () => {
      const eyeGroup = new THREE.Group();

      // Iris disc with deep rich espresso/dark tone
      const irisGeom = new THREE.CircleGeometry(0.016, 24);
      const irisMat = new THREE.MeshStandardMaterial({
        color: '#1A0E08',
        roughness: 0.35,
        metalness: 0.2,
      });
      const irisMesh = new THREE.Mesh(irisGeom, irisMat);
      eyeGroup.add(irisMesh);

      // Pupil center - deep black
      const pupilGeom = new THREE.CircleGeometry(0.0075, 20);
      const pupilMat = new THREE.MeshBasicMaterial({ color: '#030303' });
      const pupilMesh = new THREE.Mesh(pupilGeom, pupilMat);
      pupilMesh.position.z = 0.001;
      eyeGroup.add(pupilMesh);

      // Specular cornea catchlight highlight - subtle white glint
      const catchlightGeom = new THREE.CircleGeometry(0.003, 12);
      const catchlightMat = new THREE.MeshBasicMaterial({
        color: '#FFFFFF',
        transparent: true,
        opacity: 0.85,
      });
      const catchlightMesh = new THREE.Mesh(catchlightGeom, catchlightMat);
      catchlightMesh.position.set(0.004, 0.004, 0.002);
      eyeGroup.add(catchlightMesh);

      return eyeGroup;
    };

    leftEye.add(createEyeVisual());
    rightEye.add(createEyeVisual());

    headBone.add(leftEye);
    headBone.add(rightEye);

    // --- 3D Floating Royal Crown: MAKI IS KING ---
    // Anchored directly to HeadBone so it turns, tilts, and tracks with Maki's head in 3D!
    const crownAnchor = new THREE.Group();
    crownAnchor.name = 'CrownAnchor';
    // Elevated atop the crest of the head / hair
    crownAnchor.position.set(0, 0.305, 0.018);
    crownAnchor.rotation.x = -0.08; // Regal sovereign tilt

    const crownSpinner = new THREE.Group();
    crownSpinner.name = 'CrownSpinner';
    crownAnchor.add(crownSpinner);

    // High-resolution canvas texture for the crown
    const crownCanvas = document.createElement('canvas');
    crownCanvas.width = 2048;
    crownCanvas.height = 512;
    const ctx = crownCanvas.getContext('2d');

    const drawCrownTexture = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, crownCanvas.width, crownCanvas.height);

      // 2 grand repetitions around the 360-degree cylinder for huge, readable text
      const repeats = 2;
      const segW = crownCanvas.width / repeats;

      for (let i = 0; i < repeats; i++) {
        const startX = i * segW;
        const centerX = startX + segW / 2;

        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = '#FFFFFF';

        // 1. Central Majestic Imperial Crown Spike
        ctx.beginPath();
        ctx.moveTo(centerX - 55, 210);
        ctx.lineTo(centerX, 28);
        ctx.lineTo(centerX + 55, 210);
        ctx.closePath();
        ctx.fill();

        // Brilliant diamond gem atop center spike
        ctx.save();
        ctx.translate(centerX, 15);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-12, -12, 24, 24);
        ctx.restore();

        // 2. Secondary Flanking Peaks (stepped sovereign crest)
        const sideOffsets = [-240, -160, -85, 85, 160, 240];
        const sideHeights = [140, 105, 75, 75, 105, 140];
        sideOffsets.forEach((ox, sIdx) => {
          const px = centerX + ox;
          const py = sideHeights[sIdx];
          ctx.beginPath();
          ctx.moveTo(px - 32, 210);
          ctx.lineTo(px, py);
          ctx.lineTo(px + 32, 210);
          ctx.closePath();
          ctx.fill();

          // Pearl bead atop secondary spike
          ctx.beginPath();
          ctx.arc(px, py - 12, 7, 0, Math.PI * 2);
          ctx.fill();
        });

        // 3. Upper Diadem Ring Border Line
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX, 210);
        ctx.lineTo(startX + segW, 210);
        ctx.stroke();

        // 4. "MAKI IS KING" Monumental Typography (Extra Large & Highly Visible)
        ctx.font = '900 118px "Plus Jakarta Sans", "Syne", -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✦  MAKI IS KING  ✦', centerX, 305);

        // 5. Lower Diadem Ring Border Line
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(startX, 395);
        ctx.lineTo(startX + segW, 395);
        ctx.stroke();

        // 6. Micro royal diamond accents along the bottom
        for (let dx = startX + 35; dx < startX + segW; dx += 45) {
          ctx.save();
          ctx.translate(dx, 425);
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(-4.5, -4.5, 9, 9);
          ctx.restore();
        }
      }
    };

    drawCrownTexture();

    const crownTexture = new THREE.CanvasTexture(crownCanvas);
    crownTexture.wrapS = THREE.RepeatWrapping;
    crownTexture.wrapT = THREE.ClampToEdgeWrapping;
    crownTexture.minFilter = THREE.LinearMipmapLinearFilter;
    crownTexture.generateMipmaps = true;

    // Refresh if custom font finishes loading
    if (document.fonts) {
      document.fonts.ready.then(() => {
        drawCrownTexture();
        crownTexture.needsUpdate = true;
      });
    }

    // Cylindrical crown band (relatively bigger, majestic proportions)
    // radiusTop: 0.198, radiusBottom: 0.180, height: 0.115, 64 segments, open-ended
    const crownGeom = new THREE.CylinderGeometry(0.198, 0.180, 0.115, 64, 1, true);
    const crownMat = new THREE.MeshBasicMaterial({
      map: crownTexture,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      toneMapped: false,
    });

    const crownMesh = new THREE.Mesh(crownGeom, crownMat);
    crownSpinner.add(crownMesh);

    // Subtle celestial floating halo ring above crown points
    const haloGeom = new THREE.TorusGeometry(0.205, 0.0028, 16, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: '#FFFFFF',
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
    });
    const haloMesh = new THREE.Mesh(haloGeom, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.y = 0.070;
    crownSpinner.add(haloMesh);

    headBone.add(crownAnchor);

    return {
      skinnedMesh: newSkinnedMesh,
      bones: {
        root: rootBone,
        chest: chestBone,
        neck: neckBone,
        head: headBone,
      },
      leftEyeGroup: leftEye,
      rightEyeGroup: rightEye,
      crownSpinnerGroup: crownSpinner,
    };
  }, [scene]);

  useEffect(() => {
    bonesRef.current = bones;
    (leftEyeRef as any).current = leftEyeGroup;
    (rightEyeRef as any).current = rightEyeGroup;
    (crownSpinRef as any).current = crownSpinnerGroup;
  }, [bones, leftEyeGroup, rightEyeGroup, crownSpinnerGroup]);

  // Responsive scale and vertical centering
  const isMobile = viewport.width < 5.5;
  const isTablet = viewport.width >= 5.5 && viewport.width < 9;

  const targetScale = isMobile ? 2.3 : isTablet ? 2.8 : 3.3;
  const targetPosY = isMobile ? -0.58 : -0.52;
  const targetPosZ = isMobile ? 0.3 : 0.6;

  useFrame((_, delta) => {
    const time = performance.now() * 0.001;
    const bonesObj = bonesRef.current;
    if (!bonesObj) return;

    // 1. Natural idle breathing cycle on chest and neck
    const breathCycle = Math.sin(time * 1.6);
    const breathHeave = breathCycle * 0.004;
    const breathPitch = breathCycle * 0.010;

    bonesObj.chest.position.y = 0.35 + breathHeave;

    // 2. Coordinated Kinematics: Shoulders, Neck, and Head move in harmonious proportion
    const lerpFactor = Math.min(delta * 4.5, 1.0);

    // Torso & Shoulders turn actively into the gaze
    const targetChestYaw = mousePos.x * 0.16;
    const targetChestPitch = mousePos.y * 0.06 + breathPitch * 0.5;
    const targetChestRoll = -mousePos.x * 0.035;

    // Neck provides smooth intermediate rotation
    const targetNeckYaw = mousePos.x * 0.14;
    const targetNeckPitch = mousePos.y * 0.08;
    const targetNeckRoll = -mousePos.x * 0.035;

    // Head adds the focal alignment (chin & mouth are 100% on HeadBone, moving rigidly)
    const targetHeadYaw = mousePos.x * 0.15;
    const targetHeadPitch = mousePos.y * 0.10;
    const targetHeadRoll = -mousePos.x * 0.03;

    // Apply smoothly to Chest/Shoulders
    bonesObj.chest.rotation.y = THREE.MathUtils.lerp(
      bonesObj.chest.rotation.y,
      targetChestYaw,
      lerpFactor
    );
    bonesObj.chest.rotation.x = THREE.MathUtils.lerp(
      bonesObj.chest.rotation.x,
      targetChestPitch,
      lerpFactor
    );
    bonesObj.chest.rotation.z = THREE.MathUtils.lerp(
      bonesObj.chest.rotation.z,
      targetChestRoll,
      lerpFactor
    );

    // Apply smoothly to Neck
    bonesObj.neck.rotation.y = THREE.MathUtils.lerp(
      bonesObj.neck.rotation.y,
      targetNeckYaw,
      lerpFactor
    );
    bonesObj.neck.rotation.x = THREE.MathUtils.lerp(
      bonesObj.neck.rotation.x,
      targetNeckPitch,
      lerpFactor
    );
    bonesObj.neck.rotation.z = THREE.MathUtils.lerp(
      bonesObj.neck.rotation.z,
      targetNeckRoll,
      lerpFactor
    );

    // Apply smoothly to Head
    bonesObj.head.rotation.y = THREE.MathUtils.lerp(
      bonesObj.head.rotation.y,
      targetHeadYaw,
      lerpFactor
    );
    bonesObj.head.rotation.x = THREE.MathUtils.lerp(
      bonesObj.head.rotation.x,
      targetHeadPitch,
      lerpFactor
    );
    bonesObj.head.rotation.z = THREE.MathUtils.lerp(
      bonesObj.head.rotation.z,
      targetHeadRoll,
      lerpFactor
    );

    // 3. Eyes Follow Cursor (Oculomotor Gaze Shift & Saccades)
    const eyeLerpFactor = Math.min(delta * 8.0, 1.0);

    // Occasional micro-saccades (tiny realistic involuntary glances)
    if (time > saccadeRef.current.nextTime) {
      saccadeRef.current.nextTime = time + 2.5 + Math.random() * 3.0;
      saccadeRef.current.offsetX = (Math.random() - 0.5) * 0.04;
      saccadeRef.current.offsetY = (Math.random() - 0.5) * 0.03;
    }

    // Dynamic eye gaze direction relative to the head
    const targetEyeYaw = mousePos.x * 0.35 + saccadeRef.current.offsetX;
    const targetEyePitch = mousePos.y * 0.25 + saccadeRef.current.offsetY;

    // Subtle eye pupil translation inside the eye sockets
    const eyeShiftX = THREE.MathUtils.clamp(targetEyeYaw * 0.012, -0.007, 0.007);
    const eyeShiftY = THREE.MathUtils.clamp(-targetEyePitch * 0.008, -0.005, 0.005);

    if (leftEyeRef.current) {
      leftEyeRef.current.position.x = -0.048 + eyeShiftX;
      leftEyeRef.current.position.y = 0.143 + eyeShiftY;
      leftEyeRef.current.rotation.y = THREE.MathUtils.lerp(
        leftEyeRef.current.rotation.y,
        targetEyeYaw * 0.8,
        eyeLerpFactor
      );
      leftEyeRef.current.rotation.x = THREE.MathUtils.lerp(
        leftEyeRef.current.rotation.x,
        targetEyePitch * 0.8,
        eyeLerpFactor
      );
    }

    if (rightEyeRef.current) {
      rightEyeRef.current.position.x = 0.049 + eyeShiftX;
      rightEyeRef.current.position.y = 0.143 + eyeShiftY;
      rightEyeRef.current.rotation.y = THREE.MathUtils.lerp(
        rightEyeRef.current.rotation.y,
        targetEyeYaw * 0.8,
        eyeLerpFactor
      );
      rightEyeRef.current.rotation.x = THREE.MathUtils.lerp(
        rightEyeRef.current.rotation.x,
        targetEyePitch * 0.8,
        eyeLerpFactor
      );
    }

    // 4. Subtle Parallax for the Entire Bust Anchor
    if (rootRef.current) {
      const rootParallaxX = mousePos.x * 0.08;
      const rootParallaxY = -mousePos.y * 0.04;

      rootRef.current.position.x = THREE.MathUtils.lerp(
        rootRef.current.position.x,
        rootParallaxX,
        lerpFactor
      );
      rootRef.current.position.y = THREE.MathUtils.lerp(
        rootRef.current.position.y,
        targetPosY + rootParallaxY,
        lerpFactor
      );
    }

    // 5. Continuous sovereign revolution of the MAKI IS KING crown diadem
    if (crownSpinRef.current) {
      crownSpinRef.current.rotation.y += delta * 0.32;
    }
  });

  return (
    <group
      ref={rootRef}
      position={[0, targetPosY, targetPosZ]}
      scale={[targetScale, targetScale, targetScale]}
    >
      <primitive object={skinnedMesh} />
    </group>
  );
};

useGLTF.preload('/3D-model/sample.glb');
