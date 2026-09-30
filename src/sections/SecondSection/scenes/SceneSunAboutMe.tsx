import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TechBadge } from '../components/TechBadge';
import { CelestialNegativeSpace } from '../components/CelestialNegativeSpace';

const ABOUT_TECHNOLOGIES = [
  'React',
  'TypeScript',
  'Node.js',
  'Firebase',
  'Three.js / WebGL',
  'Tailwind CSS',
];

export const SceneSunAboutMe: React.FC = () => {
  return (
    <section
      id="zone-about"
      data-scene="sun-about"
      className="relative w-full min-h-screen flex items-center justify-center py-24 px-6 sm:px-12 lg:px-16 overflow-hidden border-t border-white/10"
      aria-label="Solar Destination: About Victor Isaac Macfoy"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        {/* The White Sun Visual Anchor Zone */}
        <div className="w-full lg:w-5/12 order-1 flex justify-center lg:justify-start">
          <CelestialNegativeSpace
            label="SOLAR DESTINATION"
            name="THE WHITE SUN"
            type="sun"
            coordinates="00 · HELIOS PRIME"
            alignment="left"
          />
        </div>

        {/* Minimalist About Content */}
        <div className="w-full lg:w-7/12 order-2 flex flex-col justify-center text-left">
          {/* Tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/60 uppercase font-semibold">
              ABOUT // ARCHITECT
            </span>
          </div>

          {/* Name */}
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none mb-3">
            Victor Isaac Macfoy
          </h2>

          {/* Subtitle */}
          <p className="font-mono text-xs sm:text-sm text-white/50 uppercase tracking-widest mb-6">
            Software Engineer & Creative Developer
          </p>

          {/* Brief Intro */}
          <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mb-6">
            I craft high-performance web applications, interactive 3D interfaces, and modern digital systems where precision engineering meets visual storytelling.
          </p>

          {/* Core Technologies */}
          <div className="flex flex-wrap gap-2 mb-8">
            {ABOUT_TECHNOLOGIES.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>

          {/* Contact Action */}
          <div>
            <a
              href="#zone-contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-white/90 hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
