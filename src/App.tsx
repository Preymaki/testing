import React, { useState, useEffect } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import { HeaderFrame } from './components/layout/HeaderFrame';
import { Experience } from './experience/Experience';
import { HeaderSection } from './sections/Header/HeaderSection';
import { SecondSection } from './sections/SecondSection/SecondSection';
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
      projects: 'zone-projects',
      about: 'zone-about',
      contact: 'zone-contact',
    };

    const targetEl = document.getElementById(targetMap[target]);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Sync active navigation target with real-time scroll position
  useEffect(() => {
    const handleScrollNav = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Contact / Footer
      if (scrollY + windowHeight >= docHeight - 80) {
        setActiveTarget('contact');
        return;
      }

      // Home / Hero Section
      if (scrollY < windowHeight * 0.65) {
        setActiveTarget('home');
        return;
      }

      // Universe Journey (Projects & About)
      const aboutEl = document.getElementById('zone-about');
      if (aboutEl) {
        const aboutRect = aboutEl.getBoundingClientRect();
        if (aboutRect.top <= windowHeight * 0.45) {
          setActiveTarget('about');
          return;
        }
      }
      setActiveTarget('projects');
    };

    window.addEventListener('scroll', handleScrollNav, { passive: true });
    handleScrollNav();

    return () => window.removeEventListener('scroll', handleScrollNav);
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
        {/* Zone 1: Header (Origin / 3D Canvas Layer) */}
        <div className="relative w-full h-screen overflow-hidden">
          <ErrorBoundary fallbackTitle="3D Canvas Layer">
            <Experience mousePos={mousePos} />
          </ErrorBoundary>

          {/* Environmental Typography & Header UI Elements */}
          <HeaderSection
            mousePos={mousePos}
            onExploreClick={() => handleSelectTarget('projects')}
          />
        </div>

        {/* Zone 2: Cinematic Universe Journey (Planets 01-04 & Sun Destination) */}
        <SecondSection />

        {/* Zone 4: Footer Foundation (Contact & Terminal Phase 03) */}
        <FooterPlaceholder />
      </main>
    </div>
  );
};

export default App;
