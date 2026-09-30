import React from 'react';
import { User, Terminal, Cpu, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="zone-about"
      className="relative w-full min-h-[60vh] py-24 px-6 sm:px-12 flex flex-col items-center justify-center bg-gradient-to-b from-[#050505] via-[#08080c] to-black border-t border-white/5"
      aria-label="Universe About Section"
    >
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-8">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E0F14] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.08)]">
          <User className="w-3.5 h-3.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white uppercase font-semibold drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
            ZONE 03 // ARCHITECT IDENTITY & DOSSIER
          </span>
        </div>

        {/* Section Heading */}
        <div className="flex flex-col items-center gap-3">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white/90">
            Creative Direction & Engineering
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/50 max-w-lg leading-relaxed">
            Synthesizing cutting-edge real-time 3D graphics, procedural audio-visual pipelines, and high-performance web systems into unified cinematic software universes.
          </p>
        </div>

        {/* Dossier Telemetry Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full text-left font-mono">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-white/15 transition-all">
            <div className="flex items-center gap-2 text-white/40 text-[10px] mb-2">
              <Cpu className="w-3.5 h-3.5 text-white/60" />
              <span>DISCIPLINE</span>
            </div>
            <div className="text-xs text-white/90 font-medium">Full-Stack & 3D WebGL</div>
            <div className="text-[10px] text-white/40 mt-1">Interactive Shader Systems</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-white/15 transition-all">
            <div className="flex items-center gap-2 text-white/40 text-[10px] mb-2">
              <Terminal className="w-3.5 h-3.5 text-white/60" />
              <span>PHILOSOPHY</span>
            </div>
            <div className="text-xs text-white/90 font-medium">Bespoke Aesthetics</div>
            <div className="text-[10px] text-white/40 mt-1">Zero Generic Interfaces</div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm hover:border-white/15 transition-all">
            <div className="flex items-center gap-2 text-white/40 text-[10px] mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
              <span>ORIGIN</span>
            </div>
            <div className="text-xs text-white/90 font-medium">Maki Is King // M.I.K</div>
            <div className="text-[10px] text-white/40 mt-1">Universal Core // 01</div>
          </div>
        </div>

        {/* Bottom Telemetry Status */}
        <div className="flex items-center gap-4 text-xs font-mono text-white/30">
          <span>// DOSSIER VERIFIED</span>
          <span>•</span>
          <span>STAGE 03 COMPLETE</span>
        </div>
      </div>
    </section>
  );
};
