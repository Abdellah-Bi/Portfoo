import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { Sparkles, Eye, Code, ExternalLink, ArrowUpRight, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';
import { RenaissanceImage } from './RenaissanceImage';

interface MasterworksChapterProps {
  onInspectProject: (project: Project) => void;
}

export const MasterworksChapter: React.FC<MasterworksChapterProps> = ({ onInspectProject }) => {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  return (
    <section
      id="chapter-masterworks"
      className="relative min-h-screen flex flex-col justify-center px-4 md:px-8 lg:px-12 py-20 z-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Chapter Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-cinzel tracking-widest text-[#d4af37] uppercase font-bold px-2.5 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
              CHAPTER III
            </span>
            <span className="text-xs font-cormorant italic text-[#c5bcaf]">
              Opus Magnum • Selected Production Masterworks & Architectural Schematics
            </span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5efe6] tracking-tight">
            THE MASTERWORKS
          </h2>

          <div className="h-[1.5px] w-24 bg-gradient-to-r from-[#d4af37] via-[#f3cf58] to-transparent mt-3" />
        </div>

        {/* Masterworks Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PROJECTS.map((project) => {
            const currentImgIndex = activeImageIndexes[project.id] || 0;
            const currentImgUrl = project.galleryImages && project.galleryImages.length > 0
              ? project.galleryImages[currentImgIndex]?.url || project.imageUrl
              : project.imageUrl;
            const currentBadge = project.galleryImages && project.galleryImages.length > 1
              ? `${project.number} • ${project.galleryImages[currentImgIndex]?.label}`
              : project.number;

            return (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                onMouseEnter={() => {
                  setHoveredProjectId(project.id);
                  audioEngine.playQuillStroke();
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#171310]/90 hover:bg-[#171310] backdrop-blur-md border border-[#d4af37]/30 hover:border-[#d4af37] transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transform hover:-translate-y-1 gold-border-corner"
              >
                {/* Top Number & Tag Line */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#d4af37]/20">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-xs font-bold text-[#d4af37] tracking-widest uppercase">
                        {project.number}
                      </span>
                      <span className="text-[10px] font-code text-[#c5bcaf]">
                        // {project.period}
                      </span>
                    </div>
                    <span className="text-[11px] font-cormorant italic text-[#f8e59e]">
                      {project.role}
                    </span>
                  </div>

                  {/* Animated Renaissance Opus Visual Showcase */}
                  {currentImgUrl && (
                    <div className="mb-4">
                      <RenaissanceImage
                        src={currentImgUrl}
                        fallbackSrc={project.fallbackImageUrl}
                        alt={project.title}
                        aspectRatio="16:9"
                        badge={currentBadge}
                        onExpand={() => onInspectProject(project)}
                      />

                      {/* Multi-view thumbnail selector if project has multiple gallery views */}
                      {project.galleryImages && project.galleryImages.length > 1 && (
                        <div className="flex items-center gap-2 mt-2">
                          {project.galleryImages.map((gImg, gIdx) => (
                            <button
                              key={gImg.url}
                              onClick={(e) => {
                                e.stopPropagation();
                                audioEngine.playQuillStroke();
                                setActiveImageIndexes(prev => ({ ...prev, [project.id]: gIdx }));
                              }}
                              className={`text-[10px] font-cinzel px-2 py-0.5 rounded border transition-all ${
                                currentImgIndex === gIdx
                                  ? 'bg-[#d4af37] text-[#0f0d0b] border-[#d4af37] font-bold'
                                  : 'bg-[#0f0d0b] text-[#c5bcaf] hover:text-[#f5efe6] border-[#d4af37]/30'
                              }`}
                            >
                              {gImg.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Project Title & Subtitle */}
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f5efe6] group-hover:text-[#f3cf58] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-cinzel tracking-wider text-[#d4af37] mb-3 uppercase">
                    {project.subtitle}
                  </p>

                  {/* Project Summary Description */}
                  <p className="font-cormorant text-base text-[#c5bcaf] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Metrics Highlight Grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-[#0f0d0b]/80 border border-[#d4af37]/15">
                    {project.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx}>
                        <span className="text-[10px] font-cormorant italic text-[#c5bcaf] block">
                          {m.label}
                        </span>
                        <span className="font-cinzel text-base font-bold text-[#d4af37]">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-code text-[#e6ded3] px-2 py-0.5 rounded bg-[#1f1a15] border border-[#d4af37]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Inspect Codex Action Button */}
                <div className="pt-4 border-t border-[#d4af37]/20 flex items-center justify-between">
                  <button
                    id={`inspect-codex-btn-${project.id}`}
                    onClick={() => {
                      audioEngine.playWaxSealThud();
                      onInspectProject(project);
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1f1a15] hover:bg-[#d4af37] text-[#d4af37] hover:text-[#0f0d0b] border border-[#d4af37]/40 hover:border-[#d4af37] font-cinzel font-bold text-xs tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md group/btn"
                  >
                    <Eye size={14} className="text-[#d4af37] group-hover/btn:text-[#0f0d0b] transition-colors" />
                    <span>INSPECT CODEX & ARCHITECTURE</span>
                    <ArrowUpRight size={14} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
