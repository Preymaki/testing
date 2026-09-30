import React from 'react';
import { Compass, Orbit, Disc3 } from 'lucide-react';

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
      className={`relative w-full lg:w-1/2 flex items-center justify-center select-none pointer-events-none transition-all duration-700 ${
        type === 'sun'
          ? 'min-h-[280px] sm:min-h-[380px] lg:min-h-[580px]'
          : 'min-h-[220px] sm:min-h-[320px] lg:min-h-[480px]'
      }`}
      aria-hidden="true"
    >
      {/* Visual Anchor Reticle for Negative Space (Focal space for the 3D/video layer) */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Concentric Orbital Boundary Rings (Faint, high-precision geometry) */}
        <div
          className={`absolute rounded-full border border-white/[0.06] transition-all duration-1000 ${
            type === 'sun'
              ? 'w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] border-white/[0.12] shadow-[0_0_80px_rgba(255,255,255,0.06)]'
              : 'w-48 h-48 sm:w-64 sm:h-64 lg:w-[340px] lg:h-[340px]'
          }`}
        />
        <div
          className={`absolute rounded-full border border-dashed border-white/[0.04] transition-all duration-1000 ${
            type === 'sun'
              ? 'w-48 h-48 sm:w-60 sm:h-60 lg:w-[320px] lg:h-[320px] animate-[spin_120s_linear_infinite]'
              : 'w-36 h-36 sm:w-48 sm:h-48 lg:w-[260px] lg:h-[260px] animate-[spin_90s_linear_infinite]'
          }`}
        />

        {/* Core Focal Center Reticle */}
        <div
          className={`relative rounded-full flex items-center justify-center backdrop-blur-[2px] transition-all duration-700 ${
            type === 'sun'
              ? 'w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-white/[0.03] border border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.15)]'
              : 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-white/[0.015] border border-white/10'
          }`}
        >
          {type === 'sun' ? (
            <Disc3 className="w-6 h-6 sm:w-8 sm:h-8 text-white/50 animate-[spin_30s_linear_infinite]" />
          ) : (
            <Orbit className="w-5 h-5 sm:w-6 sm:h-6 text-white/40" />
          )}

          {/* Crosshair indicators */}
          <div className="absolute -top-3 w-px h-2 bg-white/30" />
          <div className="absolute -bottom-3 w-px h-2 bg-white/30" />
          <div className="absolute -left-3 h-px w-2 bg-white/30" />
          <div className="absolute -right-3 h-px w-2 bg-white/30" />
        </div>

        {/* Orbital Telemetry & Sector Marker */}
        <div className="mt-8 flex flex-col items-center gap-1 font-mono text-center">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
            <Compass className="w-3 h-3 text-white/60" />
            <span className="text-[9px] tracking-[0.2em] text-white/70 uppercase">
              {label}
            </span>
          </div>

          <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-medium">
            {name} · {coordinates}
          </span>
          <span className="text-[8px] tracking-[0.15em] text-white/25 uppercase">
            {type === 'sun' ? '// PRIMARY SOLAR FOCAL POINT' : `// PLANET ANCHOR · ${alignment.toUpperCase()} QUADRANT`}
          </span>
        </div>
      </div>
    </div>
  );
};
