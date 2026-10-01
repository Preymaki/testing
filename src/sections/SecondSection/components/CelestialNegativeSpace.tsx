import React from 'react';
import { Compass } from 'lucide-react';
import { CelestialCanvas } from '../3d/CelestialCanvas';

interface CelestialNegativeSpaceProps {
  label: string;
  name: string;
  type: 'planet' | 'sun';
  coordinates: string;
  alignment: 'left' | 'right' | 'center';
}

export const CelestialNegativeSpace: React.FC<CelestialNegativeSpaceProps> = ({
  label,
  name,
  type,
  coordinates,
  alignment,
}) => {
  return (
    <div
      className={`relative w-full lg:w-1/2 flex items-center justify-center select-none transition-all duration-700 ${
        type === 'sun'
          ? 'min-h-[340px] sm:min-h-[440px] lg:min-h-[580px]'
          : 'min-h-[280px] sm:min-h-[380px] lg:min-h-[480px]'
      }`}
      aria-label={`${name} 3D Celestial Visualization`}
    >
      {/* Background Reticle & Concentric Orbital Boundary Rings (Faint precision geometry) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div
          className={`absolute rounded-full border border-white/[0.05] transition-all duration-1000 ${
            type === 'sun'
              ? 'w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] border-white/[0.08] shadow-[0_0_100px_rgba(255,255,255,0.04)]'
              : 'w-56 h-56 sm:w-72 sm:h-72 lg:w-[380px] lg:h-[380px]'
          }`}
        />
        <div
          className={`absolute rounded-full border border-dashed border-white/[0.03] transition-all duration-1000 ${
            type === 'sun'
              ? 'w-52 h-52 sm:w-64 sm:h-64 lg:w-[340px] lg:h-[340px] animate-[spin_120s_linear_infinite]'
              : 'w-40 h-40 sm:w-52 sm:h-52 lg:w-[280px] lg:h-[280px] animate-[spin_90s_linear_infinite]'
          }`}
        />
      </div>

      {/* Primary Interactive 3D WebGL Celestial Object */}
      <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
        <div className="w-full flex-1 flex items-center justify-center">
          <CelestialCanvas name={name} type={type} />
        </div>

        {/* Orbital Telemetry & Sector Marker */}
        <div className="mt-2 flex flex-col items-center gap-1 font-mono text-center pointer-events-none">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <Compass className="w-3 h-3 text-white/60" />
            <span className="text-[9px] tracking-[0.2em] text-white/70 uppercase">
              {label}
            </span>
          </div>

          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-medium">
            {name} · {coordinates}
          </span>
          <span className="text-[8px] tracking-[0.15em] text-white/20 uppercase">
            {type === 'sun' ? '// PRIMARY SOLAR FOCAL POINT · INTERACTIVE' : `// 3D PLANETARY CORE · ${alignment.toUpperCase()} QUADRANT`}
          </span>
        </div>
      </div>
    </div>
  );
};
