import React, { useEffect } from 'react';
import { X, CheckCircle2, Shield, Layers, FileText, ArrowUpRight, Cpu } from 'lucide-react';
import { TechBadge } from './TechBadge';

export interface DossierData {
  title: string;
  fullName: string;
  sectorTag: string;
  type: string;
  description: string;
  role: string;
  features: string[];
  workflowStatuses?: string[];
  technologies: string[];
  architectureNotes?: string;
  externalLink?: {
    label: string;
    url: string;
  };
}

interface ProjectDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DossierData | null;
}

export const ProjectDossierModal: React.FC<ProjectDossierModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
    >
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Surface */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#090A0E] border border-white/15 rounded-2xl p-6 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.05)] text-left z-10 flex flex-col gap-6">
        
        {/* Header telemetry & Close button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-2.5 font-mono text-[11px] text-white/50 tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span>PROJECT DOSSIER // {data.sectorTag}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-white/10 hover:border-white/40 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
            aria-label="Close project dossier"
          >
            <X size={16} />
          </button>
        </div>

        {/* Title & Core Subtitle */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">
            {data.type}
          </span>
          <h2
            id="dossier-title"
            className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
          >
            {data.fullName}
          </h2>
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-sm sm:text-base text-white/70 leading-relaxed">
          {data.description}
        </p>

        {/* Role Dossier */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/50 uppercase">
            <Cpu className="w-3.5 h-3.5 text-white/70" />
            <span>My Engineering Role & Contribution</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-white/80 leading-relaxed">
            {data.role}
          </p>
        </div>

        {/* Workflow Status Pipeline (if applicable) */}
        {data.workflowStatuses && data.workflowStatuses.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <span className="font-mono text-xs tracking-wider text-white/60 uppercase">
              // Application Lifecycle Pipeline:
            </span>
            <div className="flex flex-wrap gap-2">
              {data.workflowStatuses.map((st) => (
                <span
                  key={st}
                  className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-white/[0.04] border border-white/10 text-white/90"
                >
                  {st}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Matrix */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-wider text-white/60 uppercase">
            // Core Architecture & Features:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {data.features.map((feat) => (
              <div
                key={feat}
                className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.015] border border-white/5 text-xs text-white/80 font-sans"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture Notes */}
        {data.architectureNotes && (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/8 flex flex-col gap-1.5 font-mono text-xs text-white/70">
            <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-wider uppercase">
              <Layers className="w-3.5 h-3.5 text-white/60" />
              <span>System & Data Integrity Note</span>
            </div>
            <p>{data.architectureNotes}</p>
          </div>
        )}

        {/* Technology Stack Grid */}
        <div className="flex flex-col gap-2.5 pt-2 border-t border-white/10">
          <span className="font-mono text-xs tracking-wider text-white/60 uppercase">
            // Verified Technology Stack:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {data.technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>

        {/* External Link or Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="font-mono text-[10px] text-white/40 tracking-widest">
            AUTHENTICATED PRODUCTION ARCHITECTURE
          </span>
          {data.externalLink ? (
            <a
              href={data.externalLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-semibold hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>{data.externalLink.label}</span>
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-white text-xs font-mono transition-all"
            >
              RETURN TO ORBIT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
