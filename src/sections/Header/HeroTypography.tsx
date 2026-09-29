import React from 'react';
import { MousePosition } from '../../hooks/useMousePosition';

interface HeroTypographyProps {
  mousePos: MousePosition;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ mousePos }) => {
  // Controlled subtle parallax: typography recedes in opposition to foreground character
  const parallaxX = mousePos.x * -18;
  const parallaxY = mousePos.y * -14;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
      style={{
        transform: `translate3d(${parallaxX}px, ${parallaxY}px, 0)`,
        transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)',
        willChange: 'transform',
      }}
      aria-hidden="true"
    >
      {/* 
        The environmental 'MAKI IS KING' typography is now dynamically rendered as a 3D royal crown 
        diadem directly around the avatar's head, following head movements in full 3D perspective.
      */}

      {/* Subtle Environmental Watermark: M.I.K */}
      <div className="absolute bottom-16 sm:bottom-20 flex flex-col items-center gap-2 opacity-50">
        <span className="font-mono text-[10px] tracking-[0.35em] text-white uppercase">
          M.I.K // UNIVERSE IDENTITY
        </span>
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      </div>
    </div>
  );
};
