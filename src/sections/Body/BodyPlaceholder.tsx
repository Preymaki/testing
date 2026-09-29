import React from 'react';
import { Sparkles, Orbit } from 'lucide-react';

export const BodyPlaceholder: React.FC = () => {
  return (
    <section
      id="zone-projects"
      className="relative w-full min-h-[60vh] py-24 px-6 sm:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#050505] to-black border-t border-white/5"
      aria-label="Universe Body Foundation"
    >
      {/* Anchor for About navigation target */}
      <div id="zone-about" className="absolute top-0 left-0 w-0 h-0" />

      <div className="max-w-xl w-full flex flex-col items-center text-center gap-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E0F14] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.08)]">
          <Orbit className="w-3.5 h-3.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
            BODY ZONE // SOLAR ARCHITECTURE (PHASE 02 READY)
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white/90">
          Deep Space & Project Planetary Systems
        </h2>

        <p className="font-sans text-sm text-white/50 leading-relaxed">
          The foundation is primed for Phase 02: the camera transition through space into the central Sun and orbiting project planets.
        </p>

        <div className="flex items-center gap-4 text-xs font-mono text-white/30">
          <span>// NO PLACEHOLDER CONTENT</span>
          <span>•</span>
          <span>SYSTEM READY</span>
        </div>
      </div>
    </section>
  );
};
