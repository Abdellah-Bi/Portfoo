import React, { useState } from 'react';
import { X, Feather, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { audioEngine } from '../utils/audioSynth';
import confetti from 'canvas-confetti';

interface EpistleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EpistleModal: React.FC<EpistleModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Architectural Inquest');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    audioEngine.playWaxSealThud();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      audioEngine.playChime(784); // G5 chime

      // Launch celebratory gold confetti
      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f3cf58', '#8b261e', '#f5efe6'],
        });
      } catch {}
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      id="epistle-contact-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl bg-[#171310] border border-[#d4af37]/60 shadow-[0_0_60px_rgba(212,175,55,0.3)] overflow-hidden gold-border-corner animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4af37]/30 bg-[#0f0d0b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f1a15] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37]">
              <Feather size={16} />
            </div>
            <div>
              <span className="text-[10px] font-cinzel tracking-widest text-[#d4af37] uppercase font-bold block">
                COMMUNICATION CONDUIT
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f5efe6]">
                Send an Epistle to Abdellah
              </h3>
            </div>
          </div>

          <button
            id="close-epistle-modal-btn"
            onClick={() => {
              audioEngine.playChime(440);
              onClose();
            }}
            className="p-2 rounded-xl bg-[#1f1a15] hover:bg-[#8b261e] border border-[#d4af37]/30 hover:border-[#8b261e] text-[#e6ded3] hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content Form */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8b261e] border-2 border-[#d4af37] flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 size={32} className="text-[#f5efe6]" />
              </div>

              <h4 className="font-cinzel text-2xl font-bold text-[#f5efe6]">
                Epistle Inscribed &amp; Dispatched
              </h4>

              <p className="font-cormorant text-lg text-[#c5bcaf] max-w-md mx-auto leading-relaxed">
                Your message has been sealed with the Renaissance crest and transmitted to <span className="text-[#f8e59e] font-code text-sm">{DEVELOPER_PROFILE.email}</span>. Abdellah will reply shortly.
              </p>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-[#d4af37] text-[#0f0d0b] font-cinzel font-bold text-xs tracking-wider transition-all hover:bg-[#f3cf58]"
              >
                Close Codex
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Author Name */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold">
                    Signatory Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      audioEngine.playQuillStroke();
                    }}
                    placeholder="e.g. Leonardo da Vinci"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-[#f5efe6] font-cormorant text-base focus:border-[#d4af37] focus:outline-none placeholder:text-[#c5bcaf]/40 shadow-inner"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold">
                    Return Dispatch (Email)
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      audioEngine.playQuillStroke();
                    }}
                    placeholder="e.g. architect@florence.it"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-[#f5efe6] font-cormorant text-base focus:border-[#d4af37] focus:outline-none placeholder:text-[#c5bcaf]/40 shadow-inner"
                  />
                </div>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold">
                  Nature of Inscription
                </label>
                <select
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    audioEngine.playQuillStroke();
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-[#f5efe6] font-cinzel text-xs focus:border-[#d4af37] focus:outline-none shadow-inner"
                >
                  <option value="Architectural Inquest">Architectural Inquest &amp; Technical Consulting</option>
                  <option value="Enterprise Engagement">Enterprise Engineering &amp; Full-Stack Role</option>
                  <option value="Creative Collaboration">Interactive WebGL &amp; Motion Design Project</option>
                  <option value="General Dispatch">General Greeting &amp; Discussion</option>
                </select>
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-wider text-[#d4af37] mb-1.5 font-semibold">
                  Epistle Content
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    audioEngine.playQuillStroke();
                  }}
                  placeholder="Inscribe your thoughts, project scope, or inquiries here..."
                  className="w-full px-4 py-3 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-[#f5efe6] font-cormorant text-base focus:border-[#d4af37] focus:outline-none placeholder:text-[#c5bcaf]/40 resize-none shadow-inner"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-cormorant italic text-[#c5bcaf]">
                  Transmits directly to {DEVELOPER_PROFILE.email}
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#f3cf58] text-[#0f0d0b] font-cinzel font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all flex items-center gap-2"
                >
                  <Send size={14} />
                  <span>{isSubmitting ? 'AFFIXING WAX SEAL...' : 'SEAL & DISPATCH'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
