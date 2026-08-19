import React, { useState } from 'react';
import { Compass, Volume2, VolumeX, Navigation, MapPin, Feather, Sparkles } from 'lucide-react';
import { CHAPTERS } from '../data/portfolioData';
import { audioEngine } from '../utils/audioSynth';

interface AstrolabeProps {
  progress: number; // 0 to 1
  birdX: number;
  birdY: number;
  birdRotation: number;
  currentChapterIndex: number;
  onNavigateChapter: (chapterIndex: number) => void;
}

export const Astrolabe: React.FC<AstrolabeProps> = ({
  progress,
  birdX,
  birdY,
  birdRotation,
  currentChapterIndex,
  onNavigateChapter,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleAudio = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  const currentChapter = CHAPTERS[currentChapterIndex] || CHAPTERS[0];

  return (
    <div
      id="celestial-astrolabe-widget"
      className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-auto select-none"
    >
      {/* Main Astrolabe Orb & Mini-Map Container */}
      <div className="relative group">
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className={`cursor-pointer relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-[#171310]/90 backdrop-blur-md border border-[#d4af37]/40 shadow-xl transition-all duration-300 hover:border-[#d4af37] ${
            isExpanded ? 'ring-2 ring-[#d4af37]/50' : ''
          }`}
        >
          {/* Animated Mini Astrolabe Compass Ring */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            {/* Rotating Outer Celestial Ring */}
            <div
              className="absolute inset-0 rounded-full border border-dashed border-[#d4af37]/60 animate-spin"
              style={{ animationDuration: '24s' }}
            />
            {/* Middle Inscribed Ring */}
            <div
              className="absolute inset-1 rounded-full border border-[#d4af37]/40"
              style={{ transform: `rotate(${progress * 360}deg)` }}
            />
            {/* Center Compass Needle */}
            <Compass
              size={18}
              className="text-[#f3cf58] transition-transform duration-200"
              style={{ transform: `rotate(${birdRotation}deg)` }}
            />
            {/* Center Lodestone dot */}
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#8b261e]" />
          </div>

          {/* Current Station & Coordinates Badge */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#d4af37] font-bold">
                {currentChapter.numeral}
              </span>
              <span className="text-[9px] font-code text-[#c5bcaf] px-1 py-0.2 bg-[#0f0d0b] rounded border border-[#d4af37]/20">
                {Math.round(progress * 100)}%
              </span>
            </div>
            <span className="text-xs font-cinzel text-[#f5efe6] font-semibold truncate max-w-[140px]">
              {currentChapter.title}
            </span>
          </div>

          {/* Subtle expand indicator icon */}
          <Navigation
            size={14}
            className={`text-[#d4af37]/70 transition-transform duration-300 ${
              isExpanded ? 'rotate-180 text-[#f3cf58]' : ''
            }`}
          />
        </div>

        {/* Expanded Navigation Astrolabe / Codex Route Drawer */}
        {isExpanded && (
          <div className="absolute top-full right-0 mt-2 w-72 p-4 rounded-xl bg-[#171310]/95 backdrop-blur-xl border border-[#d4af37]/50 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-[#d4af37]">
                <Sparkles size={13} />
                <span>CELESTIAL ASTROLABE</span>
              </div>
              <span className="text-[10px] font-code text-[#c5bcaf]">
                ALT: {Math.round(100 - (birdY / (typeof window !== 'undefined' ? window.innerHeight : 900)) * 100)}°
              </span>
            </div>

            {/* Flight Coordinates Readout */}
            <div className="grid grid-cols-2 gap-2 mb-3 text-[10px] font-code text-[#c5bcaf] bg-[#0f0d0b]/80 p-2 rounded-lg border border-[#d4af37]/15">
              <div>
                <span className="text-[#8b261e]">X-LOC:</span> {Math.round(birdX)}px
              </div>
              <div>
                <span className="text-[#8b261e]">Y-LOC:</span> {Math.round(birdY)}px
              </div>
              <div>
                <span className="text-[#d4af37]">VECTOR:</span> {Math.round(birdRotation)}°
              </div>
              <div>
                <span className="text-[#d4af37]">STATION:</span> {currentChapterIndex + 1}/5
              </div>
            </div>

            {/* Mini Waypoints Route List */}
            <div className="space-y-1.5 mb-3">
              <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#d4af37]/80 block mb-1">
                Course Stations:
              </span>
              {CHAPTERS.map((ch, idx) => {
                const isActive = currentChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    id={`astrolabe-goto-${ch.id}`}
                    onClick={() => {
                      audioEngine.playChime(440 + idx * 70);
                      onNavigateChapter(idx);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-left text-xs transition-all ${
                      isActive
                        ? 'bg-[#d4af37]/20 text-[#f3cf58] border border-[#d4af37]/50 font-semibold'
                        : 'text-[#e6ded3]/80 hover:bg-[#1f1a15] hover:text-[#f5efe6] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-[#f3cf58] ring-2 ring-[#f3cf58]/40 animate-pulse' : 'bg-[#d4af37]/40'
                        }`}
                      />
                      <span className="font-cinzel text-[11px]">{ch.numeral}: {ch.title}</span>
                    </div>
                    <MapPin size={11} className={isActive ? 'text-[#f3cf58]' : 'text-transparent'} />
                  </button>
                );
              })}
            </div>

            {/* Soundscape Synthesizer Toggle */}
            <div className="pt-2 border-t border-[#d4af37]/20 flex items-center justify-between">
              <span className="text-[11px] font-cormorant italic text-[#c5bcaf]">
                {isMuted ? 'Harmonic Drone Muted' : 'Lute Drone Active'}
              </span>
              <button
                id="astrolabe-audio-toggle-btn"
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-all ${
                  !isMuted
                    ? 'bg-[#d4af37] text-[#0f0d0b] font-semibold'
                    : 'bg-[#1f1a15] text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37]'
                }`}
              >
                {!isMuted ? <Volume2 size={13} /> : <VolumeX size={13} />}
                <span>{!isMuted ? 'Mute' : 'Synthesize Audio'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Audio Soundscape Quick Icon */}
      <button
        id="quick-audio-toggle"
        onClick={handleToggleAudio}
        title={isMuted ? "Enable Renaissance Soundscape" : "Mute Soundscape"}
        className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
          !isMuted
            ? 'bg-[#d4af37] text-[#0f0d0b] border-[#f3cf58] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
            : 'bg-[#171310]/80 text-[#d4af37]/70 border-[#d4af37]/30 hover:text-[#d4af37] hover:border-[#d4af37]'
        }`}
      >
        {!isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
    </div>
  );
};
