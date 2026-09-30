import React, { useState } from 'react';
import { NavItem, NavTarget } from '../../types';
import { Menu, X } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', targetId: 'zone-header', tag: '01' },
  { id: 'projects', label: 'Projects', targetId: 'zone-projects', tag: '02' },
  { id: 'about', label: 'About', targetId: 'zone-about', tag: '03' },
  { id: 'contact', label: 'Contact', targetId: 'zone-contact', tag: '04' },
];

interface NavbarProps {
  activeTarget: NavTarget;
  onSelectTarget: (target: NavTarget) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTarget, onSelectTarget }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (target: NavTarget) => {
    onSelectTarget(target);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="relative" aria-label="Main Portfolio Navigation">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1 p-1 bg-[#090A0D]/70 border border-white/8 rounded-full backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTarget === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white ${
                isActive
                  ? 'text-black font-semibold bg-white shadow-[0_0_20px_rgba(255,255,255,0.7),0_0_35px_rgba(255,255,255,0.35)] ring-1 ring-white'
                  : 'text-white/60 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="opacity-40 text-[9px] mr-1.5">/{item.tag}</span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#0C0D10]/80 border border-white/10 text-white/80 hover:text-white hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white transition-all"
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute right-0 top-12 w-48 p-2 bg-[#090A0D]/95 border border-white/10 rounded-xl backdrop-blur-xl shadow-2xl flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTarget === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-mono tracking-wider text-left transition-all ${
                  isActive
                    ? 'text-black font-semibold bg-white shadow-[0_0_16px_rgba(255,255,255,0.6)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span>{item.label}</span>
                <span className={`text-[9px] ${isActive ? 'text-black/60' : 'text-white/30'}`}>
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
