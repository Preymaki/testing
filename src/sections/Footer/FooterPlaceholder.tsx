import React from 'react';
import { BrandMark } from '../../components/ui/BrandMark';

export const FooterPlaceholder: React.FC = () => {
  return (
    <footer
      id="zone-contact"
      className="relative w-full py-16 px-6 sm:px-12 bg-black border-t border-white/8 flex flex-col items-center justify-between gap-8 text-center"
      role="contentinfo"
      aria-label="Universe Footer"
    >
      <div className="flex flex-col items-center gap-4">
        <BrandMark />
        <span className="font-mono text-xs tracking-wider text-white/40">
          ZONE 03 // CONTACT & TERMINAL FOUNDATION
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-5xl pt-8 border-t border-white/5 text-[11px] font-mono text-white/35 gap-4">
        <span>© {new Date().getFullYear()} M.I.K — MAKI IS KING. ALL RIGHTS RESERVED.</span>
        <div className="flex items-center gap-6">
          <a
            href="#zone-header"
            className="hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
          >
            ↑ RETURN TO ORIGIN
          </a>
        </div>
      </div>
    </footer>
  );
};
