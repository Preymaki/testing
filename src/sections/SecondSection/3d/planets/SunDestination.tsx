import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface SunProps {
  pointer: { x: number; y: number };
}

export const SunDestination: React.FC<SunProps> = ({ pointer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const corona1Ref = useRef<THREE.Mesh>(null);
  const corona2Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Solar wind & prominence particles
  const [particles] = useMemo(() => {
    const count = 420;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.45 + Math.random() * 1.35;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.35 + t * 0.08,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.25,
        delta * 3
      );
    }

    // Solar Core Breathing
    if (coreRef.current) {
      const pulse = 1 + Math.sin(t * 2) * 0.025;
      coreRef.current.scale.set(pulse, pulse, pulse);
      coreRef.current.rotation.y += delta * 0.15;
    }

    // Outer Coronal Shell 1 (Pulsating & counter-rotating)
    if (corona1Ref.current) {
      const pulse1 = 1 + Math.sin(t * 1.5 + 0.5) * 0.05;
      corona1Ref.current.scale.set(pulse1, pulse1, pulse1);
      corona1Ref.current.rotation.y -= delta * 0.25;
      corona1Ref.current.rotation.z += delta * 0.12;
    }

    // Outer Coronal Shell 2
    if (corona2Ref.current) {
      const pulse2 = 1 + Math.cos(t * 1.8) * 0.07;
      corona2Ref.current.scale.set(pulse2, pulse2, pulse2);
      corona2Ref.current.rotation.x += delta * 0.2;
    }

    // Swirling solar flares and prominence dust
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.18;
      particlesRef.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Radiant Neo Yellow Sun Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.35, 48, 48]} />
        <meshBasicMaterial
          color="#FFE600"
        />
      </mesh>

      {/* Superheated Inner Plasma Shell */}
      <mesh>
        <sphereGeometry args={[1.42, 32, 32]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Primary Coronal Plasma Envelope (Additive Blending) */}
      <mesh ref={corona1Ref}>
        <sphereGeometry args={[1.56, 32, 32]} />
        <meshStandardMaterial
          color="#FFC000"
          transparent
          opacity={0.45}
          wireframe
          blending={THREE.AdditiveBlending}
          emissive="#FFA500"
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* Secondary Dynamic Coronal Ejection Shell */}
      <mesh ref={corona2Ref}>
        <icosahedronGeometry args={[1.76, 2]} />
        <meshBasicMaterial
          color="#FFE033"
          wireframe
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Radiating Solar Flare Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#FFF04D"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Atmospheric Solar Radiance Bloom Spheres */}
      <mesh>
        <sphereGeometry args={[2.0, 32, 32]} />
        <meshBasicMaterial
          color="#FFC400"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFA700"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
