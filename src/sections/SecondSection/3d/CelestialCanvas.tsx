import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PlanetCirSave } from './planets/PlanetCirSave';
import { PlanetDivineHeritage } from './planets/PlanetDivineHeritage';
import { PlanetMaki } from './planets/PlanetMaki';
import { PlanetExploreMore } from './planets/PlanetExploreMore';
import { SunDestination } from './planets/SunDestination';

interface CelestialCanvasProps {
  name: string;
  type: 'planet' | 'sun';
}

export const CelestialCanvas: React.FC<CelestialCanvasProps> = ({ name, type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [isInView, setIsInView] = useState(true);

  // Performance Optimization: Keep active within wide viewport margin
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '400px 0px 400px 0px', threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setPointer({ x, y });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  // Determine which 3D model to render based on celestial name
  const normalizedName = name.toUpperCase();

  const renderCelestialBody = () => {
    if (type === 'sun' || normalizedName.includes('SUN')) {
      return <SunDestination pointer={pointer} />;
    }
    if (normalizedName.includes('CIRSAVE')) {
      return <PlanetCirSave pointer={pointer} />;
    }
    if (normalizedName.includes('DIVINE') || normalizedName.includes('HERITAGE')) {
      return <PlanetDivineHeritage pointer={pointer} />;
    }
    if (normalizedName.includes('MAKI')) {
      return <PlanetMaki pointer={pointer} />;
    }
    if (normalizedName.includes('GATEWAY') || normalizedName.includes('EXPLORE')) {
      return <PlanetExploreMore pointer={pointer} />;
    }
    return <PlanetCirSave pointer={pointer} />;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label={`Interactive 3D view of ${name}`}
    >
      {isInView ? (
        <Canvas
          camera={{
            position: [0, 0, type === 'sun' ? 4.8 : 4.4],
            fov: 40,
          }}
          dpr={[1, 1.5]}
          gl={{
            powerPreference: 'high-performance',
            alpha: true,
            antialias: true,
            depth: true,
          }}
          className="w-full h-full"
        >
          {/* Universal Dynamic Lighting */}
          <ambientLight intensity={0.65} />
          <directionalLight position={[4, 5, 4]} intensity={1.8} color="#FFFFFF" />
          <directionalLight position={[-4, -3, -2]} intensity={0.4} color="#3B82F6" />
          <pointLight position={[0, 0, 2]} intensity={type === 'sun' ? 3.0 : 0.8} color={type === 'sun' ? '#FFE600' : '#FFFFFF'} />

          <Suspense fallback={null}>
            {renderCelestialBody()}
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center opacity-0 pointer-events-none" />
      )}
    </div>
  );
};
