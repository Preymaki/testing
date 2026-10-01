import React from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';
import { TechBadge } from './TechBadge';

interface ProjectOverlayProps {
  progress: number; // 0 to 1
}

interface StageData {
  id: string;
  tag: string;
  sector: string;
  title: string;
  subtitle?: string;
  intro: string;
  technologies: string[];
  linkText: string;
  linkUrl: string;
  isExternal: boolean;
  align: 'left' | 'right';
  accentColor: string;
  rangeStart: number;
  peakStart: number;
  peakEnd: number;
  rangeEnd: number;
}

const STAGES: StageData[] = [
  {
    id: 'cirsave',
    tag: 'PROJECT 01',
    sector: '01 · ORBITAL APEX',
    title: 'CirSave',
    intro:
      'A digital micro-lending and community savings management system designed to streamline rotational contributions, member wallets, and group audit trails.',
    technologies: ['React', 'Node.js', 'Express', 'Firebase Firestore', 'Tailwind CSS'],
    linkText: 'VISIT WEBSITE',
    linkUrl: '#',
    isExternal: true,
    align: 'right', // 3D Planet on left -> Text card on right
    accentColor: '#00F0FF', // Neo Electric Cyan
    rangeStart: 0.06,
    peakStart: 0.11,
    peakEnd: 0.22,
    rangeEnd: 0.26,
  },
  {
    id: 'divine-heritage',
    tag: 'PROJECT 02',
    sector: '02 · EQUATORIAL REACH',
    title: 'Divine Heritage',
    intro:
      'A modern childcare service platform for London families, featuring interactive admissions workflows, funding guidance, and institutional policy management.',
    technologies: ['React', 'Firebase', 'Framer Motion', 'Tailwind CSS', 'React Router'],
    linkText: 'VISIT WEBSITE',
    linkUrl: '#',
    isExternal: true,
    align: 'left', // 3D Planet on right -> Text card on left
    accentColor: '#00F5A0', // Neo Cyber Mint
    rangeStart: 0.24,
    peakStart: 0.29,
    peakEnd: 0.40,
    rangeEnd: 0.45,
  },
  {
    id: 'maki-is-king',
    tag: 'PROJECT 03',
    sector: '03 · HELIOCENTRIC ORBIT',
    title: 'Maki Is King',
    intro:
      'An interactive 3D portfolio and spatial web universe exploring real-time WebGL graphics, procedural animation, and bespoke creative engineering.',
    technologies: ['Three.js', 'React', 'WebGL', 'Vite', 'Tailwind CSS'],
    linkText: 'VISIT WEBSITE',
    linkUrl: '#',
    isExternal: true,
    align: 'right', // 3D Planet on left -> Text card on right
    accentColor: '#E024C3', // Neo Royal Magenta
    rangeStart: 0.43,
    peakStart: 0.48,
    peakEnd: 0.60,
    rangeEnd: 0.65,
  },
  {
    id: 'explore-more',
    tag: 'PROJECT 04',
    sector: '04 · PERIPHERAL APEX',
    title: 'Explore More',
    intro:
      'An orbital gateway to upcoming engineering projects, experimental interfaces, and creative systems currently in active development.',
    technologies: ['WebGL Shaders', 'Next.js 15', 'Procedural Canvas', 'Full-Stack Labs'],
    linkText: 'IN DEVELOPMENT',
    linkUrl: '#',
    isExternal: false,
    align: 'left', // 3D Planet on right -> Text card on left
    accentColor: '#A855F7', // Neo Quantum Violet
    rangeStart: 0.63,
    peakStart: 0.68,
    peakEnd: 0.80,
    rangeEnd: 0.84,
  },
  {
    id: 'about-me',
    tag: 'ABOUT ME',
    sector: '00 · THE NEO SUN',
    title: 'Victor Isaac Macfoy',
    subtitle: 'Software Engineer & Creative Developer',
    intro:
      'I craft high-performance web applications, interactive 3D interfaces, and modern digital systems where precision engineering meets visual storytelling.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Firebase', 'Three.js / WebGL'],
    linkText: 'GET IN TOUCH',
    linkUrl: '#zone-contact',
    isExternal: false,
    align: 'right', // The White Sun on left -> Text card on right
    accentColor: '#FFE600', // Neo Solar Yellow
    rangeStart: 0.82,
    peakStart: 0.86,
    peakEnd: 1.0,
    rangeEnd: 1.0,
  },
];

function calculateOpacity(progress: number, stage: StageData): number {
  if (progress < stage.rangeStart || progress > stage.rangeEnd) return 0;
  if (progress >= stage.peakStart && progress <= stage.peakEnd) return 1;

  if (progress < stage.peakStart) {
    const range = stage.peakStart - stage.rangeStart;
    return range > 0 ? (progress - stage.rangeStart) / range : 1;
  } else {
    const range = stage.rangeEnd - stage.peakEnd;
    return range > 0 ? 1 - (progress - stage.peakEnd) / range : 0;
  }
}

export const ProjectOverlay: React.FC<ProjectOverlayProps> = ({ progress }) => {
  // Transitional gateway opacity: fully visible at progress 0, smoothly dissolving into first planet
  const transitionOpacity =
    progress < 0.05 ? 1 : Math.max(0, 1 - (progress - 0.05) / 0.035);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-20 flex items-center justify-center p-6 sm:p-12 lg:p-16"
      aria-label="Interactive Project Presentation Overlay"
    >
      {/* Transitional Gateway: Origin -> Deep Planetary Reach */}
      <div
        className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none transition-opacity duration-200"
        style={{
          opacity: transitionOpacity,
          visibility: transitionOpacity > 0.02 ? 'visible' : 'hidden',
          pointerEvents: transitionOpacity > 0.4 ? 'auto' : 'none',
        }}
      >
        <div className="flex flex-col items-center text-center gap-3 p-6 sm:p-8 rounded-2xl bg-[#090A0E]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.85)] max-w-md">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/80 uppercase font-bold">
              ORBITAL TRANSIT // STAGE 02
            </span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            Planetary Corridor
          </h3>
          <p className="font-sans text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
            Departing origin matrix. Advancing into curated engineering systems and spatial environments.
          </p>
          <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-white/40 tracking-widest uppercase">
            <span>SCROLL TO ADVANCE</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
      <div className="relative w-full max-w-7xl h-full flex items-center">
        {STAGES.map((stage) => {
          const opacity = calculateOpacity(progress, stage);
          const isVisible = opacity > 0.02;
          const isInteractive = opacity > 0.35;

          const alignClass =
            stage.align === 'right'
              ? 'justify-center lg:justify-end'
              : 'justify-center lg:justify-start';

          const translateY = (1 - opacity) * 20;

          return (
            <div
              key={stage.id}
              className={`absolute inset-0 w-full h-full flex items-center ${alignClass} transition-opacity duration-200`}
              style={{
                opacity: opacity,
                visibility: isVisible ? 'visible' : 'hidden',
                pointerEvents: isInteractive ? 'auto' : 'none',
              }}
            >
              {/* Glassmorphic Minimalist Project Card */}
              <div
                className="w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl bg-[#090A0E]/75 backdrop-blur-2xl border border-white/12 flex flex-col gap-4 text-left transition-transform duration-200"
                style={{
                  transform: `translateY(${translateY}px)`,
                  boxShadow: `0 0 50px rgba(0,0,0,0.85), 0 0 35px ${stage.accentColor}18`,
                  borderTop: `1.5px solid ${stage.accentColor}55`,
                }}
              >
                {/* Meta Tag & Sector */}
                <div className="flex items-center justify-between gap-3 pb-1 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: stage.accentColor,
                        boxShadow: `0 0 8px ${stage.accentColor}`,
                      }}
                    />
                    <span
                      className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold"
                      style={{ color: stage.accentColor }}
                    >
                      {stage.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/40 tracking-wider">
                    <Compass size={11} className="text-white/50" />
                    <span>{stage.sector}</span>
                  </div>
                </div>

                {/* Project Title */}
                <div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-none">
                    {stage.title}
                  </h3>
                  {stage.subtitle && (
                    <p className="font-mono text-xs text-white/50 uppercase tracking-widest mt-1.5">
                      {stage.subtitle}
                    </p>
                  )}
                </div>

                {/* Brief Intro */}
                <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed">
                  {stage.intro}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {stage.technologies.map((tech) => (
                    <TechBadge key={tech} name={tech} />
                  ))}
                </div>

                {/* Action Link */}
                <div className="pt-2">
                  {stage.id === 'explore-more' ? (
                    <span
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border font-mono text-xs tracking-widest uppercase transition-colors"
                      style={{
                        borderColor: `${stage.accentColor}35`,
                        color: `${stage.accentColor}dd`,
                      }}
                    >
                      <Sparkles size={12} style={{ color: stage.accentColor }} />
                      <span>{stage.linkText}</span>
                    </span>
                  ) : (
                    <a
                      href={stage.linkUrl}
                      target={stage.isExternal ? '_blank' : undefined}
                      rel={stage.isExternal ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black font-mono text-xs font-bold tracking-wider hover:bg-white/95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      style={{
                        boxShadow: `0 0 20px ${stage.accentColor}35`,
                      }}
                    >
                      <span>{stage.linkText}</span>
                      <ArrowUpRight
                        size={14}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
