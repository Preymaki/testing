import React from 'react';
import { ChevronDown, Orbit, Compass, Sparkles } from 'lucide-react';

export const HeroTransitionBridge: React.FC = () => {
  return (
    <section
      id="transition-bridge"
      className="relative w-full min-h-[50vh] sm:min-h-[60vh] flex flex-col items-center justify-center py-20 px-6 sm:px-12 bg-black text-center overflow-hidden border-t border-white/[0.04]"
      aria-label="Orbital Transition: Origin to Planetary Systems"
    >
      {/* Background Radial Glow & Cosmic Depth */}
      <div className="absolute inset-0 bg-radial from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      {/* Decorative Floating Cosmic Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/30 rounded-full" />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full animate-pulse" />
      </div>

      {/* Central Holographic Transit Waypoint */}
      <div className="relative z-10 flex flex-col items-center gap-5 max-w-xl mx-auto">
        {/* Sector Telemetry Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.03)]">
          <Orbit className="w-3.5 h-3.5 text-white/80 animate-[spin_20s_linear_infinite]" />
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/80 uppercase font-semibold">
            ORBITAL TRANSIT // STAGE 02
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none">
            Entering Planetary Reach
          </h2>
          <p className="font-mono text-xs sm:text-sm text-white/40 tracking-widest uppercase">
            DEPARTING IDENTITY ORIGIN → INITIATING SPATIAL SYSTEMS
          </p>
        </div>

        {/* Minimal Description */}
        <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed max-w-md">
          A sequence of real-time 3D planetary environments representing key web platforms, architectural experiments, and creative software.
        </p>

        {/* Guided Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 pt-4">
          <a
            href="#zone-projects"
            className="group flex flex-col items-center gap-2 text-[10px] font-mono text-white/40 hover:text-white transition-colors"
          >
            <span className="tracking-[0.25em] uppercase group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              EXPLORE PROJECTS
            </span>
            <div className="w-7 h-7 rounded-full border border-white/15 group-hover:border-white group-hover:bg-white/10 flex items-center justify-center transition-all duration-300">
              <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>

      {/* Faint Vertical Energy Conduits / Laser Guides */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
    </section>
  );
};
