import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TechBadge } from '../components/TechBadge';
import { CelestialNegativeSpace } from '../components/CelestialNegativeSpace';

const CIRSAVE_TECHNOLOGIES = [
  'React',
  'Node.js',
  'Express',
  'Firebase Firestore',
  'Tailwind CSS',
];

export const ScenePlanet01CirSave: React.FC = () => {
  return (
    <section
      id="zone-projects"
      data-scene="cirsave"
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/5"
      aria-label="Project 01: CirSave"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Planet 01 Visual Anchor Zone */}
        <div className="w-full lg:w-1/2 order-1 flex justify-center lg:justify-start">
          <CelestialNegativeSpace
            label="PROJECT 01"
            name="CIRSAVE"
            type="planet"
            coordinates="01 · ORBITAL APEX"
            alignment="left"
          />
        </div>

        {/* Minimal Project Content */}
        <div className="w-full lg:w-1/2 order-2 flex flex-col justify-center text-left">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase font-semibold">
              PROJECT 01 // FINANCIAL ENGINE
            </span>
          </div>

          {/* Project Title */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none mb-4">
            CirSave
          </h2>

          {/* Brief Intro */}
          <p className="font-sans text-sm sm:text-base text-white/65 leading-relaxed max-w-lg mb-6">
            A digital micro-lending and community savings management system designed to streamline rotational contributions, member wallets, and group audit trails.
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CIRSAVE_TECHNOLOGIES.map((tech) => (
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
