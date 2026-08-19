import React, { useState } from 'react';
import { SKILL_CATEGORIES, LINGUISTIC_CAPABILITIES } from '../data/portfolioData';
import { Layout, Server, Cloud, Code, Sparkles, Terminal, Cpu, BrainCircuit, Database, Globe, Languages } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export const WorkshopChapter: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  const activeCategory = SKILL_CATEGORIES[activeCategoryIndex] || SKILL_CATEGORIES[0];
  const activeSkill = activeCategory.skills[selectedSkillIndex] || activeCategory.skills[0];

  const categoryIcons = [Cpu, BrainCircuit, Database, Cloud];

  return (
    <section
      id="chapter-workshop"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 py-20 z-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col items-start mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-cinzel tracking-widest text-[#d4af37] uppercase font-bold px-2.5 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
              CHAPTER II
            </span>
            <span className="text-xs font-cormorant italic text-[#c5bcaf]">
              Artes Mechanicae • Technical Protocols, Embedded Stack & Languages
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5efe6] tracking-tight">
            THE TECHNICAL WORKSHOP
          </h2>

          <div className="h-[1.5px] w-28 bg-gradient-to-r from-[#d4af37] via-[#f3cf58] to-transparent mt-3" />
        </div>

        {/* Workshop Category Selector Tabs */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const IconComponent = categoryIcons[idx % categoryIcons.length] || Cpu;
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.title}
                id={`workshop-tab-${idx}`}
                onClick={() => {
                  audioEngine.playChime(380 + idx * 70);
                  setActiveCategoryIndex(idx);
                  setSelectedSkillIndex(0);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-cinzel text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 border ${
                  isActive
                    ? 'bg-[#d4af37] text-[#0f0d0b] border-[#f3cf58] shadow-[0_0_20px_rgba(212,175,55,0.35)] scale-[1.02]'
                    : 'bg-[#171310]/80 text-[#e6ded3] border-[#d4af37]/30 hover:border-[#d4af37] hover:bg-[#1f1a15]'
                }`}
              >
                <IconComponent size={15} />
                <span>{cat.title}</span>
                <span className={`text-[10px] italic font-cormorant ml-1 hidden sm:inline ${isActive ? 'text-[#0f0d0b]/80' : 'text-[#c5bcaf]'}`}>
                  ({cat.latinName})
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Workshop Grid: Left Skills Roster, Right Technical Inscription & Code Codex */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Left: Skills Roster */}
          <div className="lg:col-span-6 space-y-3">
            <p className="text-sm font-cormorant italic text-[#c5bcaf] mb-3">
              {activeCategory.description}
            </p>

            {activeCategory.skills.map((skill, idx) => {
              const isSelected = selectedSkillIndex === idx;
              return (
                <div
                  key={skill.name}
                  id={`skill-item-${idx}`}
                  onClick={() => {
                    audioEngine.playQuillStroke();
                    setSelectedSkillIndex(idx);
                  }}
                  className={`cursor-pointer p-4 rounded-xl transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#1f1a15] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.2)] translate-x-1.5'
                      : 'bg-[#171310]/70 border-[#d4af37]/20 hover:border-[#d4af37]/50 hover:bg-[#171310]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-sm sm:text-base font-bold text-[#f5efe6]">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-code text-[#d4af37] px-1.5 py-0.5 rounded bg-[#0f0d0b] border border-[#d4af37]/20">
                        {skill.experience}
                      </span>
                    </div>
                    <span className="font-code text-xs font-bold text-[#f3cf58]">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Golden Proficiency Meter */}
                  <div className="w-full h-1.5 rounded-full bg-[#0f0d0b] overflow-hidden border border-[#d4af37]/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8b261e] via-[#d4af37] to-[#f3cf58] transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Skill Focus Annotation */}
                  <p className="text-xs font-cormorant text-[#c5bcaf] mt-2 truncate">
                    Protocol: {skill.focus}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Technical Inscription & Code Codex */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#171310]/95 backdrop-blur-md border border-[#d4af37]/40 shadow-2xl gold-border-corner">
              {/* Codex Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#d4af37]/20">
                <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#d4af37]">
                  <Terminal size={14} className="text-[#f3cf58]" />
                  <span>TECHNICAL CODEX // {activeSkill.name.toUpperCase()}</span>
                </div>
                <span className="text-[10px] font-code text-[#f3cf58]">
                  MASTERY: {activeSkill.level}/100
                </span>
              </div>

              {/* Skill Deep Details */}
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#d4af37] block mb-1">
                    System Application & Engineering Focus
                  </span>
                  <p className="font-cormorant text-base text-[#f5efe6] leading-relaxed">
                    {activeSkill.focus}
                  </p>
                </div>

                {/* Live Code Archetype Inscription */}
                {activeSkill.codeSnippet && (
                  <div>
                    <span className="text-[11px] font-cinzel uppercase tracking-wider text-[#d4af37] block mb-1.5 flex items-center gap-1.5">
                      <Code size={13} />
                      Production Firmware / Architecture Pattern:
                    </span>
                    <div className="p-3.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/25 font-code text-xs text-[#f8e59e] overflow-x-auto shadow-inner max-h-52">
                      <pre className="whitespace-pre">{activeSkill.codeSnippet}</pre>
                    </div>
                  </div>
                )}

                {/* Da Vinci Workshop Seal */}
                <div className="pt-3 border-t border-[#d4af37]/15 flex items-center justify-between text-xs font-cormorant italic text-[#c5bcaf]">
                  <span>Validated in Real-Time Embedded & Cloud Systems</span>
                  <span className="text-[#d4af37] font-cinzel not-italic text-[10px]">
                    ★ TESTED & BENCHMARKED
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Linguistic Capabilities & Global Communication Node */}
        <div className="p-5 rounded-2xl bg-[#171310]/80 border border-[#d4af37]/30 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-cinzel text-sm uppercase tracking-wider text-[#d4af37] font-bold flex items-center gap-2">
              <Languages size={16} />
              Linguistic Capabilities (Polyglot Matrix)
            </h3>
            <span className="text-xs font-code text-[#c5bcaf]">Global Communication Matrix</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LINGUISTIC_CAPABILITIES.map((lang) => (
              <div key={lang.language} className="p-3 rounded-xl bg-[#1f1a15]/90 border border-[#d4af37]/20">
                <span className="text-xs font-cinzel font-bold text-[#f5efe6] block">{lang.language}</span>
                <span className="text-xs font-code text-[#d4af37] font-semibold">{lang.proficiency}</span>
                <span className="text-[10px] font-cormorant text-[#c5bcaf] block mt-0.5">{lang.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

