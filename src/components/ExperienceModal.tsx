import React, { useEffect } from 'react';
import { X, Briefcase, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCE_LOGS, HONORS_ARCHIVE } from '../data/portfolioData';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-2xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl my-auto bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-lg sm:text-xl text-white tracking-widest">
              EXPERIENCE & HONORS
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-white/60 font-mono hidden sm:inline">
              CAREER CHRONOLOGY
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-7 text-white">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-red-400" />
              <h3 className="font-pixel text-base text-white tracking-wider uppercase">
                Production Engineering Roles
              </h3>
            </div>

            <div className="space-y-4">
              {EXPERIENCE_LOGS.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/15 hover:border-white/30 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <span className="text-xs font-pixel text-red-400 uppercase tracking-wider block">
                        {exp.tag}
                      </span>
                      <h4 className="text-base font-bold text-white">{exp.title}</h4>
                      <span className="text-xs text-white/70 font-semibold">
                        {exp.organization}
                      </span>
                    </div>

                    <div className="text-left sm:text-right font-mono text-xs text-white/50">
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-1.5 pt-1">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-xs text-white/80 flex items-start gap-2">
                        <span className="text-white/40 mt-0.5 font-bold">›</span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Honors & Laureates */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} className="text-red-400" />
              <h3 className="font-pixel text-base text-white tracking-wider uppercase">
                Academic Honors & Laureates
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {HONORS_ARCHIVE.map((honor, hIdx) => (
                <div
                  key={hIdx}
                  className="p-4 rounded-xl bg-[#0e0e0e] border border-white/15 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono text-white/50 mb-1">
                      <span>{honor.year}</span>
                      <span className="text-red-400 font-pixel uppercase">{honor.field}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">{honor.title}</h4>
                    <span className="text-xs text-white/70 font-medium block mb-2 font-mono">
                      {honor.award}
                    </span>
                    <p className="text-xs text-white/60 leading-relaxed">{honor.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
