import React, { useRef, useState, useEffect } from 'react';
import { UniverseBackground3D } from './3d/UniverseBackground3D';
import { ProjectOverlay } from './components/ProjectOverlay';
import { ChevronDown, Orbit } from 'lucide-react';

export const SecondSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  // High-performance scroll tracking loop with rAF
  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = rect.height - windowHeight;

      if (totalScrollable <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));

      setScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll(); // Initial position calculation

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Track local mouse pointer for 3D camera and planet parallax tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setPointer({ x, y });
  };

  const handlePointerLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  // Determine current active sector name based on 3D flight progress
  const getSectorLabel = () => {
    if (scrollProgress < 0.08) return 'ORBITAL TRANSIT // CORRIDOR · STAGE 02';
    if (scrollProgress < 0.26) return 'SECTOR 01 // ORBITAL APEX · CIRSAVE';
    if (scrollProgress < 0.45) return 'SECTOR 02 // EQUATORIAL REACH · DIVINE HERITAGE';
    if (scrollProgress < 0.64) return 'SECTOR 03 // HELIOCENTRIC ORBIT · MAKI IS KING';
    if (scrollProgress < 0.83) return 'SECTOR 04 // PERIPHERAL APEX · EXPLORE MORE';
    return 'SOLAR CORE // THE NEO SUN · VICTOR MACFOY';
  };

  return (
    <section
      id="universe-journey"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[600vh] bg-black text-[#F8F8FA]"
      aria-label="Cinematic 3D Universe Journey"
    >
      {/* Top transition dissolve mask from hero section */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-30" />

      {/* Anchor for Projects navigation target (aligned with CirSave at ~75vh scroll) */}
      <div id="zone-projects" className="absolute top-[75vh] left-0 w-full h-10 pointer-events-none" />

      {/* Anchor for About navigation target (aligned with The White Sun stage at ~450vh scroll) */}
      <div id="zone-about" className="absolute top-[450vh] left-0 w-full h-10 pointer-events-none" />

      {/* Sticky Fullscreen 3D Universe Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Layer 1: Real-Time Three.js WebGL 3D Continuous Space Universe */}
        <UniverseBackground3D progress={scrollProgress} pointer={pointer} />

        {/* Layer 2: Synchronized Minimalist Project Overlay */}
        <ProjectOverlay progress={scrollProgress} />

        {/* Layer 3: Ambient HUD & Orbit Telemetry */}
        <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-6 sm:p-10 md:p-12">
          {/* Top spacer (under fixed HeaderFrame) */}
          <div className="h-16" />

          {/* Bottom Telemetry HUD Bar */}
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
            {/* Left: Sector & Active Station */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <Orbit className="w-3.5 h-3.5 text-white/70 animate-[spin_20s_linear_infinite]" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/80 uppercase font-semibold">
                  {getSectorLabel()}
                </span>
              </div>
            </div>

            {/* Center: Scroll Prompt (fades out as user scrolls) */}
            <div
              className="flex items-center gap-2 transition-opacity duration-300 font-mono text-[10px] tracking-widest text-white/40 uppercase"
              style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
            >
              <span>SCROLL DOWN TO ADVANCE 3D JOURNEY</span>
              <ChevronDown size={14} className="animate-bounce" />
            </div>

            {/* Right: Flight Trajectory Percentage */}
            <div className="hidden sm:flex items-center gap-3 font-mono text-[10px] text-white/50 tracking-wider">
              <span className="text-white/30">TRAJECTORY</span>
              <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-75"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="text-white/80 w-8 text-right font-bold">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
