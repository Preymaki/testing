import React from 'react';
import { BrandMark } from '../ui/BrandMark';
import { StatusBadge } from '../ui/StatusBadge';
import { Navbar } from '../navigation/Navbar';
import { NavTarget } from '../../types';

interface HeaderFrameProps {
  activeTarget: NavTarget;
  onSelectTarget: (target: NavTarget) => void;
}

export const HeaderFrame: React.FC<HeaderFrameProps> = ({
  activeTarget,
  onSelectTarget,
}) => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-40 px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between pointer-events-none"
      role="banner"
    >
      {/* Left Identity Block */}
      <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
        <BrandMark onClick={() => onSelectTarget('home')} />
        <div className="hidden lg:block h-4 w-[1px] bg-white/10" />
        <div className="hidden lg:block">
          <StatusBadge />
        </div>
      </div>

      {/* Right Navigation */}
      <div className="pointer-events-auto">
        <Navbar activeTarget={activeTarget} onSelectTarget={onSelectTarget} />
      </div>
    </header>
  );
};
