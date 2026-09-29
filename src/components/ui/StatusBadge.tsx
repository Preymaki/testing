import React from 'react';

interface StatusBadgeProps {
  label?: string;
  sublabel?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label = 'UNIVERSE ONLINE',
  sublabel = 'CORE // 01',
}) => {
  return (
    <div
      className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0C0D10]/80 border border-white/8 backdrop-blur-sm select-none"
      role="status"
      aria-label={`${label} - ${sublabel}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
        {label}
      </span>
      <span className="text-white/20 text-[10px] font-mono">/</span>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/90 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]">
        {sublabel}
      </span>
    </div>
  );
};
