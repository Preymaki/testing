import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface PlanetProps {
  pointer: { x: number; y: number };
}

export const PlanetDivineHeritage: React.FC<PlanetProps> = ({ pointer }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const moon1Ref = useRef<THREE.Mesh>(null);
  const moon2Ref = useRef<THREE.Mesh>(null);

  // Saturn-style planetary dust ring particles
  const [ringParticles] = useMemo(() => {
    const count = 380;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.75 + Math.random() * 0.85;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.4 + t * 0.1,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.3 + 0.35,
        delta * 3
      );
      groupRef.current.position.y = Math.sin(t * 1.1 + 1) * 0.07;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.15;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.12;
    }

    // Orbiting Guardian Moons
    if (moon1Ref.current) {
      const angle = t * 0.8;
      moon1Ref.current.position.set(Math.cos(angle) * 2.3, Math.sin(angle * 0.5) * 0.3, Math.sin(angle) * 2.3);
    }

    if (moon2Ref.current) {
      const angle = -t * 0.6 + 2.5;
      moon2Ref.current.position.set(Math.cos(angle) * 2.9, Math.cos(angle * 0.7) * 0.4, Math.sin(angle) * 2.9);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Terrestrial Nurturing Core: Frosted Ivory / Warm Mineral Sphere */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshStandardMaterial
          color="#161514"
          metalness={0.4}
          roughness={0.45}
          emissive="#2A241F"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Cloud / Atmospheric Film Layer */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#EAE5DC"
          transparent
          opacity={0.18}
          wireframe
        />
      </mesh>

      {/* Saturn-Style Majestic Dust Ring */}
      <group ref={ringRef} rotation={[0.45, 0.2, 0.6]}>
        <mesh>
          <ringGeometry args={[1.7, 2.65, 64]} />
          <meshBasicMaterial
            color="#D8C9B4"
            side={THREE.DoubleSide}
            transparent
            opacity={0.16}
          />
        </mesh>

        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[ringParticles, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color="#F2E8DC"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Guardian Moon 01 */}
      <mesh ref={moon1Ref}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.4} />
      </mesh>

      {/* Guardian Moon 02 */}
      <mesh ref={moon2Ref}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial color="#E2DCD5" emissive="#E2DCD5" emissiveIntensity={0.3} />
      </mesh>

      {/* Warm Golden Atmospheric Rim */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color="#D97706"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
