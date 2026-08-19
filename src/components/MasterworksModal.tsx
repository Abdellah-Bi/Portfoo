import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Code, Activity, Cpu, BrainCircuit, Server, Sparkles, Layers, Sliders, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

interface MasterworksModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string | null;
}

export const MasterworksModal: React.FC<MasterworksModalProps> = ({
  isOpen,
  onClose,
  initialProjectId,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    initialProjectId || PROJECTS[0].id
  );
  const [activeTab, setActiveTab] = useState<'architecture' | 'simulation' | 'metrics'>('architecture');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Hedonic Simulator State
  const [medianIncome, setMedianIncome] = useState<number>(6.5);
  const [housingAge, setHousingAge] = useState<number>(18);
  const [roomsCount, setRoomsCount] = useState<number>(5.2);
  const [proximityOcean, setProximityOcean] = useState<'NEAR BAY' | 'INLAND' | 'NEAR OCEAN'>('NEAR OCEAN');

  // Autonomous Unit Simulator State
  const [radarDistance, setRadarDistance] = useState<number>(35);
  const [isReverseAvoidance, setIsReverseAvoidance] = useState<boolean>(false);

  // NAN Dining Order State
  const [orderQueue, setOrderQueue] = useState<string[]>([
    'Tajine Berber Special #104',
    'Couscous Royale #105',
    'Moroccan Mint Tea #106',
  ]);
  const [newOrderDish, setNewOrderDish] = useState('');

  if (!isOpen) return null;

  const currentProject = PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];
  const galleryIdx = activeGalleryIndex[currentProject.id] || 0;
  const currentImageUrl =
    currentProject.galleryImages && currentProject.galleryImages.length > 0
      ? currentProject.galleryImages[galleryIdx]?.url || currentProject.imageUrl
      : currentProject.imageUrl;

  const calculatePredictedHouseValue = () => {
    let base = medianIncome * 68000;
    if (proximityOcean === 'NEAR OCEAN') base += 140000;
    if (proximityOcean === 'NEAR BAY') base += 110000;
    if (proximityOcean === 'INLAND') base -= 40000;
    base += (roomsCount - 4) * 22000;
    base -= housingAge * 1200;
    return Math.max(120000, Math.round(base));
  };

  const handleSimulateObstacle = (distance: number) => {
    setRadarDistance(distance);
    setIsReverseAvoidance(distance < 20);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-2xl animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-5xl my-auto bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] rounded-xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/15 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-lg sm:text-xl text-white tracking-widest">
              OPUS CATALOG
            </span>
            <span className="text-white/40 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-white/60 font-mono hidden sm:inline">
              {PROJECTS.length} PRODUCTION MASTERWORKS
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

        {/* Project Selector Bar */}
        <div className="flex border-b border-white/15 bg-[#0e0e0e] overflow-x-auto no-scrollbar">
          {PROJECTS.map((proj) => {
            const isSelected = proj.id === currentProject.id;
            return (
              <button
                key={proj.id}
                onClick={() => {
                  setSelectedProjectId(proj.id);
                  setActiveTab('architecture');
                }}
                className={`px-5 py-3.5 text-xs sm:text-sm font-medium tracking-wide flex items-center gap-2.5 whitespace-nowrap transition-all border-b-2 ${
                  isSelected
                    ? 'border-white text-white bg-white/5 font-semibold'
                    : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <span className="font-pixel text-sm sm:text-base text-white/60">
                  {proj.number}
                </span>
                <span>{proj.title.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6 text-white">
          {/* Title & Period Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-sm text-red-400 uppercase tracking-wider">
                  {currentProject.number} • {currentProject.period}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {currentProject.title}
              </h2>
              <p className="text-sm text-white/70 mt-1">
                {currentProject.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {currentProject.demoUrl && (
                <a
                  href={currentProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-white/90 transition-colors"
                >
                  <span>Live Access</span>
                  <ExternalLink size={13} />
                </a>
              )}
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-lg border border-white/30 text-white text-xs flex items-center gap-1.5 hover:bg-white/10 transition-colors"
                >
                  <Code size={13} />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>

          {/* Media & Blueprint Image Display */}
          {currentImageUrl && (
            <div className="space-y-2">
              {/* Multi-view image tabs if multiple exist */}
              {currentProject.galleryImages && currentProject.galleryImages.length > 1 && (
                <div className="flex items-center gap-2 pb-1">
                  <span className="font-pixel text-xs text-white/50 uppercase tracking-wider">
                    Views:
                  </span>
                  {currentProject.galleryImages.map((gImg, gIdx) => (
                    <button
                      key={gImg.url}
                      onClick={() =>
                        setActiveGalleryIndex((prev) => ({
                          ...prev,
                          [currentProject.id]: gIdx,
                        }))
                      }
                      className={`text-xs px-3 py-1 rounded border transition-all ${
                        galleryIdx === gIdx
                          ? 'bg-white text-black border-white font-semibold'
                          : 'bg-black/60 text-white/60 hover:text-white border-white/20'
                      }`}
                    >
                      {gImg.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative rounded-xl overflow-hidden border border-white/20 bg-[#060606] h-72 sm:h-96 md:h-[420px] flex items-center justify-center p-2 sm:p-4 group">
                <img
                  src={currentImageUrl}
                  alt={currentProject.title}
                  className="w-full h-full object-contain object-center transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (currentProject.fallbackImageUrl && target.src !== currentProject.fallbackImageUrl) {
                      target.src = currentProject.fallbackImageUrl;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-40 group-hover:opacity-20 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end text-xs font-pixel text-white/80 pointer-events-none">
                  <span className="bg-black/85 px-2.5 py-1 rounded border border-white/20 shadow-md">
                    {currentProject.galleryImages?.[galleryIdx]?.label || currentProject.number}
                  </span>
                  <span className="text-white/60 font-mono text-[11px] bg-black/80 px-2 py-0.5 rounded border border-white/10 hidden sm:inline">
                    FULL VIEW // 100% UNCLIPPED
                  </span>
                </div>
              </div>

              {currentProject.galleryImages?.[galleryIdx]?.caption && (
                <p className="text-xs text-white/60 italic px-1">
                  * {currentProject.galleryImages[galleryIdx].caption}
                </p>
              )}
            </div>
          )}

          {/* Tab Navigation: Architecture vs Simulator vs Metrics */}
          <div className="flex border-b border-white/15">
            <button
              onClick={() => setActiveTab('architecture')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider flex items-center gap-2 border-b-2 ${
                activeTab === 'architecture'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Layers size={14} />
              <span>ARCHITECTURE & SPEC</span>
            </button>

            <button
              onClick={() => setActiveTab('simulation')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider flex items-center gap-2 border-b-2 ${
                activeTab === 'simulation'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Sliders size={14} />
              <span>LIVE SYSTEM SIMULATOR</span>
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-4 py-2 text-xs font-semibold tracking-wider flex items-center gap-2 border-b-2 ${
                activeTab === 'metrics'
                  ? 'border-white text-white'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              <Activity size={14} />
              <span>BENCHMARK METRICS</span>
            </button>
          </div>

          {/* TAB 1: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div>
                <h4 className="font-pixel text-sm text-white/60 uppercase tracking-widest mb-1.5">
                  Executive Narrative
                </h4>
                <p className="text-sm text-white/90 leading-relaxed">
                  {currentProject.longDescription}
                </p>
              </div>

              {/* Core Features */}
              <div>
                <h4 className="font-pixel text-sm text-white/60 uppercase tracking-widest mb-2.5">
                  Engineered Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentProject.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-lg bg-white/[0.03] border border-white/10 flex items-start gap-2.5"
                    >
                      <span className="text-red-400 text-xs mt-0.5 font-bold">0{fIdx + 1}.</span>
                      <span className="text-xs text-white/80 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Stack Matrix */}
              <div>
                <h4 className="font-pixel text-sm text-white/60 uppercase tracking-widest mb-2.5">
                  Sub-System Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-lg bg-[#0e0e0e] border border-white/15">
                    <span className="text-[10px] font-pixel text-white/50 uppercase block mb-1">
                      Client Interface
                    </span>
                    <p className="text-xs text-white/90">{currentProject.architecture.frontend}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#0e0e0e] border border-white/15">
                    <span className="text-[10px] font-pixel text-white/50 uppercase block mb-1">
                      Service Layer
                    </span>
                    <p className="text-xs text-white/90">{currentProject.architecture.backend}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#0e0e0e] border border-white/15">
                    <span className="text-[10px] font-pixel text-white/50 uppercase block mb-1">
                      Data Store
                    </span>
                    <p className="text-xs text-white/90">{currentProject.architecture.database}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#0e0e0e] border border-white/15">
                    <span className="text-[10px] font-pixel text-white/50 uppercase block mb-1">
                      Infrastructure
                    </span>
                    <p className="text-xs text-white/90">{currentProject.architecture.cloud}</p>
                  </div>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <h4 className="font-pixel text-sm text-white/60 uppercase tracking-widest mb-2">
                  Technical Tags
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-white/10 text-white text-xs border border-white/15 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SIMULATION */}
          {activeTab === 'simulation' && (
            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/20 space-y-5">
              {/* 1. PROJECT NAN SIMULATOR */}
              {currentProject.previewType === 'nan' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-pixel text-sm text-white block">
                        KITCHEN DISPLAY SYSTEM (KDS) & WEBSOCKET DISPATCH
                      </span>
                      <span className="text-xs text-white/60">
                        Bidirectional state sync across customer tables & kitchen line
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded bg-emerald-950/80 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                      WS CONNECTED
                    </span>
                  </div>

                  {/* Add dish form */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter new dish (e.g. Lamb Couscous #108)..."
                      value={newOrderDish}
                      onChange={(e) => setNewOrderDish(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-black border border-white/25 text-white text-xs placeholder:text-white/40 focus:outline-none focus:border-white"
                    />
                    <button
                      onClick={() => {
                        if (!newOrderDish.trim()) return;
                        setOrderQueue((prev) => [...prev, newOrderDish.trim()]);
                        setNewOrderDish('');
                      }}
                      className="px-4 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-white/90 transition-colors"
                    >
                      Dispatch Order
                    </button>
                  </div>

                  {/* Orders Queue */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-pixel text-white/50 uppercase">
                      Live Kitchen Order Queue ({orderQueue.length} Active):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {orderQueue.map((item, qIdx) => (
                        <div
                          key={qIdx}
                          className="p-3 rounded-lg bg-[#111] border border-white/15 flex items-center justify-between"
                        >
                          <span className="text-xs font-mono text-white/90">{item}</span>
                          <button
                            onClick={() =>
                              setOrderQueue((prev) => prev.filter((_, i) => i !== qIdx))
                            }
                            className="text-[11px] text-white/40 hover:text-red-400 transition-colors"
                          >
                            Mark Fulfilled
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. HEDONIC ML SIMULATOR */}
              {currentProject.previewType === 'hedonic' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-pixel text-sm text-white block">
                        CALIFORNIA HEDONIC REGRESSION INFERENCE PIPELINE
                      </span>
                      <span className="text-xs text-white/60">
                        XGBoost gradient boosting estimator on multi-scale spatial covariates
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded bg-white/10 text-white text-xs font-mono border border-white/20">
                      R² = 0.842
                    </span>
                  </div>

                  {/* Sliders Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">Median Income (Tens of k$)</span>
                        <span className="font-mono text-white font-bold">{medianIncome.toFixed(1)}k</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="15"
                        step="0.1"
                        value={medianIncome}
                        onChange={(e) => setMedianIncome(parseFloat(e.target.value))}
                        className="w-full accent-white"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">Housing Age (Years)</span>
                        <span className="font-mono text-white font-bold">{housingAge} yrs</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="52"
                        value={housingAge}
                        onChange={(e) => setHousingAge(parseInt(e.target.value))}
                        className="w-full accent-white"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">Average Rooms / Density</span>
                        <span className="font-mono text-white font-bold">{roomsCount.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="10"
                        step="0.1"
                        value={roomsCount}
                        onChange={(e) => setRoomsCount(parseFloat(e.target.value))}
                        className="w-full accent-white"
                      />
                    </div>

                    <div>
                      <span className="text-xs text-white/70 block mb-1.5">Ocean Proximity Zone</span>
                      <div className="flex gap-2">
                        {(['INLAND', 'NEAR BAY', 'NEAR OCEAN'] as const).map((zone) => (
                          <button
                            key={zone}
                            onClick={() => setProximityOcean(zone)}
                            className={`flex-1 py-1.5 rounded text-[11px] font-mono border transition-all ${
                              proximityOcean === zone
                                ? 'bg-white text-black font-bold border-white'
                                : 'bg-black text-white/60 border-white/20 hover:text-white'
                            }`}
                          >
                            {zone}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Calculated Prediction Output */}
                  <div className="p-4 rounded-lg bg-black border border-white/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-pixel text-white/50 uppercase block">
                        Estimated Median Property Valuation:
                      </span>
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                        ${calculatePredictedHouseValue().toLocaleString()} USD
                      </span>
                    </div>
                    <div className="text-right text-xs text-white/60 font-mono">
                      <span>Top Attribution: Income (52%) + Spatial (31%)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. AUTONOMOUS ROBOT SIMULATOR */}
              {currentProject.previewType === 'autonomous' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-pixel text-sm text-white block">
                        SONAR & DUAL IR SENSOR FUSION RADAR
                      </span>
                      <span className="text-xs text-white/60">
                        HC-SR04 ultrasonic echo processing + Adafruit Motor Shield PWM actuation
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-mono border ${
                        isReverseAvoidance
                          ? 'bg-red-950/80 text-red-400 border-red-500/40 animate-pulse'
                          : 'bg-emerald-950/80 text-emerald-400 border-emerald-500/30'
                      }`}
                    >
                      {isReverseAvoidance ? 'OBSTACLE DETECTED: AVOIDING' : 'PATH CLEAR: CRUISING'}
                    </span>
                  </div>

                  {/* Distance control */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/70">Forward Ultrasonic Sonar Clearance:</span>
                      <span className="font-mono text-white font-bold">{radarDistance} cm</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="120"
                      value={radarDistance}
                      onChange={(e) => handleSimulateObstacle(parseInt(e.target.value))}
                      className="w-full accent-white"
                    />
                    <div className="flex justify-between text-[11px] text-white/40 font-mono">
                      <span>Emergency Zone (&lt; 20cm)</span>
                      <span>Safe Trajectory (&gt; 40cm)</span>
                    </div>
                  </div>

                  {/* Telemetry Output */}
                  <div className="grid grid-cols-3 gap-2.5 text-center font-mono text-xs">
                    <div className="p-3 rounded-lg bg-black border border-white/15">
                      <span className="text-[10px] text-white/50 block">LEFT IR SENSOR</span>
                      <span className="text-emerald-400 font-bold">CLEAR</span>
                    </div>
                    <div className="p-3 rounded-lg bg-black border border-white/15">
                      <span className="text-[10px] text-white/50 block">HC-SR04 ECHO</span>
                      <span className="text-white font-bold">{radarDistance} cm</span>
                    </div>
                    <div className="p-3 rounded-lg bg-black border border-white/15">
                      <span className="text-[10px] text-white/50 block">RIGHT IR SENSOR</span>
                      <span className="text-emerald-400 font-bold">CLEAR</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: METRICS */}
          {activeTab === 'metrics' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {currentProject.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/15 flex flex-col justify-between"
                >
                  <span className="text-[11px] font-pixel text-white/50 uppercase block mb-2">
                    {m.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
