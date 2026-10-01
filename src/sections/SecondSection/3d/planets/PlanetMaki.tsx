import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PlanetProps {
  pointer: { x: number; y: number };
}

export const PlanetMaki: React.FC<PlanetProps> = ({ pointer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);
  const crownRingRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.5 + t * 0.16,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.4 + 0.15,
        delta * 3
      );
      groupRef.current.position.y = Math.sin(t * 1.3) * 0.07;
    }

    if (gemRef.current) {
      gemRef.current.rotation.y += delta * 0.22;
      gemRef.current.rotation.z += delta * 0.12;
    }

    // Floating Royal Crown Diadem rotation
    if (crownRingRef.current) {
      crownRingRef.current.rotation.y -= delta * 0.45;
      crownRingRef.current.position.y = 0.85 + Math.sin(t * 2) * 0.05;
    }

    if (haloRef.current) {
      haloRef.current.rotation.x = Math.sin(t * 0.8) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Faceted Neo-Cyber Crystal: Low-Poly Faceted Icosahedron (Obsidian Magenta) */}
      <mesh ref={gemRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshStandardMaterial
          color="#13061A"
          metalness={0.95}
          roughness={0.12}
          flatShading
          emissive="#4A044E"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Crystalline Wireframe Edge Overlay (Neo Royal Magenta) */}
      <mesh>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshStandardMaterial
          color="#E024C3"
          wireframe
          transparent
          opacity={0.55}
          emissive="#D946EF"
          emissiveIntensity={0.7}
        />
      </mesh>

      {/* Floating Royal Crown Diadem (Representing Maki Is King crown motif) */}
      <group ref={crownRingRef} position={[0, 0.85, 0]}>
        {/* Crown Base Torus Ring (Electric Cyber Orchid) */}
        <mesh>
          <torusGeometry args={[1.35, 0.022, 16, 64]} />
          <meshBasicMaterial
            color="#F038FF"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Crown Crown Spikes / Jewels (8 cardinal points - Glowing Diamond Magenta) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 1.35;
          const z = Math.sin(angle) * 1.35;
          return (
            <group key={i} position={[x, 0.12, z]}>
              <mesh>
                <octahedronGeometry args={[0.075, 0]} />
                <meshStandardMaterial
                  color="#FFD6FA"
                  emissive="#E024C3"
                  emissiveIntensity={1.4}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* Ambient Orbiting Spatial Rings (Neo Magenta) */}
      <mesh ref={haloRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.0, 0.016, 16, 80]} />
        <meshBasicMaterial
          color="#E024C3"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Royal Magenta Atmospheric Glow */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial
          color="#E024C3"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
