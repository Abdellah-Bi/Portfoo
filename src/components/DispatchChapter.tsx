import React, { useState } from 'react';
import { DEVELOPER_PROFILE, CODEX_QUOTES } from '../data/portfolioData';
import { Feather, Mail, Github, Linkedin, FileText, Send, Copy, Check, Sparkles, MapPin } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

interface DispatchChapterProps {
  onOpenEpistle: () => void;
  onOpenVitae: () => void;
}

export const DispatchChapter: React.FC<DispatchChapterProps> = ({ onOpenEpistle, onOpenVitae }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    setCopiedEmail(true);
    audioEngine.playChime(659.25);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="chapter-dispatch"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-12 py-20 z-20"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-cinzel tracking-widest text-[#d4af37] uppercase font-bold px-2.5 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
              CHAPTER IV
            </span>
            <span className="text-xs font-cormorant italic text-[#c5bcaf]">
              Epistola & Inscriptio • Contact & Transmission
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5efe6] tracking-tight">
            THE DISPATCH
          </h2>

          <div className="h-[1.5px] w-24 bg-gradient-to-r from-[#d4af37] via-[#f3cf58] to-transparent mt-3" />
        </div>

        {/* Dispatch Parchment Center Box */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-[#171310]/95 backdrop-blur-xl border border-[#d4af37]/40 shadow-[0_0_50px_rgba(0,0,0,0.8)] gold-border-corner">
          {/* Wax Seal Stamp Top Right */}
          <div className="absolute -top-5 -right-3 sm:-top-6 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#8b261e] border-2 border-[#d4af37] shadow-xl flex items-center justify-center transform rotate-12">
            <div className="w-10 h-10 rounded-full border border-[#d4af37]/40 flex items-center justify-center">
              <span className="font-cinzel-decorative font-bold text-sm text-[#f5efe6]">
                AB
              </span>
            </div>
          </div>

          <div className="max-w-2xl">
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#f5efe6] mb-3">
              Commence a Technical Dialogue
            </h3>

            <p className="font-cormorant text-lg sm:text-xl text-[#c5bcaf] leading-relaxed mb-8">
              Whether architecting a zero-latency enterprise system, orchestrating complex frontend choreographies, or consulting on modern web engineering, my quill is ready.
            </p>

            {/* Direct Email Display Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 rounded-2xl bg-[#0f0d0b] border border-[#d4af37]/30 mb-8">
              <div className="flex items-center gap-3 px-3 py-1 flex-1 min-w-0">
                <Mail size={18} className="text-[#d4af37] shrink-0" />
                <span className="font-code text-sm sm:text-base text-[#f8e59e] truncate selection:bg-[#d4af37]/30">
                  {DEVELOPER_PROFILE.email}
                </span>
              </div>

              <button
                id="copy-email-btn"
                onClick={handleCopyEmail}
                className="px-4 py-2 rounded-xl bg-[#1f1a15] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0f0d0b] border border-[#d4af37]/40 font-cinzel text-xs font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
              >
                {copiedEmail ? <Check size={14} className="text-[#0f0d0b]" /> : <Copy size={14} />}
                <span>{copiedEmail ? 'Copied to Codex' : 'Copy Address'}</span>
              </button>
            </div>

            {/* Primary Action Buttons: Send Epistle & Download Vitae */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                id="dispatch-send-epistle-btn"
                onClick={() => {
                  audioEngine.playWaxSealThud();
                  onOpenEpistle();
                }}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f3cf58] text-[#0f0d0b] font-cinzel font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5"
              >
                <Feather size={17} />
                <span>SEND AN EPISTLE</span>
              </button>

              <button
                id="dispatch-download-vitae-btn"
                onClick={() => {
                  audioEngine.playQuillStroke();
                  onOpenVitae();
                }}
                className="px-6 py-3.5 rounded-xl bg-[#1f1a15] hover:bg-[#171310] border border-[#d4af37]/40 hover:border-[#d4af37] text-[#f5efe6] font-cinzel text-sm tracking-wider transition-all duration-200 flex items-center gap-2 shadow-md"
              >
                <FileText size={16} className="text-[#d4af37]" />
                <span>Open Vitae Dossier</span>
              </button>

              <a
                href={DEVELOPER_PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#0f0d0b] hover:bg-[#1f1a15] border border-[#d4af37]/30 text-[#d4af37] hover:text-[#f8e59e] font-cinzel text-xs tracking-wider transition-all flex items-center gap-2"
              >
                <span>Live Resume Web App</span>
                <Sparkles size={14} className="text-[#d4af37]" />
              </a>
            </div>

            {/* Social Channels & Professional Transmissions */}
            <div className="pt-6 border-t border-[#d4af37]/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  id="link-github"
                  href={DEVELOPER_PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-[#d4af37] hover:text-[#f3cf58] hover:border-[#d4af37] transition-all hover:scale-110"
                  title="GitHub Codex Repository"
                >
                  <Github size={18} />
                </a>

                <a
                  id="link-linkedin"
                  href={DEVELOPER_PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-[#d4af37] hover:text-[#f3cf58] hover:border-[#d4af37] transition-all hover:scale-110"
                  title="LinkedIn Professional Network"
                >
                  <Linkedin size={18} />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs font-cormorant italic text-[#c5bcaf]">
                <MapPin size={13} className="text-[#d4af37]" />
                <span>{DEVELOPER_PROFILE.location}</span>
                <span className="w-1 h-1 rounded-full bg-[#8b261e]" />
                <span>Available for Global Architectures</span>
              </div>
            </div>
          </div>
        </div>

        {/* Classical Colophon Footer */}
        <footer className="mt-16 text-center text-xs font-cormorant text-[#c5bcaf] space-y-1">
          <p className="font-cinzel text-[11px] tracking-widest text-[#d4af37]">
            EX ARTE ET RATIONE • ABDELLAH BICHLIFEN MMXXVI
          </p>
          <p className="italic">
            &ldquo;{CODEX_QUOTES[1].quote}&rdquo; — Leonardo da Vinci
          </p>
        </footer>
      </div>
    </section>
  );
};
