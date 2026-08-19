import React, { useState, useEffect, useRef } from 'react';
import { Play, Menu, X, ArrowUpRight, ZoomIn } from 'lucide-react';
import { DEVELOPER_PROFILE } from './data/portfolioData';
import { DigitalTwinCanvas } from './components/DigitalTwinCanvas';
import { SeamlessBackgroundVideo } from './components/SeamlessBackgroundVideo';
import { MasterworksModal } from './components/MasterworksModal';
import { AboutModal } from './components/AboutModal';
import { ExperienceModal } from './components/ExperienceModal';
import { SkillsModal } from './components/SkillsModal';
import { ContactModal } from './components/ContactModal';

const NAV_LINKS = [
  { label: 'ABOUT', id: 'about' },
  { label: 'PROJECTS', id: 'projects' },
  { label: 'EXPERIENCE', id: 'experience' },
  { label: 'SKILLS', id: 'skills' },
  { label: 'VITAE', id: 'vitae' },
  { label: 'CONTACT', id: 'contact' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoZoom, setVideoZoom] = useState(0.72); // Balanced medium scale
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Modals state
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isExperienceOpen, setIsExperienceOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Background Video Autoplay Lifecycle (fixes browser autoplay restrictions & iframe sandbox)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    vid.defaultMuted = true;
    vid.muted = true;
    vid.playsInline = true;

    const playVideo = () => {
      if (!vid) return;
      vid.muted = true;
      const playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay prevented on mount:', err);
        });
      }
    };

    playVideo();

    // Browser policy fallback: start on first user interaction
    const handleFirstInteraction = () => {
      if (vid && vid.paused) {
        vid.muted = true;
        vid.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // Global Escape Key Listener for Accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (menuOpen) setMenuOpen(false);
        if (isProjectsOpen) setIsProjectsOpen(false);
        if (isAboutOpen) setIsAboutOpen(false);
        if (isExperienceOpen) setIsExperienceOpen(false);
        if (isSkillsOpen) setIsSkillsOpen(false);
        if (isContactOpen) setIsContactOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, isProjectsOpen, isAboutOpen, isExperienceOpen, isSkillsOpen, isContactOpen]);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    if (id === 'about') setIsAboutOpen(true);
    else if (id === 'projects') setIsProjectsOpen(true);
    else if (id === 'experience') setIsExperienceOpen(true);
    else if (id === 'skills') setIsSkillsOpen(true);
    else if (id === 'vitae') {
      window.open(DEVELOPER_PROFILE.resumeUrl, '_blank');
    } else if (id === 'contact' || id === 'talk') setIsContactOpen(true);
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white selection:text-black">
      {/* 1. Background Video & 3D Digital Twin Simulation Layer */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
        <SeamlessBackgroundVideo
          src={DEVELOPER_PROFILE.backgroundVideoUrl || '/Vid.mp4'}
          zoom={videoZoom}
          className="absolute inset-0"
        />

        {/* Real-time 3D Digital Twin Overlay */}
        <DigitalTwinCanvas zoom={videoZoom} className="absolute inset-0 opacity-25 mix-blend-screen pointer-events-none" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none z-1" />

      {/* 2. Main High-Fashion Content Canvas */}
      <div className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14">
        {/* Top Navbar */}
        <header className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            {/* Interactive Portrait Avatar with Hover Zoom Preview */}
            <div
              className="relative group cursor-pointer"
              onClick={() => setIsAboutOpen(true)}
              onMouseEnter={() => setIsAvatarHovered(true)}
              onMouseLeave={() => setIsAvatarHovered(false)}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30 bg-[#111] flex items-center justify-center transition-all duration-300 group-hover:scale-125 group-hover:border-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                <img
                  src={DEVELOPER_PROFILE.imageUrl}
                  alt={DEVELOPER_PROFILE.name}
                  className="w-full h-full object-cover object-[50%_20%] scale-110 group-hover:scale-130 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (target.src !== DEVELOPER_PROFILE.fallbackImageUrl) {
                      target.src = DEVELOPER_PROFILE.fallbackImageUrl;
                    }
                  }}
                />
              </div>

              {/* Hover Large Zoom Preview Popover Card */}
              <div
                className={`absolute top-full left-0 mt-3 w-64 sm:w-72 bg-[#0d0d0d] border border-white/30 rounded-xl overflow-hidden shadow-2xl p-3 z-50 pointer-events-none transition-all duration-300 origin-top-left ${
                  isAvatarHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                }`}
              >
                <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-white/20 bg-black mb-2.5">
                  <img
                    src={DEVELOPER_PROFILE.imageUrl}
                    alt={DEVELOPER_PROFILE.name}
                    className="w-full h-full object-cover object-[50%_20%] scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== DEVELOPER_PROFILE.fallbackImageUrl) {
                        target.src = DEVELOPER_PROFILE.fallbackImageUrl;
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-emerald-400">● AVAILABLE</span>
                    <span className="text-white/60">BUDAPEST (CET)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{DEVELOPER_PROFILE.name}</span>
                    <span className="text-[10px] text-white/50 font-mono block">Machine Learning MSc & SE</span>
                  </div>
                  <span className="text-[10px] text-red-400 font-pixel uppercase">Click to open</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-pixel text-xs text-white/60 tracking-wider">
                BUDAPEST // CET
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="hover:opacity-70 transition-opacity cursor-pointer text-white text-sm tracking-wider font-normal"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="md:hidden p-2 hover:opacity-70 transition-opacity text-white cursor-pointer"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Four-Column Meta Grid */}
        <section className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* COL 1: Engineer Name & Monologue */}
          <div>
            <h2
              onClick={() => setIsAboutOpen(true)}
              className="text-lg md:text-xl tracking-wide leading-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="block font-normal">ABDELLAH</span>
              <span className="block font-pixel text-2xl md:text-3xl">BICHLIFEN</span>
            </h2>

            <p className="font-pixel mt-3 text-xs text-white/60 leading-relaxed whitespace-pre-line">
              {`Machine Learning MSc Student &\nSoftware Engineer (Pázmány ITK)\nbased in Budapest, Hungary\n"engineering intelligent systems"`}
            </p>
          </div>

          {/* COL 2: Discipline & Specialty */}
          <div className="text-right lg:text-left">
            <h2
              onClick={() => setIsSkillsOpen(true)}
              className="text-lg md:text-xl tracking-wide leading-tight cursor-pointer hover:opacity-80 transition-opacity"
            >
              <span className="block font-normal">SOFTWARE & ML</span>
              <span className="block font-pixel text-2xl md:text-3xl">ENGINEERING</span>
            </h2>

            <p className="font-pixel mt-3 text-xs text-white/60 leading-relaxed whitespace-pre-line hidden lg:block">
              {`Pázmány Péter Catholic University (ITK)\nDiamond Diagnostics Software Node\nStipendium Hungaricum Scholar`}
            </p>
          </div>

          {/* COL 3: What I Build */}
          <div>
            <div
              onClick={() => setIsProjectsOpen(true)}
              className="font-pixel text-base tracking-widest text-white/50 uppercase mb-3 cursor-pointer hover:text-white transition-colors"
            >
              What I Build
            </div>
            <p className="text-sm text-white/90 leading-relaxed max-w-[240px]">
              Full-stack web platforms, interactive GUIs, database-driven backends, and intelligent systems.
            </p>
          </div>

          {/* COL 4: Core Protocols */}
          <div className="text-right lg:text-left">
            <div
              onClick={() => setIsSkillsOpen(true)}
              className="font-pixel text-base tracking-widest text-white/50 uppercase mb-3 cursor-pointer hover:text-white transition-colors"
            >
              Core Protocols
            </div>
            <ul className="text-sm text-white/90 leading-relaxed space-y-0.5">
              <li>React, Express, MySQL & MongoDB</li>
              <li>Machine Learning & XGBoost</li>
              <li>C/C++ & Microcontroller Firmware</li>
              <li>WebSockets & Real-time Sync</li>
              <li>Interactive GUIs & Control Tooling</li>
              <li>Python & Analytical Pipelines</li>
            </ul>
          </div>
        </section>

        {/* Middle Spacer */}
        <div className="flex-1 min-h-4" />

        {/* Bottom Section */}
        <footer className="pb-4">
          {/* ROW A — Hero Headline & Action Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-end">
            {/* LEFT: Hero Headline with Pixel Treatment */}
            <div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] tracking-wide uppercase font-normal"
                style={{ lineHeight: 0.82 }}
              >
                I BUILD
                <br />
                <span className="font-pixel font-normal text-[1.15em] inline-block leading-none align-baseline">
                  WEB APPLICATIONS
                </span>{' '}
                &
                <br />
                INTELLIGENT
                <br />
                <span className="font-pixel font-normal text-[1.15em] inline-block leading-none align-baseline">
                  SYSTEMS
                </span>
              </h1>
            </div>

            {/* RIGHT: Masterworks Action & Milestone Badges */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-end">
              {/* Masterworks Showcase Button */}
              <button
                type="button"
                onClick={() => setIsProjectsOpen(true)}
                className="self-start flex items-center gap-3 border border-white/30 px-6 py-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <Play size={14} fill="white" className="text-white group-hover:scale-110 transition-transform" />
                <span className="text-sm tracking-wider font-normal">EXPLORE MASTERWORKS</span>
              </button>

              {/* Awards / Badges Row */}
              <div className="self-start lg:self-end flex flex-wrap items-stretch gap-2 sm:gap-3 text-sm text-white/80">
                {/* Badge 1: Talent Day 1st */}
                <div
                  onClick={() => setIsExperienceOpen(true)}
                  className="bg-[#0B0B0B] px-3 sm:px-4 py-2 flex items-center gap-2 border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base tracking-tight">TALENT DAY</span>
                  <span className="text-white/50 text-xs font-mono">1st Place</span>
                </div>

                {/* Badge 2: Diamond Diagnostics Active */}
                <div
                  onClick={() => setIsExperienceOpen(true)}
                  className="bg-[#0B0B0B] px-3 sm:px-4 py-2 flex items-center gap-2 border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base tracking-tight">DIAMOND DIAGNOSTICS</span>
                  <span className="text-emerald-400 text-xs font-mono">Active</span>
                </div>

                {/* Badge 3: Stipendium Hungaricum Scholar */}
                <div
                  onClick={() => setIsExperienceOpen(true)}
                  className="bg-[#0B0B0B] px-3 sm:px-4 py-2 flex items-center gap-2 border border-white/10 hover:border-white/30 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-[10px] sm:text-xs tracking-tight">SH SCHOLAR</span>
                  <span className="text-white/50 text-xs font-mono">Pázmány ITK</span>
                </div>
              </div>
            </div>
          </div>

          {/* ROW B — Footer Status Strip */}
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/10 items-center">
            <div className="text-xs text-white/60">
              Open to connect & research collaborations.{' '}
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-red-500 hover:text-red-400 transition-colors cursor-pointer font-semibold underline underline-offset-2"
              >
                Schedule a call / Contact
              </button>
            </div>

            {/* Video Zoom Fine-Tuning Pill */}
            <div className="flex items-center sm:justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 bg-white/[0.06] hover:bg-white/10 transition-colors px-2.5 py-1 rounded-full border border-white/15 text-[11px] font-mono">
                <span className="text-white/40">3D Frame:</span>
                <button
                  type="button"
                  onClick={() => setVideoZoom((z) => Math.max(0.35, Number((z - 0.05).toFixed(2))))}
                  className="px-1.5 py-0.5 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer font-bold"
                  title="Zoom video out further"
                >
                  -
                </button>
                <span className="text-white font-medium min-w-[32px] text-center">
                  {Math.round(videoZoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setVideoZoom((z) => Math.min(1.1, Number((z + 0.05).toFixed(2))))}
                  className="px-1.5 py-0.5 rounded text-white/70 hover:text-white hover:bg-white/20 transition-colors cursor-pointer font-bold"
                  title="Zoom video in"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-xs text-white/60 sm:text-right lg:text-right font-mono">
              Made by Abdellah Bichlifen • © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {/* 3. Mobile Fullscreen Navigation Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-2xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-pixel text-xs text-white/60">ABDELLAH BICHLIFEN</span>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="p-2 hover:opacity-70 transition-opacity text-white cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center flex-1 gap-7">
          {NAV_LINKS.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                transitionDelay: menuOpen ? `${100 + i * 60}ms` : '0ms',
              }}
              className={`text-2xl tracking-widest text-white hover:text-red-400 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="p-6 text-center text-xs text-white/50 border-t border-white/10 font-mono">
          Budapest, Hungary • Machine Learning & Embedded Systems
        </div>
      </div>

      {/* 4. Interactive Drawers & Overlays */}
      <MasterworksModal
        isOpen={isProjectsOpen}
        onClose={() => setIsProjectsOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenProjects={() => {
          setIsAboutOpen(false);
          setIsProjectsOpen(true);
        }}
        onOpenContact={() => {
          setIsAboutOpen(false);
          setIsContactOpen(true);
        }}
      />

      <ExperienceModal
        isOpen={isExperienceOpen}
        onClose={() => setIsExperienceOpen(false)}
      />

      <SkillsModal
        isOpen={isSkillsOpen}
        onClose={() => setIsSkillsOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}
