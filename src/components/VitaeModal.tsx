import React from 'react';
import { X, FileText, Download, Printer, CheckCircle2, Sparkles, MapPin, Mail, ExternalLink, Award, Briefcase, Languages, Globe } from 'lucide-react';
import { DEVELOPER_PROFILE, PROJECTS, SKILL_CATEGORIES, EXPERIENCE_LOGS, HONORS_ARCHIVE, LINGUISTIC_CAPABILITIES } from '../data/portfolioData';
import { audioEngine } from '../utils/audioSynth';

interface VitaeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEpistle: () => void;
}

export const VitaeModal: React.FC<VitaeModalProps> = ({ isOpen, onClose, onOpenEpistle }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="vitae-curriculum-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#171310] border border-[#d4af37]/60 shadow-[0_0_60px_rgba(212,175,55,0.25)] overflow-hidden gold-border-corner animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4af37]/30 bg-[#0f0d0b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f1a15] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
              <FileText size={16} />
            </div>
            <div>
              <span className="text-[10px] font-cinzel tracking-widest text-[#d4af37] uppercase font-bold block">
                CURRICULUM VITAE ARCHIVE
              </span>
              <h3 className="font-cinzel text-lg font-bold text-[#f5efe6]">
                {DEVELOPER_PROFILE.name} — Engineering Dossier
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={DEVELOPER_PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Official Web App Resume"
              className="p-2 rounded-xl bg-[#1f1a15] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0f0d0b] border border-[#d4af37]/30 transition-all flex items-center gap-1 text-xs font-cinzel font-bold px-3"
            >
              <span>Cloud CV</span>
              <ExternalLink size={13} />
            </a>

            <button
              id="print-vitae-btn"
              onClick={handlePrint}
              title="Print Curriculum"
              className="p-2 rounded-xl bg-[#1f1a15] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0f0d0b] border border-[#d4af37]/30 transition-all"
            >
              <Printer size={16} />
            </button>

            <button
              id="close-vitae-modal-btn"
              onClick={() => {
                audioEngine.playChime(440);
                onClose();
              }}
              className="p-2 rounded-xl bg-[#1f1a15] hover:bg-[#8b261e] border border-[#d4af37]/30 hover:border-[#8b261e] text-[#e6ded3] hover:text-white transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Vitae Document */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-140px)] space-y-6 text-[#f5efe6]">
          {/* Header Summary */}
          <div className="border-b border-[#d4af37]/20 pb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-tr from-[#8b261e] via-[#d4af37] to-[#f3cf58] shrink-0 shadow-lg">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#0f0d0b]">
                    <img
                      src={DEVELOPER_PROFILE.imageUrl}
                      alt={DEVELOPER_PROFILE.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEVELOPER_PROFILE.fallbackImageUrl;
                      }}
                      className="w-full h-full object-cover object-[50%_20%] scale-110 filter contrast-105"
                    />
                  </div>
                </div>

                <div>
                  <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f5efe6]">
                    {DEVELOPER_PROFILE.name}
                  </h1>
                  <p className="font-cinzel text-xs sm:text-sm uppercase tracking-wider text-[#d4af37] mt-0.5">
                    {DEVELOPER_PROFILE.title}
                  </p>
                  <span className="text-[11px] font-code text-[#c5bcaf] block mt-0.5">
                    Budapest, Hungary • CET
                  </span>
                </div>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap gap-1.5">
                {DEVELOPER_PROFILE.statusTags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-[#1f1a15] border border-[#d4af37]/30 text-[10px] font-cinzel text-[#f8e59e]">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-code text-[#c5bcaf]">
              <div className="flex items-center gap-1.5">
                <Mail size={12} className="text-[#d4af37]" />
                <span>{DEVELOPER_PROFILE.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe size={12} className="text-[#d4af37]" />
                <span>{DEVELOPER_PROFILE.linkedin}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#d4af37]" />
                <span>{DEVELOPER_PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-1.5">
              Engineering Profile &amp; Mission
            </span>
            <p className="font-cormorant text-base sm:text-lg text-[#c5bcaf] leading-relaxed">
              {DEVELOPER_PROFILE.bio}
            </p>
          </div>

          {/* Career Archive (Experience Logs) */}
          <div>
            <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-3 flex items-center gap-1.5">
              <Briefcase size={14} />
              Career Archive &amp; Professional Logs
            </span>
            <div className="space-y-3">
              {EXPERIENCE_LOGS.map((exp) => (
                <div key={exp.title + exp.organization} className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/25">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <div>
                      <span className="font-cinzel font-bold text-sm text-[#f5efe6]">{exp.title}</span>
                      <span className="text-xs font-cinzel text-[#d4af37] ml-2 font-semibold">@ {exp.organization}</span>
                    </div>
                    <span className="text-[11px] font-code text-[#f3cf58]">{exp.period} • {exp.location}</span>
                  </div>
                  <ul className="text-xs font-cormorant text-[#c5bcaf] space-y-1 list-disc list-inside mt-2 leading-relaxed">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Academic Laurels */}
          <div>
            <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-3 flex items-center gap-1.5">
              <Award size={14} />
              Academic Laurels &amp; Fellowships
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {HONORS_ARCHIVE.map((h) => (
                <div key={h.title} className="p-3.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 flex flex-col justify-between">
                  <div>
                    <span className="font-cinzel text-xs font-bold text-[#f5efe6] block">{h.title}</span>
                    <span className="text-xs font-code text-[#d4af37] block mt-0.5">{h.award}</span>
                    <p className="text-[11px] font-cormorant text-[#c5bcaf] mt-1">{h.description}</p>
                  </div>
                  <span className="text-[10px] font-code text-[#f3cf58] mt-2 block">{h.year} • {h.field}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Projects */}
          <div>
            <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-3">
              Key Engineering Systems &amp; Deployments
            </span>
            <div className="space-y-3">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                    <span className="font-cinzel font-bold text-sm text-[#f5efe6]">
                      {proj.title}
                    </span>
                    <span className="text-[11px] font-code text-[#d4af37]">{proj.period}</span>
                  </div>
                  <p className="text-xs font-cinzel text-[#d4af37] mb-2 uppercase">{proj.role}</p>
                  <p className="text-sm font-cormorant text-[#c5bcaf] leading-relaxed mb-2">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[10px] font-code px-1.5 py-0.5 rounded bg-[#1f1a15] text-[#e6ded3]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Protocols & Polyglot Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-2">
                Technical Stack &amp; Protocols
              </span>
              <div className="p-3.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 space-y-2">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.title}>
                    <span className="font-cinzel text-xs font-bold text-[#d4af37] block">
                      {cat.title}:
                    </span>
                    <span className="text-xs font-code text-[#c5bcaf]">
                      {cat.skills.map(s => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-2 flex items-center gap-1">
                <Languages size={13} />
                Linguistic Polyglot Matrix
              </span>
              <div className="p-3.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 space-y-1.5">
                {LINGUISTIC_CAPABILITIES.map((lang) => (
                  <div key={lang.language} className="flex items-center justify-between text-xs">
                    <span className="font-cinzel font-bold text-[#f5efe6]">{lang.language}</span>
                    <span className="font-code text-[#d4af37]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#d4af37]/30 bg-[#0f0d0b] flex items-center justify-between">
          <span className="text-[11px] font-cormorant italic text-[#c5bcaf]">
            Based in Budapest, Hungary • Available for Machine Learning &amp; Embedded Roles
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenEpistle();
            }}
            className="px-4 py-2 rounded-xl bg-[#d4af37] text-[#0f0d0b] font-cinzel text-xs font-bold hover:bg-[#f3cf58] transition-all"
          >
            Contact Abdellah
          </button>
        </div>
      </div>
    </div>
  );
};

