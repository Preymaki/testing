import React from 'react';
import { HeroTypography } from './HeroTypography';
import { MousePosition } from '../../hooks/useMousePosition';
import { ChevronDown, Compass } from 'lucide-react';

interface HeaderSectionProps {
  mousePos: MousePosition;
  onExploreClick: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  mousePos,
  onExploreClick,
}) => {
  return (
    <section
      id="zone-header"
      className="relative w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black"
      aria-label="M.I.K Universe Header"
    >
      {/* Hidden semantic heading for accessibility and SEO */}
      <h1 className="sr-only">
        M.I.K — Maki Is King. Interactive 3D Portfolio of Software Engineering and Creative Direction.
      </h1>

      {/* Layer 1: Monumental Environmental Typography */}
      <HeroTypography mousePos={mousePos} />

      {/* Layer 2: 3D Canvas will be rendered by parent Experience component between Layer 1 and Layer 3 */}

      {/* Layer 3: Foreground Cinematic Vignette & Ambient Rim */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none z-25" />

      {/* Layer 4: Telemetry & Ambient HUD Details (Layered in foreground) */}
      <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-6 sm:p-10 md:p-12">
        {/* Top spacer (to offset fixed HeaderFrame) */}
        <div className="h-16" />

        {/* Bottom Metadata & Controls Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 pointer-events-auto">
          
          {/* Bottom Left: Identity & Sector Data */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-1">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.85)] animate-pulse" />
              <span className="font-mono text-[10px] tracking-[0.25em] text-white uppercase font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]">
                ORIGIN // STAGE 01
              </span>
            </div>
            <p className="font-sans text-xs tracking-wide text-white/50 max-w-[280px]">
              Single-page cinematic 3D universe. Fictionalized architecture representing creative software and identity.
            </p>
          </div>

          {/* Bottom Center: Scroll Prompt */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onExploreClick}
              className="group flex flex-col items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm py-1 px-3"
              aria-label="Navigate to Body area"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40 group-hover:text-white group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all">
                ENTER UNIVERSE
              </span>
              <div className="w-6 h-6 rounded-full border border-white/10 group-hover:border-white group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:bg-white/10 flex items-center justify-center transition-luxury">
                <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white group-hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] group-hover:translate-y-0.5 transition-transform" />
              </div>
            </button>
          </div>

          {/* Bottom Right: Cursor Engagement Telemetry */}
          <div className="hidden sm:flex flex-col items-end text-right gap-1 font-mono text-[10px]">
            <span className="text-white/30 tracking-[0.18em]">
              NEO-BLACK CANVAS // M.I.K
            </span>
            <div className="flex items-center gap-2 text-white/60">
              <span className="tracking-widest">
                X: {mousePos.x.toFixed(2)} / Y: {mousePos.y.toFixed(2)}
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${mousePos.isActive ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.95)]' : 'bg-white/20'}`} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
