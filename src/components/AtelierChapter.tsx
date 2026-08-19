import React from 'react';
import { DEVELOPER_PROFILE, CODEX_QUOTES, EXPERIENCE_LOGS, HONORS_ARCHIVE } from '../data/portfolioData';
import { Cpu, BrainCircuit, Server, BookOpen, Sparkles, Award, Briefcase, ChevronRight, ExternalLink } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export const AtelierChapter: React.FC = () => {
  const pillarIcons = [Cpu, BrainCircuit, Server];

  return (
    <section
      id="chapter-atelier"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 py-20 z-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-cinzel tracking-widest text-[#d4af37] uppercase font-bold px-2.5 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
              CHAPTER I
            </span>
            <span className="text-xs font-cormorant italic text-[#c5bcaf]">
              Officina & Chronicon • Engineering Foundations & Career Archive
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5efe6] tracking-tight">
            THE ATELIER & ARCHIVE
          </h2>

          <div className="h-[1.5px] w-28 bg-gradient-to-r from-[#d4af37] via-[#f3cf58] to-transparent mt-3" />
        </div>

        {/* Two-Column Grid: Left Profile & Bio Parchment, Right Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Bio Parchment & Codex Inscription */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Parchment Box */}
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#171310]/90 backdrop-blur-md border border-[#d4af37]/30 shadow-2xl gold-border-corner">
              {/* Profile Portrait Header Card */}
              <div className="flex items-center gap-4 pb-4 mb-4 border-b border-[#d4af37]/20">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-tr from-[#8b261e] via-[#d4af37] to-[#f3cf58] shrink-0 shadow-lg group">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#0f0d0b]">
                    <img
                      src={DEVELOPER_PROFILE.imageUrl}
                      alt={DEVELOPER_PROFILE.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEVELOPER_PROFILE.fallbackImageUrl;
                      }}
                      className="w-full h-full object-cover object-[50%_20%] scale-110 filter contrast-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#171310] border border-[#d4af37] flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <BookOpen size={14} className="text-[#d4af37]" />
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                      Engineer's Monologue
                    </span>
                  </div>
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#f5efe6]">
                    {DEVELOPER_PROFILE.name}
                  </h3>
                  <span className="text-[11px] font-code text-[#f3cf58] block">
                    Budapest Node • CET
                  </span>
                </div>
              </div>

              {/* Bio Text */}
              <p className="font-cormorant text-lg sm:text-xl text-[#f5efe6] leading-relaxed mb-6 font-normal">
                {DEVELOPER_PROFILE.bio}
              </p>

              {/* Philosophical Accent */}
              <div className="p-4 rounded-xl bg-[#0f0d0b]/80 border-l-2 border-[#d4af37] space-y-1">
                <p className="font-cormorant italic text-sm text-[#e6ded3]">
                  &ldquo;{CODEX_QUOTES[1].quote}&rdquo;
                </p>
                <span className="text-[10px] font-cinzel text-[#d4af37] block">
                  — {CODEX_QUOTES[1].author} ({CODEX_QUOTES[1].latin})
                </span>
              </div>

              {/* Key Credentials Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-[#d4af37]/15">
                <div className="p-2.5 rounded-lg bg-[#1f1a15]/70 border border-[#d4af37]/15">
                  <span className="text-[10px] font-cinzel uppercase text-[#d4af37] block">Academic Honor</span>
                  <span className="font-cinzel text-sm font-bold text-[#f5efe6]">SH Scholar (BSc & MSc)</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#1f1a15]/70 border border-[#d4af37]/15">
                  <span className="text-[10px] font-cinzel uppercase text-[#d4af37] block">Current Mission</span>
                  <span className="font-cinzel text-sm font-bold text-[#f5efe6]">Diamond Diagnostics</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The 3 Core Pillars */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <h3 className="font-cinzel text-sm uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-2">
              <Sparkles size={14} />
              The Triad of Technical Engineering
            </h3>

            <div className="space-y-4">
              {DEVELOPER_PROFILE.pillars.map((pillar, idx) => {
                const IconComponent = pillarIcons[idx] || Cpu;
                return (
                  <div
                    key={pillar.title}
                    id={`pillar-card-${idx}`}
                    onMouseEnter={() => audioEngine.playQuillStroke()}
                    className="group relative p-5 sm:p-6 rounded-2xl bg-[#171310]/80 hover:bg-[#171310] backdrop-blur-md border border-[#d4af37]/25 hover:border-[#d4af37]/80 transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.15)] transform hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        {/* Golden Icon Frame */}
                        <div className="w-12 h-12 rounded-xl bg-[#1f1a15] border border-[#d4af37]/40 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-[#f3cf58] transition-all shadow-md">
                          <IconComponent size={22} className="text-[#d4af37] group-hover:text-[#f3cf58] transition-colors" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-cinzel text-lg font-bold text-[#f5efe6] group-hover:text-[#d4af37] transition-colors">
                              {pillar.title}
                            </h4>
                            <span className="text-[10px] font-cormorant italic text-[#c5bcaf]">
                              ({pillar.latin})
                            </span>
                          </div>
                          <p className="font-cormorant text-base text-[#c5bcaf] mt-1 leading-relaxed">
                            {pillar.desc}
                          </p>
                        </div>
                      </div>

                      {/* Stat Ribbon */}
                      <div className="sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#d4af37]/10">
                        <span className="font-cinzel text-lg font-black text-[#d4af37] block">
                          {pillar.stat}
                        </span>
                        <span className="text-[10px] font-code text-[#e6ded3]/70 uppercase tracking-wider">
                          {pillar.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Experience Logs & Academic Archive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-[#d4af37]/20">
          {/* Experience Logs Archive */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-base uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-2">
                <Briefcase size={16} />
                Experience Logs (Career Archive)
              </h3>
              <span className="text-xs font-code text-[#c5bcaf]">Active Chronicle</span>
            </div>

            <div className="space-y-3.5">
              {EXPERIENCE_LOGS.map((exp) => (
                <div
                  key={exp.title + exp.organization}
                  className="p-4 rounded-xl bg-[#171310]/85 border border-[#d4af37]/30 hover:border-[#d4af37] transition-colors space-y-2 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-[#f5efe6]">{exp.title}</h4>
                      <p className="text-xs font-cinzel text-[#d4af37]">{exp.organization} • {exp.location}</p>
                    </div>
                    <span className="text-[10px] font-code px-2 py-0.5 rounded bg-[#8b261e]/40 border border-[#8b261e] text-[#f8e59e] shrink-0">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-1 mt-2 text-xs font-cormorant text-[#c5bcaf] leading-relaxed list-disc list-inside">
                    {exp.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Honors & Academic Laurels */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-base uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-2">
                <Award size={16} />
                Honors & Academic Laurels
              </h3>
              <span className="text-xs font-code text-[#f3cf58]">Scholar Archive</span>
            </div>

            <div className="space-y-3.5">
              {HONORS_ARCHIVE.map((honor) => (
                <div
                  key={honor.title}
                  className="p-4 rounded-xl bg-[#171310]/85 border border-[#d4af37]/30 hover:border-[#f3cf58] transition-colors space-y-1.5 shadow-md"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-cinzel text-sm font-bold text-[#f5efe6] flex items-center gap-1.5">
                        <Award size={14} className="text-[#f3cf58]" />
                        {honor.title}
                      </h4>
                      <span className="text-xs font-code text-[#d4af37]">{honor.award} • {honor.field}</span>
                    </div>
                    <span className="text-[10px] font-code px-2 py-0.5 rounded bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f5efe6] shrink-0">
                      {honor.year}
                    </span>
                  </div>
                  <p className="text-xs font-cormorant text-[#c5bcaf] leading-relaxed">
                    {honor.description}
                  </p>
                </div>
              ))}

              {/* Single Uplink Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#1f1a15] to-[#171310] border border-[#d4af37]/50 flex items-center justify-between">
                <div>
                  <span className="text-xs font-cinzel font-bold text-[#f5efe6] block">Complete Academic & Professional CV</span>
                  <span className="text-[11px] font-cormorant text-[#c5bcaf]">Directly hosted on official cloud web app uplink</span>
                </div>
                <a
                  href={DEVELOPER_PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#d4af37] text-[#0f0d0b] text-xs font-cinzel font-bold tracking-wider hover:bg-[#f3cf58] flex items-center gap-1.5 shadow-md"
                >
                  <span>Open CV</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

