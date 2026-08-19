import React, { useState, useEffect } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Feather, Compass, Sparkles, FileText, MoveRight, Clock, MapPin, Award, Check, Copy } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface HeroChapterProps {
  onBeginFlight: () => void;
  onOpenEpistle: () => void;
}

export const HeroChapter: React.FC<HeroChapterProps> = ({ onBeginFlight, onOpenEpistle }) => {
  const [budapestTime, setBudapestTime] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Budapest',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).format(new Date());
        setBudapestTime(timeStr);
      } catch {
        setBudapestTime('CET / UTC+1');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    setCopiedEmail(true);
    audioEngine.playWaxSealThud();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="hero-chapter"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 md:px-8 py-20 text-center z-20"
    >
      {/* Background Vitruvian / Sacred Geometry Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
        <div className="relative w-[500px] h-[500px] md:w-[720px] md:h-[720px] rounded-full border border-[#d4af37] flex items-center justify-center">
          <div className="w-[350px] h-[350px] md:w-[520px] md:h-[520px] border border-[#d4af37] rotate-45" />
          <div className="absolute inset-8 rounded-full border border-dashed border-[#d4af37]" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-20">
        {/* Classical Epigraph Ribbon + Live Budapest CET Clock */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-2 rounded-full bg-[#171310]/95 border border-[#d4af37]/50 text-xs font-cinzel text-[#d4af37] mb-6 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-[#f3cf58]">
            <Sparkles size={13} />
            <span className="tracking-widest uppercase font-semibold">
              Codex Volatus • Renaissance Atelier
            </span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
          <div className="flex items-center gap-1.5 text-[#f5efe6] font-code text-[11px]">
            <MapPin size={12} className="text-[#8b261e]" />
            <span>Budapest, Hungary</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b261e]" />
          <div className="flex items-center gap-1.5 text-[#f3cf58] font-code text-[11px]">
            <Clock size={12} className="animate-pulse" />
            <span className="font-bold tracking-wider">{budapestTime || 'CET'} CET</span>
          </div>
        </div>

        {/* Animated Renaissance Portrait Medallion */}
        <div className="relative my-4 group cursor-pointer" onClick={() => audioEngine.playChime(659.25)}>
          {/* Outer Astrological Orbital Rings */}
          <div className="absolute -inset-4 rounded-full border border-dashed border-[#d4af37]/30 animate-[spin_30s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-7 rounded-full border border-[#f3cf58]/20 animate-[spin_45s_linear_infinite_reverse] pointer-events-none" />
          
          {/* Glowing Ambient Halo */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#8b261e]/40 via-[#d4af37]/30 to-[#f3cf58]/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Main Medallion Frame */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-b from-[#f3cf58] via-[#d4af37] to-[#8b261e] shadow-[0_0_35px_rgba(212,175,55,0.4)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] transition-all duration-500 transform group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#171310] bg-[#0f0d0b] relative">
              <img
                src={DEVELOPER_PROFILE.imageUrl}
                alt={DEVELOPER_PROFILE.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = DEVELOPER_PROFILE.fallbackImageUrl;
                }}
                className="w-full h-full object-cover object-[50%_20%] scale-110 filter contrast-105 brightness-105 transition-transform duration-500 ease-out"
              />
              {/* Shimmer Sweep */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0d0b]/40 via-transparent to-[#f3cf58]/20 pointer-events-none" />
            </div>

            {/* Live Status Beacon */}
            <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 rounded-full bg-[#171310] border-2 border-[#d4af37] flex items-center justify-center shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping absolute opacity-75" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>

        {/* Master Developer Name Heading */}
        <h1
          id="hero-title"
          className="font-cinzel text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#f5efe6] mb-3 leading-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]"
        >
          ABDELLAH
          <span className="block text-3xl sm:text-5xl md:text-6xl font-cinzel text-[#d4af37] font-semibold mt-1">
            BICHLIFEN
          </span>
        </h1>

        {/* Specialization & Title */}
        <div className="flex items-center justify-center gap-3 my-2">
          <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <p className="font-cinzel text-sm sm:text-base md:text-lg uppercase tracking-[0.2em] text-[#e6ded3] font-medium">
            {DEVELOPER_PROFILE.title}
          </p>
          <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Status Tags / Honors Matrix */}
        <div className="flex flex-wrap items-center justify-center gap-2 my-3 max-w-2xl">
          {DEVELOPER_PROFILE.statusTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md bg-[#1f1a15] border border-[#d4af37]/40 text-[#f8e59e] text-xs font-cinzel tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Award size={12} className="text-[#d4af37]" />
              {tag}
            </span>
          ))}
        </div>

        {/* Core Tagline */}
        <p className="font-cormorant text-xl sm:text-2xl md:text-3xl italic text-[#f8e59e] max-w-3xl mt-3 leading-relaxed font-light">
          &ldquo;{DEVELOPER_PROFILE.tagline}&rdquo;
        </p>

        {/* Hero Subtitle Description */}
        <p className="font-cormorant text-base sm:text-lg text-[#c5bcaf] max-w-2xl mt-3 leading-relaxed">
          {DEVELOPER_PROFILE.heroSubtitle}
        </p>

        {/* Interactive Action Buttons (Commence Flight, Resume Link, Copy Email) */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <button
            id="hero-begin-flight-btn"
            onClick={() => {
              audioEngine.playChime(523.25);
              onBeginFlight();
            }}
            className="group relative px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f3cf58] text-[#0f0d0b] font-cinzel font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5"
          >
            <Compass size={17} className="transition-transform group-hover:rotate-90 duration-500" />
            <span>COMMENCE FLIGHT</span>
            <MoveRight size={15} className="transition-transform group-hover:translate-x-1 duration-300" />
          </button>

          <a
            id="hero-resume-uplink"
            href={DEVELOPER_PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playQuillStroke()}
            className="px-6 py-3.5 rounded-xl bg-[#171310]/90 hover:bg-[#1f1a15] border border-[#d4af37]/60 hover:border-[#d4af37] text-[#f5efe6] font-cinzel text-sm tracking-wider transition-all duration-200 flex items-center gap-2 shadow-lg"
          >
            <FileText size={15} className="text-[#d4af37]" />
            <span>Curriculum Vitae Uplink</span>
          </a>

          <button
            id="hero-copy-email-btn"
            onClick={handleCopyEmail}
            className="px-5 py-3.5 rounded-xl bg-[#171310]/80 hover:bg-[#1f1a15] border border-[#8b261e]/60 hover:border-[#d4af37] text-[#c5bcaf] hover:text-[#f5efe6] font-code text-xs tracking-wider transition-all duration-200 flex items-center gap-2 shadow-md"
            title="Click to copy direct transmission address"
          >
            {copiedEmail ? (
              <>
                <Check size={14} className="text-emerald-400" />
                <span className="text-emerald-400">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-[#d4af37]" />
                <span>{DEVELOPER_PROFILE.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="mt-12 flex flex-col items-center gap-2 animate-bounce opacity-80 cursor-pointer" onClick={onBeginFlight}>
          <span className="text-[11px] font-cinzel uppercase tracking-widest text-[#d4af37]">
            Scroll to Navigate Fresco
          </span>
          <div className="w-5 h-8 rounded-full border border-[#d4af37]/60 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 rounded-full bg-[#f3cf58] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

