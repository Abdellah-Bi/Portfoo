import React, { useState, useEffect } from 'react';
import { X, Mail, MapPin, Clock, Copy, Check, ExternalLink, Send, Github, Linkedin, FileText, Loader2, AlertCircle } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Europe/Budapest',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(timeStr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Abdellah,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent via Abdellah Bichlifen Portfolio`
    );
    return `mailto:${DEVELOPER_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const getGmailWebUrl = () => {
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Hello Abdellah,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent via Abdellah Bichlifen Portfolio`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${DEVELOPER_PROFILE.email}&su=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const formspreeEndpoint = DEVELOPER_PROFILE.formspreeEndpoint || 'https://formspree.io/f/xeajpzvn';

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Transmission from ${formData.name} (Portfolio)`,
        }),
      });

      if (response.ok) {
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'The transmission service returned an error.');
      }
    } catch (err: any) {
      console.error('Contact Form Error:', err);
      setErrorMessage(
        err.message || 'Unable to complete transmission. You can also copy the email directly or use the direct mail button below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSent(false);
    setErrorMessage(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-2xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl my-auto bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-lg sm:text-xl text-white tracking-widest">
              DISPATCH & TRANSMISSION
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-white/60 font-mono hidden sm:inline">
              DIRECT UPLINK
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-white">
          {/* Status & Time HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/15">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-black border border-white/20 text-red-400">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-[10px] font-pixel text-white/50 uppercase block">
                  Location Node
                </span>
                <span className="text-xs font-bold text-white">
                  Budapest, Hungary (EU)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-black border border-white/20 text-emerald-400">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[10px] font-pixel text-white/50 uppercase block">
                  Budapest Time (CET)
                </span>
                <span className="text-xs font-bold font-mono text-white">
                  {currentTime || '10:45:12'} CET
                </span>
              </div>
            </div>
          </div>

          {/* Email Copy Card */}
          <div className="p-4 rounded-xl bg-[#0e0e0e] border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-pixel text-white/50 uppercase block mb-0.5">
                Direct Email Terminal
              </span>
              <span className="text-sm font-mono font-bold text-white select-all">
                {DEVELOPER_PROFILE.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyEmail}
                className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedEmail ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={`mailto:${DEVELOPER_PROFILE.email}`}
                className="px-3.5 py-1.5 rounded-lg bg-white text-black text-xs font-semibold flex items-center gap-1.5 hover:bg-white/90 transition-colors"
              >
                <span>Compose</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Direct Message Form or Success View */}
          {isSent ? (
            <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <div>
                <h4 className="font-pixel text-base text-white mb-1 tracking-wider uppercase">
                  Transmission Delivered!
                </h4>
                <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                  Your message has been received and routed directly to <span className="text-white font-mono">{DEVELOPER_PROFILE.email}</span>. Abdellah will review and reply shortly.
                </p>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-[11px] flex items-center gap-2 text-left">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/90 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <span className="text-xs font-pixel text-white/60 uppercase tracking-widest block">
                Send Direct Message / Schedule a Call
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    name="name"
                    disabled={isSubmitting}
                    placeholder="Your Name / Organization"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/20 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white disabled:opacity-50"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    name="email"
                    disabled={isSubmitting}
                    placeholder="Your Contact Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/20 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <textarea
                  required
                  name="message"
                  disabled={isSubmitting}
                  rows={4}
                  placeholder="Transmission details, project inquiries, contract or full-time opportunities..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black border border-white/20 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-white resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-lg bg-white hover:bg-white/90 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin text-black" />
                    <span>Transmitting Dispatch to Abdellah...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Transmit Dispatch to Abdellah</span>
                  </>
                )}
              </button>

              {/* Alternative quick send option */}
              <div className="flex items-center justify-between text-[11px] text-white/50 pt-1">
                <span>Prefer composing in web browser?</span>
                <a
                  href={getGmailWebUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/80 hover:text-white underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Open in Gmail</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </form>
          )}

          {/* Social & Resume Hub */}
          <div className="flex flex-wrap items-center justify-between pt-2 border-t border-white/10 text-xs text-white/60">
            <div className="flex items-center gap-3">
              <a
                href={DEVELOPER_PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <FileText size={13} />
                <span>Resume (PDF)</span>
              </a>
              <span>•</span>
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Github size={13} />
                <span>GitHub</span>
              </a>
              <span>•</span>
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-white transition-colors"
              >
                <Linkedin size={13} />
                <span>LinkedIn</span>
              </a>
            </div>
            <span className="font-mono text-[11px] text-white/40">Status: Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
