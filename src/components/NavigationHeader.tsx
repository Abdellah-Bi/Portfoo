import React from 'react';
import { Feather, FileText, Compass, Sparkles, Cpu } from 'lucide-react';
import { CHAPTERS, DEVELOPER_PROFILE } from '../data/portfolioData';
import { audioEngine } from '../utils/audioSynth';

interface NavigationHeaderProps {
  currentChapterIndex: number;
  onNavigateChapter: (chapterIndex: number) => void;
  onOpenEpistle: () => void;
  onOpenVitae: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentChapterIndex,
  onNavigateChapter,
  onOpenEpistle,
  onOpenVitae,
}) => {
  return (
    <header
      id="renaissance-masthead"
      className="fixed top-0 left-0 right-0 z-30 px-4 md:px-8 py-3 flex items-center justify-between pointer-events-none"
    >
      {/* Brand Monogram Seal */}
      <div className="flex items-center gap-3 pointer-events-auto group cursor-pointer" onClick={() => onNavigateChapter(0)}>
        <div className="relative w-10 h-10 rounded-lg bg-[#171310] border border-[#d4af37]/60 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-[#f3cf58]">
          {/* Subtle gold inner border */}
          <div className="absolute inset-0.5 rounded border border-[#d4af37]/20 pointer-events-none" />
          <span className="font-cinzel-decorative font-bold text-lg text-[#d4af37] group-hover:text-[#f3cf58] transition-colors">
            AB
          </span>
          <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#8b261e] border border-[#d4af37]" />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-cinzel text-sm md:text-base font-bold tracking-wider text-[#f5efe6] group-hover:text-[#d4af37] transition-colors">
              ABDELLAH BICHLIFEN
            </span>
            <span className="text-[10px] font-code text-[#d4af37] hidden sm:inline-block">
              // ML & EMBEDDED
            </span>
          </div>
          <span className="text-[10px] font-cormorant italic text-[#c5bcaf] tracking-wide">
            Budapest Node • SH Scholar • MMXXVI
          </span>
        </div>
      </div>

      {/* Desktop Chapter Jump Pills */}
      <nav className="hidden lg:flex items-center gap-1 bg-[#171310]/80 backdrop-blur-md px-2 py-1 rounded-full border border-[#d4af37]/30 shadow-lg pointer-events-auto">
        {CHAPTERS.map((ch, idx) => {
          const isActive = currentChapterIndex === idx;
          return (
            <button
              key={ch.id}
              id={`nav-pill-${ch.id}`}
              onClick={() => {
                audioEngine.playChime(350 + idx * 80);
                onNavigateChapter(idx);
              }}
              className={`px-3 py-1 rounded-full text-xs font-cinzel tracking-wider transition-all duration-200 ${
                isActive
                  ? 'bg-[#d4af37] text-[#0f0d0b] font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                  : 'text-[#e6ded3]/80 hover:text-[#f5efe6] hover:bg-[#1f1a15]'
              }`}
            >
              {ch.numeral.replace('CHAPTER ', '')}
            </button>
          );
        })}
      </nav>

      {/* Action Quick Actions (Epistle & Vitae) */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <a
          id="nav-resume-link"
          href={DEVELOPER_PROFILE.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171310]/90 backdrop-blur-md border border-[#d4af37]/40 text-[#f5efe6] text-xs font-cinzel hover:border-[#d4af37] hover:text-[#f3cf58] transition-all shadow-md"
        >
          <FileText size={13} className="text-[#d4af37]" />
          <span>Resume Link</span>
        </a>

        <button
          id="nav-open-vitae-btn"
          onClick={() => {
            audioEngine.playQuillStroke();
            onOpenVitae();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171310]/90 backdrop-blur-md border border-[#d4af37]/40 text-[#f5efe6] text-xs font-cinzel hover:border-[#d4af37] hover:text-[#f3cf58] transition-all shadow-md"
        >
          <Cpu size={13} className="text-[#d4af37]" />
          <span>Vitae (Archive)</span>
        </button>

        <button
          id="nav-open-epistle-btn"
          onClick={() => {
            audioEngine.playWaxSealThud();
            onOpenEpistle();
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#d4af37] hover:bg-[#f3cf58] text-[#0f0d0b] text-xs font-cinzel font-bold tracking-wide transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105"
        >
          <Feather size={14} />
          <span>Dispatch Epistle</span>
        </button>
      </div>
    </header>
  );
};

