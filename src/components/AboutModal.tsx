import React, { useState, useEffect } from 'react';
import { X, MapPin, Mail, Github, Linkedin, FileText, Globe, Award, Sparkles, ZoomIn, Maximize2 } from 'lucide-react';
import { DEVELOPER_PROFILE, LINGUISTIC_CAPABILITIES } from '../data/portfolioData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProjects: () => void;
  onOpenContact: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenProjects,
  onOpenContact,
}) => {
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isImageEnlarged) {
          setIsImageEnlarged(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isImageEnlarged, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-2xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="relative w-full max-w-4xl my-auto bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-lg sm:text-xl text-white tracking-widest">
              ENGINEER DOSSIER
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-white/60 font-mono hidden sm:inline">
              ABDELLAH BICHLIFEN
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal (Esc)"
            title="Close (Esc)"
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-white">
          {/* Profile Hero Grid */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Portrait Image with Zoom Hover & Click Expansion */}
            <div
              className="relative w-full sm:w-56 md:w-64 shrink-0 rounded-xl overflow-hidden border border-white/25 bg-[#060606] aspect-square sm:aspect-[4/5] flex items-center justify-center group cursor-pointer"
              onClick={() => setIsImageEnlarged(true)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              title="Click to view high-resolution portrait"
            >
              <img
                src={DEVELOPER_PROFILE.imageUrl}
                alt={DEVELOPER_PROFILE.name}
                className="w-full h-full object-cover object-[50%_20%] scale-105 group-hover:scale-125 transition-transform duration-500 ease-out filter brightness-100 group-hover:brightness-105 contrast-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== DEVELOPER_PROFILE.fallbackImageUrl) {
                    target.src = DEVELOPER_PROFILE.fallbackImageUrl;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-30 transition-opacity" />
              
              {/* Zoom Hover Badge Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/30 backdrop-blur-[1px]">
                <div className="bg-black/80 border border-white/40 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs text-white shadow-xl transform scale-95 group-hover:scale-100 transition-transform">
                  <ZoomIn size={14} className="text-white" />
                  <span className="font-mono text-[11px] uppercase tracking-wider">Inspect Portrait</span>
                </div>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-pixel pointer-events-none">
                <span className="bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono text-[10px]">
                  ● ONLINE // CET
                </span>
                <span className="text-white/80 font-mono text-[10px] bg-black/70 px-1.5 py-0.5 rounded border border-white/10">BUDAPEST</span>
              </div>
            </div>

            {/* Engineer Narrative */}
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-pixel text-xs text-red-400 uppercase tracking-widest">
                    Machine Learning & Embedded Systems
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {DEVELOPER_PROFILE.name}
                </h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/60 mt-1 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-white/40" />
                    {DEVELOPER_PROFILE.location}
                  </span>
                  <span>•</span>
                  <span>{DEVELOPER_PROFILE.timezone}</span>
                </div>
              </div>

              <p className="text-sm text-white/80 leading-relaxed">
                {DEVELOPER_PROFILE.bio}
              </p>

              {/* Status Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {DEVELOPER_PROFILE.statusTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded bg-white/10 text-white text-xs font-mono border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Quick Action Links */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={DEVELOPER_PROFILE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-white/90 transition-colors"
                >
                  <FileText size={13} />
                  <span>Curriculum Vitae</span>
                </a>
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="px-4 py-2 rounded-lg border border-white/30 text-white text-xs flex items-center gap-1.5 hover:bg-white/10 transition-colors"
                >
                  <Mail size={13} />
                  <span>Direct Dispatch</span>
                </button>
                <a
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-white/20 text-white/80 text-xs flex items-center gap-1.5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Github size={13} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/abdellah-bichlifen"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-white/20 text-white/80 text-xs flex items-center gap-1.5 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Linkedin size={13} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Three Engineering Pillars */}
          <div>
            <h3 className="font-pixel text-sm text-white/60 uppercase tracking-widest mb-3">
              Engineering Disciplines & Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {DEVELOPER_PROFILE.pillars.map((pillar, pIdx) => (
                <div
                  key={pIdx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/15 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-pixel text-xs text-red-400 block mb-1">
                      PILLAR 0{pIdx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white mb-2">{pillar.title}</h4>
                    <p className="text-xs text-white/70 leading-relaxed">{pillar.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[11px] font-mono">
                    <span className="text-white/50">{pillar.statLabel}</span>
                    <span className="text-white font-bold">{pillar.stat}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linguistic Mastery */}
          <div>
            <h3 className="font-pixel text-sm text-white/60 uppercase tracking-widest mb-3">
              Linguistic Protocols
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {LINGUISTIC_CAPABILITIES.map((ling) => (
                <div
                  key={ling.language}
                  className="p-3.5 rounded-lg bg-[#0e0e0e] border border-white/15"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">{ling.language}</span>
                    <span className="text-[10px] font-mono text-white/50">{ling.level}%</span>
                  </div>
                  <span className="text-[11px] text-red-400 block font-pixel">
                    {ling.proficiency}
                  </span>
                  <p className="text-[10px] text-white/50 mt-1">{ling.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Portrait Lightbox Modal */}
      {isImageEnlarged && (
        <div
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsImageEnlarged(false)}
        >
          <div
            className="relative max-w-2xl w-full max-h-[90vh] bg-[#0c0c0c] border border-white/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center p-3 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with close */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-white/15 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-sm text-white tracking-widest">
                  ABDELLAH BICHLIFEN
                </span>
                <span className="text-white/40 text-xs font-mono">• PORTRAIT DOSSIER</span>
              </div>
              <button
                onClick={() => setIsImageEnlarged(false)}
                aria-label="Close enlarged portrait"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* High-res image display */}
            <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-xl bg-black border border-white/20">
              <img
                src={DEVELOPER_PROFILE.imageUrl}
                alt={DEVELOPER_PROFILE.name}
                className="max-h-[70vh] w-auto object-contain scale-100 hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src !== DEVELOPER_PROFILE.fallbackImageUrl) {
                    target.src = DEVELOPER_PROFILE.fallbackImageUrl;
                  }
                }}
              />
            </div>

            {/* Caption */}
            <div className="w-full flex items-center justify-between pt-3 text-xs text-white/60 font-mono">
              <span>Machine Learning MSc • Software Engineer</span>
              <span className="text-white/40">Press Esc or click anywhere to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
