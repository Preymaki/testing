import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PlanetProps {
  pointer: { x: number; y: number };
}

export const PlanetCirSave: React.FC<PlanetProps> = ({ pointer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate glowing ledger data nodes along the orbital ring
  const [particlePositions] = useMemo(() => {
    const count = 48;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.1 + (Math.random() - 0.5) * 0.15;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.08;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smooth mouse tilt tracking
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.45 + t * 0.12,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.35 + 0.25,
        delta * 3
      );
      // Subtle organic floating bob
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
    }

    if (cageRef.current) {
      cageRef.current.rotation.y -= delta * 0.28;
      cageRef.current.rotation.z += delta * 0.1;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.35;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.25;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Financial Core: Dark obsidian metallic sphere */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial
          color="#06080D"
          metalness={0.92}
          roughness={0.22}
          emissive="#0A1120"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Outer Cryptographic Wireframe Lattice Cage */}
      <mesh ref={cageRef}>
        <icosahedronGeometry args={[1.35, 2]} />
        <meshStandardMaterial
          color="#FFFFFF"
          wireframe
          transparent
          opacity={0.28}
          emissive="#FFFFFF"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Primary Equatorial Orbital Ring */}
      <group ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
        <mesh>
          <ringGeometry args={[1.85, 1.95, 64]} />
          <meshBasicMaterial
            color="#FFFFFF"
            side={THREE.DoubleSide}
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>

      {/* Secondary Tilted Ring with ledger particles */}
      <group ref={ring2Ref} rotation={[Math.PI / 4, -0.4, 0.2]}>
        <mesh>
          <ringGeometry args={[2.15, 2.2, 64]} />
          <meshBasicMaterial
            color="#FFFFFF"
            side={THREE.DoubleSide}
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* Orbiting Ledger Nodes */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#FFFFFF"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Atmospheric Rim Halo */}
      <mesh>
        <sphereGeometry args={[1.42, 32, 32]} />
        <meshBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
