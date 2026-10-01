import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { CameraController } from './camera/CameraController';
import { Lighting } from './lighting/Lighting';
import { Atmosphere } from './environment/Atmosphere';
import { Character } from './character/Character';
import { CharacterLoader } from './character/CharacterLoader';
import { MousePosition } from '../hooks/useMousePosition';

interface ExperienceProps {
  mousePos: MousePosition;
}

export const Experience: React.FC<ExperienceProps> = ({ mousePos }) => {
  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-20"
      style={{
        maskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.85) 75%, transparent 98%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 55%, rgba(0,0,0,0.85) 75%, transparent 98%)',
      }}
    >
      <CharacterLoader />
      <Canvas
        camera={{ position: [0, 0.1, 4], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          powerPreference: 'high-performance',
          alpha: true,
          antialias: true,
          stencil: false,
          depth: true,
        }}
        shadows="percentage"
        className="w-full h-full"
      >
        <CameraController mousePos={mousePos} />
        <Lighting />
        <Atmosphere />

        <Suspense fallback={null}>
          <Character mousePos={mousePos} />
        </Suspense>
      </Canvas>
    </div>
  );
};
