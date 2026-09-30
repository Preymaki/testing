import React from 'react';

interface TechBadgeProps {
  name: string;
  category?: 'core' | 'backend' | 'ui' | 'tool';
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider bg-white/[0.03] border border-white/10 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/[0.07] hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] transition-all duration-200 select-none">
      <span className="w-1 h-1 rounded-full bg-white/40" />
      {name}
    </span>
  );
};
