import React, { useState } from 'react';
import { Project } from '../types';
import { X, Sparkles, Server, Database, Cloud, Layout, CheckCircle2, ExternalLink, Play, Activity, Terminal, Shield, ShoppingBag, Send, Compass, BookOpen, Truck, Cpu, Calculator, Utensils, Car, Radio } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';
import { RenaissanceImage } from './RenaissanceImage';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenEpistle: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenEpistle }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'simulation' | 'metrics'>('architecture');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  
  // Project NAN Sandbox
  const [selectedDishes, setSelectedDishes] = useState<Array<{ name: string; price: number }>>([
    { name: 'Royal Lamb Tagine', price: 24 }
  ]);
  const [guestsCount, setGuestsCount] = useState(2);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Hedonic ML Real Estate Sandbox
  const [sqm, setSqm] = useState(75);
  const [district, setDistrict] = useState('District V (Belváros)');
  const [rooms, setRooms] = useState(2);
  const [condition, setCondition] = useState<'Luxury Renovated' | 'Good' | 'Standard'>('Luxury Renovated');

  // Autonomous Unit Sandbox
  const [robotSpeed, setRobotSpeed] = useState(65);
  const [obstacleDistance, setObstacleDistance] = useState(142);
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [lidarActive, setLidarActive] = useState(true);

  if (!project) return null;

  const currentImageUrl = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages[selectedImageIndex]?.url || project.imageUrl
    : project.imageUrl;

  const currentImageLabel = project.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages[selectedImageIndex]?.label
    : `${project.number} Blueprint`;

  const calculatePredictedPrice = () => {
    let basePricePerSqm = 3800; // EUR/sqm Budapest average
    if (district.includes('District V')) basePricePerSqm = 5400;
    if (district.includes('District VI')) basePricePerSqm = 4600;
    if (district.includes('District XIII')) basePricePerSqm = 3900;
    
    const conditionMultiplier = condition === 'Luxury Renovated' ? 1.25 : condition === 'Good' ? 1.05 : 0.9;
    const roomBonus = rooms * 6500;
    const estimatedTotal = Math.round((sqm * basePricePerSqm * conditionMultiplier) + roomBonus);
    return estimatedTotal.toLocaleString();
  };

  const calculateNANTotal = () => {
    return selectedDishes.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <div
      id="project-codex-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-2xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-[#171310] border border-[#d4af37]/60 shadow-[0_0_60px_rgba(212,175,55,0.25)] overflow-hidden gold-border-corner animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4af37]/30 bg-[#0f0d0b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1f1a15] border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] font-cinzel font-bold text-xs">
              {project.number.replace('OPUS ', '')}
            </div>
            <div>
              <span className="text-[10px] font-cinzel tracking-widest text-[#d4af37] uppercase font-bold block">
                ENGINEERING CODEX // {project.period}
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#f5efe6]">
                {project.title}
              </h3>
            </div>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={() => {
              audioEngine.playChime(440);
              onClose();
            }}
            className="p-2 rounded-xl bg-[#1f1a15] hover:bg-[#8b261e] border border-[#d4af37]/30 hover:border-[#8b261e] text-[#e6ded3] hover:text-white transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 pb-2 border-b border-[#d4af37]/15 bg-[#171310]">
          <button
            onClick={() => {
              audioEngine.playQuillStroke();
              setActiveTab('architecture');
            }}
            className={`px-4 py-1.5 rounded-lg font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === 'architecture'
                ? 'bg-[#d4af37] text-[#0f0d0b]'
                : 'text-[#c5bcaf] hover:text-[#f5efe6] hover:bg-[#1f1a15]'
            }`}
          >
            Architecture & Specs
          </button>

          <button
            onClick={() => {
              audioEngine.playQuillStroke();
              setActiveTab('simulation');
            }}
            className={`px-4 py-1.5 rounded-lg font-cinzel text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'simulation'
                ? 'bg-[#d4af37] text-[#0f0d0b]'
                : 'text-[#c5bcaf] hover:text-[#f5efe6] hover:bg-[#1f1a15]'
            }`}
          >
            <Play size={11} />
            Live Interactive Simulator
          </button>

          <button
            onClick={() => {
              audioEngine.playQuillStroke();
              setActiveTab('metrics');
            }}
            className={`px-4 py-1.5 rounded-lg font-cinzel text-xs font-bold tracking-wider transition-all ${
              activeTab === 'metrics'
                ? 'bg-[#d4af37] text-[#0f0d0b]'
                : 'text-[#c5bcaf] hover:text-[#f5efe6] hover:bg-[#1f1a15]'
            }`}
          >
            Telemetry & Metrics
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)] space-y-6">
          {/* TAB 1: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              {/* Featured Opus Image Fresco & Gallery Selector */}
              {currentImageUrl && (
                <div className="space-y-3">
                  {project.galleryImages && project.galleryImages.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2 pb-1">
                      <span className="text-[11px] font-cinzel text-[#d4af37] uppercase font-bold tracking-wider mr-1">
                        View Blueprint:
                      </span>
                      {project.galleryImages.map((img, gIdx) => (
                        <button
                          key={img.url}
                          onClick={() => {
                            audioEngine.playQuillStroke();
                            setSelectedImageIndex(gIdx);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all border flex items-center gap-1.5 ${
                            selectedImageIndex === gIdx
                              ? 'bg-[#d4af37] text-[#0f0d0b] border-[#d4af37] font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                              : 'bg-[#0f0d0b] text-[#c5bcaf] hover:text-[#f5efe6] border-[#d4af37]/30 hover:border-[#d4af37]/60'
                          }`}
                        >
                          <span>{img.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <RenaissanceImage
                    key={currentImageUrl}
                    src={currentImageUrl}
                    fallbackSrc={project.fallbackImageUrl}
                    alt={`${project.title} - ${currentImageLabel}`}
                    aspectRatio="21:9"
                    badge={`${project.number} // ${currentImageLabel}`}
                    showExpand={false}
                  />

                  {project.galleryImages && project.galleryImages[selectedImageIndex]?.caption && (
                    <p className="text-xs font-cormorant italic text-[#c5bcaf] px-1">
                      * {project.galleryImages[selectedImageIndex].caption}
                    </p>
                  )}
                </div>
              )}

              {/* Deep Narrative Description */}
              <div>
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">
                  Architectural Intent & Engineering Scope
                </span>
                <p className="font-cormorant text-lg text-[#f5efe6] leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* 4-Corner Architecture Matrix */}
              <div>
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-3">
                  Systems Topology & Protocol Breakdown
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 flex items-start gap-3">
                    <Layout size={18} className="text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-cinzel uppercase text-[#d4af37] font-bold block">
                        Frontend / Interface
                      </span>
                      <span className="text-xs font-code text-[#e6ded3]">
                        {project.architecture.frontend}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 flex items-start gap-3">
                    <Server size={18} className="text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-cinzel uppercase text-[#d4af37] font-bold block">
                        Compute & Algorithms
                      </span>
                      <span className="text-xs font-code text-[#e6ded3]">
                        {project.architecture.backend}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 flex items-start gap-3">
                    <Database size={18} className="text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-cinzel uppercase text-[#d4af37] font-bold block">
                        Data Persistence / Hardware Memory
                      </span>
                      <span className="text-xs font-code text-[#e6ded3]">
                        {project.architecture.database}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 flex items-start gap-3">
                    <Cloud size={18} className="text-[#d4af37] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-cinzel uppercase text-[#d4af37] font-bold block">
                        Deployment / Real-Time Target
                      </span>
                      <span className="text-xs font-code text-[#e6ded3]">
                        {project.architecture.cloud}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Engineering Features */}
              <div>
                <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block mb-2">
                  Implemented Technical Capabilities
                </span>
                <div className="space-y-2">
                  {project.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-sm font-cormorant text-[#c5bcaf]">
                      <CheckCircle2 size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE SIMULATION SANDBOX */}
          {activeTab === 'simulation' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#0f0d0b] border border-[#d4af37]/30">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#d4af37]/20">
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#d4af37]">
                    <Terminal size={14} />
                    <span>INTERACTIVE RUNTIME SIMULATOR // {project.title.toUpperCase()}</span>
                  </div>
                  <span className="text-[10px] font-code text-[#f3cf58] animate-pulse">● MODEL/ENGINE ONLINE</span>
                </div>

                {/* 1. PROJECT NAN SIMULATOR */}
                {project.previewType === 'nan' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#171310] border border-[#d4af37]/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-cinzel text-[#f3cf58]">
                          <Utensils size={15} />
                          <span>North African Artisan Menu &amp; Real-Time Ordering Engine</span>
                        </div>
                        <span className="text-[10px] font-code text-[#86efac]">POSTGRESQL SYNCED</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { name: 'Royal Lamb Tagine', desc: 'Slow cooked with prunes, almonds, saffron', price: 24 },
                          { name: 'Seven Vegetable Couscous', desc: 'Hand-steamed semolina & bouillon', price: 19 },
                          { name: 'Mint Tea & Pastilla', desc: 'Crisp layers with almond pastry & orange blossom', price: 12 },
                        ].map((dish) => {
                          const isSelected = selectedDishes.some(d => d.name === dish.name);
                          return (
                            <button
                              key={dish.name}
                              onClick={() => {
                                audioEngine.playQuillStroke();
                                if (isSelected) {
                                  setSelectedDishes(selectedDishes.filter(d => d.name !== dish.name));
                                } else {
                                  setSelectedDishes([...selectedDishes, { name: dish.name, price: dish.price }]);
                                }
                              }}
                              className={`p-3.5 rounded-xl border text-left transition-all ${
                                isSelected ? 'bg-[#d4af37]/15 border-[#f3cf58]' : 'bg-[#0f0d0b] border-[#d4af37]/20 hover:border-[#d4af37]/40'
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <span className="font-cinzel text-xs font-bold text-[#f5efe6]">{dish.name}</span>
                                <span className="font-code text-xs text-[#f3cf58] font-bold">€{dish.price}</span>
                              </div>
                              <p className="text-[11px] font-cormorant text-[#c5bcaf] mt-1">{dish.desc}</p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Order calculation & reservation widget */}
                      <div className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-cinzel text-[#c5bcaf]">Table Seats:</span>
                          {[1, 2, 4, 6].map((num) => (
                            <button
                              key={num}
                              onClick={() => {
                                audioEngine.playQuillStroke();
                                setGuestsCount(num);
                              }}
                              className={`w-7 h-7 rounded-lg text-xs font-code font-bold ${
                                guestsCount === num ? 'bg-[#d4af37] text-[#0f0d0b]' : 'bg-[#1f1a15] text-[#c5bcaf] border border-[#d4af37]/20'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <span className="text-[10px] font-cinzel text-[#c5bcaf] block">Subtotal</span>
                            <span className="font-cinzel text-lg font-bold text-[#f3cf58]">€{calculateNANTotal()} EUR</span>
                          </div>
                          <button
                            onClick={() => {
                              audioEngine.playWaxSealThud();
                              setOrderConfirmed(true);
                              setTimeout(() => setOrderConfirmed(false), 3000);
                            }}
                            className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#f3cf58] text-[#0f0d0b] font-cinzel text-xs font-bold transition-all shadow-md"
                          >
                            {orderConfirmed ? '✓ Table & Order Reserved' : 'Simulate Order Pipeline'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. HEDONIC PRICING ML SIMULATOR */}
                {project.previewType === 'hedonic' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#171310] border border-[#d4af37]/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-cinzel text-[#f3cf58]">
                          <Calculator size={15} />
                          <span>Budapest Real Estate Price Inference Engine (XGBoost Regressor)</span>
                        </div>
                        <span className="text-[10px] font-code text-[#86efac]">R² = 0.892 (HIGH FIDELITY)</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* District Selector */}
                        <div>
                          <label className="text-[11px] font-cinzel text-[#c5bcaf] block mb-1">Budapest District Zone:</label>
                          <select
                            value={district}
                            onChange={(e) => {
                              audioEngine.playQuillStroke();
                              setDistrict(e.target.value);
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-xs font-cinzel text-[#f5efe6] focus:border-[#d4af37] outline-none"
                          >
                            <option value="District V (Belváros)">District V (Belváros - Prime Historic)</option>
                            <option value="District VI (Terézváros)">District VI (Terézváros - Cultural Corridor)</option>
                            <option value="District XIII (Angyalföld)">District XIII (Angyalföld - Modern Danube)</option>
                          </select>
                        </div>

                        {/* Condition */}
                        <div>
                          <label className="text-[11px] font-cinzel text-[#c5bcaf] block mb-1">Property Condition:</label>
                          <select
                            value={condition}
                            onChange={(e) => {
                              audioEngine.playQuillStroke();
                              setCondition(e.target.value as any);
                            }}
                            className="w-full px-3 py-2 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/30 text-xs font-cinzel text-[#f5efe6] focus:border-[#d4af37] outline-none"
                          >
                            <option value="Luxury Renovated">Luxury Renovated (Premium Finish)</option>
                            <option value="Good">Good Condition (Turnkey)</option>
                            <option value="Standard">Standard / Classic Architecture</option>
                          </select>
                        </div>

                        {/* Living Area Slider */}
                        <div>
                          <div className="flex justify-between text-[11px] font-cinzel text-[#c5bcaf] mb-1">
                            <span>Living Area:</span>
                            <span className="font-code text-[#f3cf58] font-bold">{sqm} m²</span>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="250"
                            step="5"
                            value={sqm}
                            onChange={(e) => setSqm(Number(e.target.value))}
                            className="w-full accent-[#d4af37]"
                          />
                        </div>

                        {/* Rooms Count */}
                        <div>
                          <div className="flex justify-between text-[11px] font-cinzel text-[#c5bcaf] mb-1">
                            <span>Bedroom Count:</span>
                            <span className="font-code text-[#f3cf58] font-bold">{rooms} Rooms</span>
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="6"
                            value={rooms}
                            onChange={(e) => setRooms(Number(e.target.value))}
                            className="w-full accent-[#d4af37]"
                          />
                        </div>
                      </div>

                      {/* Prediction Result Display */}
                      <div className="p-4 rounded-xl bg-[#0f0d0b] border border-[#f3cf58]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#d4af37] block">Estimated Valuation Output</span>
                          <span className="font-cinzel text-2xl font-black text-[#f3cf58]">€{calculatePredictedPrice()} EUR</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-code text-[#c5bcaf] block">Confidence: 94.8%</span>
                          <span className="text-[10px] font-code text-[#86efac]">SHAP Feature Weight: Area (0.42), District (0.35)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. AUTONOMOUS ROBOTICS SIMULATOR */}
                {project.previewType === 'autonomous' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-[#171310] border border-[#d4af37]/30 space-y-4">
                      <div className="flex items-center justify-between text-xs font-cinzel text-[#f3cf58]">
                        <span className="flex items-center gap-1.5"><Cpu size={15} /> STM32 / Arduino Microcontroller Firmware Radar</span>
                        <span className="text-[10px] font-code text-[#86efac]">LOOP FREQ: 500 Hz (RTOS)</span>
                      </div>

                      {/* Visual Sensor Canvas representation */}
                      <div className="relative h-44 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
                        
                        {/* Radar sweep lines */}
                        <div className="absolute w-36 h-36 rounded-full border border-[#d4af37]/30 flex items-center justify-center animate-spin duration-[4000ms]">
                          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent to-[#f3cf58] self-start origin-left" />
                        </div>

                        {/* Center Robot Unit */}
                        <div className="relative flex flex-col items-center z-10">
                          <div className="w-10 h-14 rounded-lg bg-[#1f1a15] border border-[#d4af37] flex flex-col items-center justify-center shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-[#f3cf58] animate-ping mb-1" />
                            <span className="text-[8px] font-code text-[#f5efe6]">BOT</span>
                          </div>
                          <span className="text-[10px] font-code text-[#d4af37] mt-1">Lidar: {obstacleDistance} cm</span>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-[11px] font-cinzel text-[#c5bcaf] mb-1">
                            <span>Obstacle Distance Simulation:</span>
                            <span className="font-code text-[#f3cf58]">{obstacleDistance} cm</span>
                          </div>
                          <input
                            type="range"
                            min="15"
                            max="300"
                            value={obstacleDistance}
                            onChange={(e) => setObstacleDistance(Number(e.target.value))}
                            className="w-full accent-[#d4af37]"
                          />
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg bg-[#0f0d0b] border border-[#d4af37]/20">
                          <span className="text-xs font-cinzel text-[#f5efe6]">
                            PID Status: <strong className={obstacleDistance < 30 ? 'text-red-400' : 'text-emerald-400'}>{obstacleDistance < 30 ? 'EMERGENCY BRAKE' : 'CLEAR TRAJECTORY'}</strong>
                          </span>
                          <button
                            onClick={() => {
                              audioEngine.playChime(600);
                              setObstacleDistance(160);
                            }}
                            className="px-3 py-1 rounded bg-[#d4af37] text-[#0f0d0b] font-cinzel text-[10px] font-bold"
                          >
                            Reset PID
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. CIRCUIT & TELEMETRY FALLBACK */}
                {project.previewType === 'circuit' && (
                  <div className="p-4 rounded-xl bg-[#171310] border border-[#d4af37]/30 space-y-3">
                    <div className="flex justify-between text-xs font-code text-[#d4af37]">
                      <span>SYSTEM TELEMETRY CONSOLE</span>
                      <span>STATUS: RUNNING AT FULL INTEGRITY</span>
                    </div>
                    <div className="h-36 rounded-lg bg-[#0f0d0b] border border-[#d4af37]/20 flex flex-col items-center justify-center p-4">
                      <Radio size={24} className="text-[#f3cf58] animate-pulse mb-2" />
                      <span className="font-cinzel text-sm text-[#f5efe6] font-bold">{project.title}</span>
                      <span className="text-xs font-cormorant text-[#c5bcaf] text-center mt-1">
                        High throughput real-time benchmarked node in production operations.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <span className="text-xs font-cinzel uppercase tracking-wider text-[#d4af37] font-semibold block">
                Production Performance Telemetry & Benchmark Logs
              </span>
              <div className="grid grid-cols-2 gap-4">
                {project.metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#0f0d0b] border border-[#d4af37]/20">
                    <span className="text-xs font-cormorant italic text-[#c5bcaf] block">
                      {m.label}
                    </span>
                    <span className="font-cinzel text-2xl font-bold text-[#f3cf58] mt-1 block">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#d4af37]/30 bg-[#0f0d0b]">
          <div className="flex items-center gap-2 text-xs font-cormorant italic text-[#c5bcaf]">
            <Shield size={14} className="text-[#d4af37]" />
            <span>Authored by Abdellah Bichlifen • Budapest Node</span>
          </div>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#1f1a15] hover:bg-[#2a241e] border border-[#d4af37]/40 text-[#f5efe6] font-cinzel text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>Live Project Uplink</span>
                <ExternalLink size={13} className="text-[#d4af37]" />
              </a>
            )}
            <button
              onClick={() => {
                onClose();
                onOpenEpistle();
              }}
              className="px-4 py-2 rounded-xl bg-[#d4af37] hover:bg-[#f3cf58] text-[#0f0d0b] font-cinzel text-xs font-bold tracking-wider transition-all"
            >
              Inquire on this Opus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
