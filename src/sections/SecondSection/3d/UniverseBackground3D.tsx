import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { PlanetCirSave } from './planets/PlanetCirSave';
import { PlanetDivineHeritage } from './planets/PlanetDivineHeritage';
import { PlanetMaki } from './planets/PlanetMaki';
import { PlanetExploreMore } from './planets/PlanetExploreMore';
import { SunDestination } from './planets/SunDestination';

interface UniverseBackground3DProps {
  progress: number; // 0 to 1 scroll progress
  pointer: { x: number; y: number };
}

// 3D Spatial Waypoints for the 5 Celestial Stations
export const CELESTIAL_STATIONS = [
  { id: 'cirsave', z: -16, x: -2.4, y: 0, label: 'CIRSAVE' },
  { id: 'divine-heritage', z: -42, x: 2.4, y: 0, label: 'DIVINE HERITAGE' },
  { id: 'maki', z: -68, x: -2.4, y: 0, label: 'MAKI IS KING' },
  { id: 'explore', z: -94, x: 2.4, y: 0, label: 'EXPLORE MORE' },
  { id: 'sun', z: -120, x: -2.0, y: 0, label: 'THE NEO SUN' },
] as const;

/**
 * Camera Controller that smoothly flies through deep space along the Z-axis,
 * panning to frame each celestial body on the left or right while leaving space for text cards.
 * Includes a dynamic forward headlight that travels with the camera.
 */
const CameraFlightController: React.FC<{
  progress: number;
  pointer: { x: number; y: number };
}> = ({ progress, pointer }) => {
  const { camera } = useThree();
  const headlightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    // Total flight distance from Z = 6 (Star Corridor) down to Z = -116 (The White Sun)
    const targetZ = 6 - progress * 122;

    // Responsive horizontal camera shift based on active quadrant
    const swayAngle = progress * Math.PI * 4;
    const pathSwayX = Math.sin(swayAngle) * 0.28;

    // Smooth mouse parallax
    const targetX = pointer.x * 0.45 + pathSwayX;
    const targetY = pointer.y * 0.35 + Math.sin(progress * Math.PI * 2) * 0.15;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 3.5);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 3.5);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, delta * 3.5);

    // Camera continuously aims slightly down the flight path into deep space
    camera.lookAt(targetX * 0.25, targetY * 0.25, camera.position.z - 8);

    if (headlightRef.current) {
      headlightRef.current.position.set(camera.position.x, camera.position.y + 1, camera.position.z);
    }
  });

  return (
    <pointLight
      ref={headlightRef}
      intensity={3.2}
      distance={40}
      decay={1.6}
      color="#FFFFFF"
    />
  );
};

/**
 * Deep Space Cosmic Warp Dust
 * Particles streaming along the flight corridor creating a sensation of 3D speed and depth
 */
const CosmicWarpDust: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions] = useMemo(() => {
    const count = 900;
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      coords[i * 3] = (Math.random() - 0.5) * 32;     // X spread
      coords[i * 3 + 1] = (Math.random() - 0.5) * 24; // Y spread
      coords[i * 3 + 2] = -Math.random() * 140 + 10;  // Z along the entire flight path
    }
    return [coords];
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#FFFFFF"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const UniverseBackground3D: React.FC<UniverseBackground3DProps> = ({
  progress,
  pointer,
}) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 44 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: 'high-performance',
          alpha: true,
          antialias: true,
          depth: true,
        }}
        className="w-full h-full"
      >
        {/* Atmospheric Cosmic Fog for Deep Space Falloff */}
        <fog attach="fog" args={['#000000', 30, 140]} />

        {/* Dynamic Flight Camera Controller with Headlight */}
        <CameraFlightController progress={progress} pointer={pointer} />

        {/* Global Cinematic Ambient Fill */}
        <ambientLight intensity={0.7} />

        {/* Background Starfield */}
        <Stars
          radius={85}
          depth={50}
          count={1400}
          factor={3.8}
          saturation={0}
          fade
          speed={0.4}
        />

        {/* Cosmic Warp Dust streaming through the flight path */}
        <CosmicWarpDust />

        {/* ============================================================== */}
        {/* CELESTIAL STATIONS: Positioned spatially along the flight path */}
        {/* ============================================================== */}

        {/* Station 01: CirSave (Neo Electric Cyan Cryptographic Core & Ledger Rings) */}
        <group position={[-2.4, 0, -16]}>
          <pointLight position={[2, 3, 3]} intensity={4.2} color="#00F0FF" distance={18} />
          <PlanetCirSave pointer={pointer} />
        </group>

        {/* Station 02: Divine Heritage (Neo Cyber Mint Jade Core, Dust Rings & Moons) */}
        <group position={[2.4, 0, -42]}>
          <pointLight position={[-2, 3, 3]} intensity={4.2} color="#00F5A0" distance={18} />
          <PlanetDivineHeritage pointer={pointer} />
        </group>

        {/* Station 03: Maki Is King (Neo Royal Magenta Faceted Gem & Crown Diadem) */}
        <group position={[-2.4, 0, -68]}>
          <pointLight position={[2, 3, 3]} intensity={4.4} color="#E024C3" distance={18} />
          <PlanetMaki pointer={pointer} />
        </group>

        {/* Station 04: Explore More (Neo Quantum Violet Dodecahedron & Gimbals) */}
        <group position={[2.4, 0, -94]}>
          <pointLight position={[-2, 3, 3]} intensity={4.2} color="#A855F7" distance={18} />
          <PlanetExploreMore pointer={pointer} />
        </group>

        {/* Station 05: The Neo Sun // Victor Isaac Macfoy (Monumental Solar Star) */}
        <group position={[-2.0, 0, -120]}>
          <pointLight position={[0, 0, 0]} intensity={5.5} distance={38} color="#FFE600" />
          <pointLight position={[2, 2, 2]} intensity={2.5} distance={20} color="#FFB700" />
          <SunDestination pointer={pointer} />
        </group>
      </Canvas>

      {/* Foreground Cinematic Edge Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/85 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
};
