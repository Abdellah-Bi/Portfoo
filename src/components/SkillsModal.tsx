import React, { useState, useEffect } from 'react';
import { X, Cpu, BrainCircuit, Server, Code2, Terminal, Database } from 'lucide-react';
import { SKILL_CATEGORIES, TECHNICAL_PROTOCOLS } from '../data/portfolioData';

interface SkillsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SkillsModal: React.FC<SkillsModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentCat = SKILL_CATEGORIES[selectedCategoryIdx] || SKILL_CATEGORIES[0];

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
              TECHNICAL PROTOCOLS
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-white/60 font-mono hidden sm:inline">
              STACK & CODE REGISTRY
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

        {/* Category Tabs */}
        <div className="flex border-b border-white/15 bg-[#0e0e0e] overflow-x-auto no-scrollbar">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isSelected = selectedCategoryIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategoryIdx(idx)}
                className={`px-5 py-3.5 text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2 whitespace-nowrap transition-all border-b-2 ${
                  isSelected
                    ? 'border-white text-white bg-white/5 font-semibold'
                    : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <span className="font-pixel text-xs text-red-400">0{idx + 1}</span>
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-white">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{currentCat.title}</h3>
            <p className="text-xs sm:text-sm text-white/70">{currentCat.description}</p>
          </div>

          {/* Skill Blocks */}
          <div className="space-y-4">
            {currentCat.skills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/15 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                    <span className="text-xs text-red-400 font-pixel">{skill.experience}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-white/60">{skill.level}% Proficiency</span>
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-700"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-white/80">{skill.focus}</p>

                {/* Code Snippet Box */}
                {skill.codeSnippet && (
                  <div className="p-3 rounded-lg bg-black border border-white/10 font-mono text-[11px] text-white/90 overflow-x-auto whitespace-pre leading-relaxed">
                    <code>{skill.codeSnippet}</code>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Protocol Summary Matrix */}
          <div>
            <h4 className="font-pixel text-sm text-white/60 uppercase tracking-widest mb-3">
              Comprehensive Stack Index
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {TECHNICAL_PROTOCOLS.map((tp) => (
                <div
                  key={tp.name}
                  className="p-3 rounded-lg bg-[#0e0e0e] border border-white/10 flex justify-between items-center text-xs"
                >
                  <span className="font-semibold text-white">{tp.name}</span>
                  <span className="font-mono text-white/50 text-[11px]">{tp.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
