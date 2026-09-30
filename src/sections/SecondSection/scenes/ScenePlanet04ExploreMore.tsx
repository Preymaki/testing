import React from 'react';
import { Sparkles } from 'lucide-react';
import { TechBadge } from '../components/TechBadge';
import { CelestialNegativeSpace } from '../components/CelestialNegativeSpace';

const UPCOMING_TECHNOLOGIES = [
  'WebGL Shaders',
  'Next.js 15',
  'Procedural Canvas',
  'Full-Stack Labs',
];

export const ScenePlanet04ExploreMore: React.FC = () => {
  return (
    <section
      id="scene-explore-more"
      data-scene="explore-more"
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/5"
      aria-label="Planet 04: Explore More Gateway"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* Minimal Content (LEFT on desktop, BOTTOM on mobile) */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 flex flex-col justify-center text-left">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/50 uppercase font-semibold">
              PROJECT 04 // UPCOMING WORK
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none mb-4">
            Explore More
          </h2>

          {/* Brief Intro */}
          <p className="font-sans text-sm sm:text-base text-white/65 leading-relaxed max-w-lg mb-6">
            An orbital gateway to upcoming engineering projects, experimental interfaces, and creative systems currently in active development.
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {UPCOMING_TECHNOLOGIES.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          {/* Status Tag */}
          <div>
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-white/50 tracking-widest uppercase">
              <Sparkles size={12} className="text-white/40" />
              <span>IN DEVELOPMENT · COMING SOON</span>
            </span>
          </div>
        </div>

        {/* Planet 04 Visual Anchor Zone (RIGHT on desktop, TOP on mobile) */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
          <CelestialNegativeSpace
            label="EXPLORE MORE"
            name="ORBITAL GATEWAY"
            type="planet"
            coordinates="04 · PERIPHERAL APEX"
            alignment="right"
          />
        </div>
      </div>
    </section>
  );
};
