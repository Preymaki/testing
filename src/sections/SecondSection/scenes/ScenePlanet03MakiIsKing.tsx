import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TechBadge } from '../components/TechBadge';
import { CelestialNegativeSpace } from '../components/CelestialNegativeSpace';

const MAKI_TECHNOLOGIES = [
  'Three.js',
  'React',
  'WebGL',
  'Vite',
  'Tailwind CSS',
];

export const ScenePlanet03MakiIsKing: React.FC = () => {
  return (
    <section
      data-scene="maki-portfolio"
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/5"
      aria-label="Project 03: Maki Is King Portfolio"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Planet 03 Visual Anchor Zone (LEFT on desktop, TOP on mobile) */}
        <div className="w-full lg:w-1/2 order-1 flex justify-center lg:justify-start">
          <CelestialNegativeSpace
            label="PROJECT 03"
            name="MAKI IS KING"
            type="planet"
            coordinates="03 · HELIOCENTRIC ORBIT"
            alignment="left"
          />
        </div>

        {/* Minimal Project Content */}
        <div className="w-full lg:w-1/2 order-2 flex flex-col justify-center text-left">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase font-semibold">
              PROJECT 03 // 3D WEB UNIVERSE
            </span>
          </div>

          {/* Project Title */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none mb-4">
            Maki Is King
          </h2>

          {/* Brief Intro */}
          <p className="font-sans text-sm sm:text-base text-white/65 leading-relaxed max-w-lg mb-6">
            An interactive 3D portfolio and spatial web universe exploring real-time WebGL graphics, procedural animation, and bespoke creative engineering.
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {MAKI_TECHNOLOGIES.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          {/* Link to Actual Website */}
          <div>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>VISIT WEBSITE</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
