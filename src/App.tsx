import React, { useState, useEffect } from 'react';
import { useMousePosition } from './hooks/useMousePosition';
import { HeaderFrame } from './components/layout/HeaderFrame';
import { Experience } from './experience/Experience';
import { HeaderSection } from './sections/Header/HeaderSection';
import { BodyPlaceholder } from './sections/Body/BodyPlaceholder';
import { AboutSection } from './sections/About/AboutSection';
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

  // Sync active target with scroll position using IntersectionObserver
  useEffect(() => {
    const sequence: { id: NavTarget; elementId: string }[] = [
      { id: 'home', elementId: 'zone-header' },
      { id: 'projects', elementId: 'zone-projects' },
      { id: 'about', elementId: 'zone-about' },
      { id: 'contact', elementId: 'zone-contact' },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const activeItem = sequence.find((s) => s.elementId === intersecting[0].target.id);
          if (activeItem) {
            setActiveTarget(activeItem.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sequence.forEach(({ elementId }) => {
      const el = document.getElementById(elementId);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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

        {/* Zone 2: Projects Foundation (Solar System / Projects Phase 02) */}
        <BodyPlaceholder />

        {/* Zone 3: About Foundation (Architect Identity & Dossier) */}
        <AboutSection />

        {/* Zone 4: Footer Foundation (Contact & Terminal Phase 03) */}
        <FooterPlaceholder />
      </main>
    </div>
  );
};

export default App;
