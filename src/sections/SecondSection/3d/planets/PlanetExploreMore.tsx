import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PlanetProps {
  pointer: { x: number; y: number };
}

export const PlanetExploreMore: React.FC<PlanetProps> = ({ pointer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const gimbalXRef = useRef<THREE.Group>(null);
  const gimbalYRef = useRef<THREE.Group>(null);
  const gimbalZRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.45 + t * 0.08,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.35,
        delta * 3
      );
      groupRef.current.position.y = Math.sin(t * 1.4 + 2) * 0.06;
    }

    // Breathing quantum core pulsation
    if (coreRef.current) {
      const scale = 0.95 + Math.sin(t * 2.5) * 0.12;
      coreRef.current.scale.set(scale, scale, scale);
      coreRef.current.rotation.x += delta * 0.3;
      coreRef.current.rotation.y += delta * 0.4;
    }

    // Multi-axis gyroscopic gimbal ring rotations
    if (gimbalXRef.current) {
      gimbalXRef.current.rotation.x += delta * 0.55;
    }

    if (gimbalYRef.current) {
      gimbalYRef.current.rotation.y += delta * 0.42;
    }

    if (gimbalZRef.current) {
      gimbalZRef.current.rotation.z -= delta * 0.38;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Quantum Geometric Core: Pulsing nested Wireframe Dodecahedron (Neo Quantum Violet) */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#A855F7"
          wireframe
          transparent
          opacity={0.8}
          emissive="#9333EA"
          emissiveIntensity={0.85}
        />
      </mesh>

      {/* Inner Energy Sphere (Superheated Violet-White Plasma) */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial
          color="#F3E8FF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Gimbal Ring 1: X-Axis Orbit (Electric Lavender) */}
      <group ref={gimbalXRef}>
        <mesh>
          <torusGeometry args={[1.5, 0.018, 16, 64]} />
          <meshBasicMaterial
            color="#C084FC"
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Gimbal Ring 2: Y-Axis Orbit (Neo Violet) */}
      <group ref={gimbalYRef}>
        <mesh>
          <torusGeometry args={[1.8, 0.018, 16, 64]} />
          <meshBasicMaterial
            color="#A855F7"
            transparent
            opacity={0.45}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Gimbal Ring 3: Z-Axis Orbit (Deep Quantum Purple) */}
      <group ref={gimbalZRef}>
        <mesh>
          <torusGeometry args={[2.1, 0.018, 16, 64]} />
          <meshBasicMaterial
            color="#8B5CF6"
            transparent
            opacity={0.38}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Portal Event Horizon Halo (Expansive Violet Radiance) */}
      <mesh>
        <sphereGeometry args={[1.65, 32, 32]} />
        <meshBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
