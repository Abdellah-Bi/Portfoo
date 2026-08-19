import React, { useState } from 'react';
import { Sparkles, Maximize2, Shield, Eye } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface RenaissanceImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  aspectRatio?: '1:1' | '16:9' | '4:3' | '3:2' | '21:9';
  className?: string;
  badge?: string;
  showExpand?: boolean;
  onExpand?: () => void;
  accent?: 'gold' | 'amber' | 'crimson' | 'emerald';
}

export const RenaissanceImage: React.FC<RenaissanceImageProps> = ({
  src,
  fallbackSrc,
  alt,
  aspectRatio = '16:9',
  className = '',
  badge,
  showExpand = true,
  onExpand,
  accent = 'gold',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  const aspectClass = {
    '1:1': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    '21:9': 'aspect-[21/9]'
  }[aspectRatio];

  const accentBorder = {
    gold: 'border-[#d4af37]/40 group-hover:border-[#f3cf58]',
    amber: 'border-[#f59e0b]/40 group-hover:border-[#fbbf24]',
    crimson: 'border-[#8b261e]/50 group-hover:border-[#dc2626]',
    emerald: 'border-[#059669]/40 group-hover:border-[#10b981]'
  }[accent];

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-[#0f0d0b] border ${accentBorder} shadow-xl transition-all duration-500 ${aspectClass} ${className}`}
    >
      {/* Background Renaissance Texture Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0d0b] via-transparent to-[#d4af37]/10 opacity-70 z-10 pointer-events-none" />

      {/* Main Image */}
      {!hasError ? (
        <div className="w-full h-full p-2 flex items-center justify-center bg-[#070707]">
          <img
            src={currentSrc}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={handleError}
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-contain object-center transition-all duration-500 ease-out ${
              isLoaded ? 'opacity-100 filter contrast-105' : 'opacity-0'
            }`}
          />
        </div>
      ) : (
        /* Artistic Renaissance Fallback Canvas */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#1a140f] to-[#0f0d0b] relative">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative w-14 h-14 rounded-full border border-[#d4af37]/50 flex items-center justify-center mb-3 bg-[#171310]/80 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <Sparkles size={22} className="text-[#f3cf58] animate-pulse" />
          </div>
          <span className="font-cinzel text-xs font-bold text-[#f5efe6] tracking-wider text-center uppercase">
            {alt}
          </span>
          <span className="text-[10px] font-cormorant italic text-[#d4af37] mt-1">
            Da Vinci Engineering Codex
          </span>
        </div>
      )}

      {/* Shimmer Light Sweep on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#f3cf58]/20 to-transparent pointer-events-none z-20" />

      {/* 4 Golden Filigree Corner Accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#d4af37] pointer-events-none z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#d4af37] pointer-events-none z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#d4af37] pointer-events-none z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#d4af37] pointer-events-none z-20 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />

      {/* Optional Badge Overlay */}
      {badge && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-[#0f0d0b]/85 backdrop-blur-md border border-[#d4af37]/40 text-[10px] font-cinzel font-bold tracking-wider text-[#f8e59e] shadow-lg flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f3cf58] animate-ping" />
          <span>{badge}</span>
        </div>
      )}

      {/* Hover Expand Overlay */}
      {showExpand && onExpand && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            audioEngine.playQuillStroke();
            onExpand();
          }}
          className="absolute bottom-3 right-3 z-20 p-2 rounded-xl bg-[#171310]/90 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0f0d0b] border border-[#d4af37]/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
          title="Inspect Codex Fresco"
        >
          <Eye size={14} />
        </button>
      )}
    </div>
  );
};
