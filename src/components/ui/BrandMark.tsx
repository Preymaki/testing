import React from 'react';

interface BrandMarkProps {
  className?: string;
  onClick?: () => void;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ className = '', onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded-sm transition-luxury ${className}`}
      aria-label="M.I.K — Maki Is King, return to top"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-sm bg-[#0C0D10] border border-white/10 group-hover:border-white/80 group-hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-luxury">
        <span className="font-mono text-xs font-bold tracking-wider text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
          M
        </span>
        <div className="absolute -bottom-[2px] w-3 h-[2px] bg-white opacity-90 shadow-[0_0_8px_rgba(255,255,255,0.9)] group-hover:w-4 transition-luxury" />
      </div>

      <div className="flex flex-col">
        <span className="font-display text-sm font-extrabold tracking-widest text-[#F8F8FA] group-hover:text-white transition-colors">
          M.I.K
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/45 group-hover:text-white/70 transition-colors">
          Maki Is King
        </span>
      </div>
    </button>
  );
};
