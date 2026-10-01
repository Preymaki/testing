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
  isVisible?: boolean;
}

export const Experience: React.FC<ExperienceProps> = ({ mousePos, isVisible = true }) => {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || navigator.maxTouchPoints > 1);

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
        dpr={isMobile ? 1 : [1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          powerPreference: 'high-performance',
          alpha: true,
          antialias: !isMobile,
          stencil: false,
          depth: true,
        }}
        shadows={isMobile ? false : 'percentage'}
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
