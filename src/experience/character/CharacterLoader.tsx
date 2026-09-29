import React from 'react';
import { useProgress } from '@react-three/drei';

export const CharacterLoader: React.FC = () => {
  const { progress, active } = useProgress();

  if (!active && progress === 100) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-[#050506]/70 backdrop-blur-xs transition-opacity duration-500 pointer-events-none">
      <div className="flex flex-col items-center gap-3 select-none">
        <div className="relative w-12 h-12 flex items-center justify-center">
          <div className="w-10 h-10 border border-white/10 border-t-white shadow-[0_0_12px_rgba(255,255,255,0.6)] rounded-full animate-spin" />
          <span className="absolute font-mono text-[9px] text-white font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]">
            {Math.round(progress)}%
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">
          Synthesizing Entity
        </span>
      </div>
    </div>
  );
};
