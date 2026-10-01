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
      {/* Central Quantum Geometric Core: Pulsing nested Wireframe Dodecahedron */}
      <mesh ref={coreRef}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#FFFFFF"
          wireframe
          transparent
          opacity={0.7}
          emissive="#FFFFFF"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner Energy Sphere */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
      </mesh>

      {/* Gimbal Ring 1: X-Axis Orbit */}
      <group ref={gimbalXRef}>
        <mesh>
          <torusGeometry args={[1.5, 0.018, 16, 64]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Gimbal Ring 2: Y-Axis Orbit */}
      <group ref={gimbalYRef}>
        <mesh>
          <torusGeometry args={[1.8, 0.018, 16, 64]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Gimbal Ring 3: Z-Axis Orbit */}
      <group ref={gimbalZRef}>
        <mesh>
          <torusGeometry args={[2.1, 0.018, 16, 64]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
        </mesh>
      </group>

      {/* Portal Event Horizon Halo */}
      <mesh>
        <sphereGeometry args={[1.6, 32, 32]} />
        <meshBasicMaterial
          color="#A855F7"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
