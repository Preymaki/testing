import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TechBadge } from '../components/TechBadge';
import { CelestialNegativeSpace } from '../components/CelestialNegativeSpace';

const DIVINE_HERITAGE_TECHNOLOGIES = [
  'React',
  'Firebase',
  'Framer Motion',
  'Tailwind CSS',
  'React Router',
];

export const ScenePlanet02DivineHeritage: React.FC = () => {
  return (
    <section
      data-scene="divine-heritage"
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/5"
      aria-label="Project 02: Divine Heritage"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Minimal Project Content (LEFT on desktop, BOTTOM on mobile) */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center text-left">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase font-semibold">
              PROJECT 02 // ADMISSIONS PLATFORM
            </span>
          </div>

          {/* Project Title */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none mb-4">
            Divine Heritage
          </h2>

          {/* Brief Intro */}
          <p className="font-sans text-sm sm:text-base text-white/65 leading-relaxed max-w-lg mb-6">
            A modern childcare service platform for London families, featuring interactive admissions workflows, funding guidance, and institutional policy management.
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {DIVINE_HERITAGE_TECHNOLOGIES.map((tech) => (
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

        {/* Planet 02 Visual Anchor Zone (RIGHT on desktop, TOP on mobile) */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
          <CelestialNegativeSpace
            label="PROJECT 02"
            name="DIVINE HERITAGE"
            type="planet"
            coordinates="02 · EQUATORIAL REACH"
            alignment="right"
          />
        </div>
      </div>
    </section>
  );
};
