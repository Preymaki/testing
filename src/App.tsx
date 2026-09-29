import React, { useState, useEffect } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import { HeaderFrame } from './components/layout/HeaderFrame';
import { Experience } from './experience/Experience';
import { HeaderSection } from './sections/Header/HeaderSection';
import { BodyPlaceholder } from './sections/Body/BodyPlaceholder';
import { FooterPlaceholder } from './sections/Footer/FooterPlaceholder';
import { NavTarget } from './types';

import { ErrorBoundary } from './components/ui/ErrorBoundary';

export const App: React.FC = () => {
  const mousePos = useMousePosition();
  const [activeTarget, setActiveTarget] = useState<NavTarget>('home');

  const handleSelectTarget = (target: NavTarget) => {
    setActiveTarget(target);
    const targetMap: Record<NavTarget, string> = {
      home: 'zone-header',
      about: 'zone-about',
      projects: 'zone-projects',
      contact: 'zone-contact',
    };

    const targetEl = document.getElementById(targetMap[target]);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync active target with scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.4) {
        setActiveTarget('home');
      } else if (scrollY < windowHeight * 1.0) {
        setActiveTarget('about');
      } else if (scrollY < windowHeight * 1.5) {
        setActiveTarget('projects');
      } else {
        setActiveTarget('contact');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-[#F8F8FA] selection:bg-white selection:text-black">
      {/* Top Floating Meta & Navigation Bar */}
      <HeaderFrame
        activeTarget={activeTarget}
        onSelectTarget={handleSelectTarget}
      />

      {/* Main One-Page Cinematic Experience */}
      <main id="main-content" className="relative w-full">
        {/* Header Zone Container */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* 3D Canvas Layer */}
          <ErrorBoundary fallbackTitle="3D Canvas Layer">
            <Experience mousePos={mousePos} />
          </ErrorBoundary>

          {/* Environmental Typography & Header UI Elements */}
          <HeaderSection
            mousePos={mousePos}
            onExploreClick={() => handleSelectTarget('projects')}
          />
        </div>

        {/* Zone 2: Body Foundation (Solar System / Projects Phase 02) */}
        <BodyPlaceholder />

        {/* Zone 3: Footer Foundation (Contact & Terminal Phase 03) */}
        <FooterPlaceholder />
      </main>
    </div>
  );
};

export default App;
