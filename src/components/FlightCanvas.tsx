import React, { useEffect, useRef, useState } from 'react';
import { audioEngine } from '../utils/audioSynth';

interface FlightCanvasProps {
  scrollProgress: number; // 0 to 1
  scrollVelocity: number;
  onPositionUpdate?: (x: number, y: number, rotation: number, chapterIndex: number) => void;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  baseOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

interface FeatherSpark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  rotation: number;
}

export const FlightCanvas: React.FC<FlightCanvasProps> = ({
  scrollProgress,
  scrollVelocity,
  onPositionUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const birdRef = useRef<SVGGElement>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement>(null);
  const sfumatoCanvasRef = useRef<HTMLCanvasElement>(null);

  // Position state
  const [birdState, setBirdState] = useState({
    x: 100,
    y: 150,
    rotation: 25,
    wingAngle: 0,
  });

  const sparksRef = useRef<FeatherSpark[]>([]);
  const lastPosRef = useRef({ x: 100, y: 150, time: Date.now() });

  // 1. Dynamic SVG Path that spans across the viewport with natural organic S-curves
  // We compute normalized path points and scale them to viewport
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1440,
    height: typeof window !== 'undefined' ? window.innerHeight : 900,
  });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute a 5-stage Renaissance S-curve traversing chapters
  const w = dimensions.width;
  const h = dimensions.height;

  // Path coordinates designed to sweep across each chapter station
  // Station 0: Hero (Top Left/Center) -> Station 1: Atelier (Right side) -> Station 2: Workshop (Left side) -> Station 3: Masterworks (Center-Right) -> Station 4: Dispatch (Bottom Center)
  const pathD = `
    M ${w * 0.15} ${h * 0.22}
    C ${w * 0.45} ${h * 0.12}, ${w * 0.75} ${h * 0.20}, ${w * 0.82} ${h * 0.38}
    C ${w * 0.88} ${h * 0.52}, ${w * 0.65} ${h * 0.68}, ${w * 0.40} ${h * 0.58}
    C ${w * 0.18} ${h * 0.50}, ${w * 0.15} ${h * 0.72}, ${w * 0.28} ${h * 0.82}
    C ${w * 0.42} ${h * 0.92}, ${w * 0.70} ${h * 0.80}, ${w * 0.80} ${h * 0.65}
    C ${w * 0.88} ${h * 0.55}, ${w * 0.78} ${h * 0.35}, ${w * 0.55} ${h * 0.48}
    C ${w * 0.35} ${h * 0.60}, ${w * 0.30} ${h * 0.85}, ${w * 0.50} ${h * 0.90}
  `;

  // 2. Continuous Animation Loop for Wings, Sfumato Spotlight, and Spark Trails
  useEffect(() => {
    let animId: number;
    let wingTime = 0;

    const particlesCanvas = particlesCanvasRef.current;
    const sfumatoCanvas = sfumatoCanvasRef.current;
    const pCtx = particlesCanvas?.getContext('2d');
    const sCtx = sfumatoCanvas?.getContext('2d');

    // Create 45 ambient gold dust particles
    const particles: Particle[] = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3 - 0.15,
      opacity: Math.random() * 0.6 + 0.2,
      baseOpacity: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulsePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? '#d4af37' : '#f8e59e',
    }));

    const render = () => {
      // 1. Calculate bird coordinates along SVG path based on scrollProgress
      if (pathRef.current) {
        const totalLength = pathRef.current.getTotalLength();
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        const currentDistance = clampedProgress * totalLength;
        const currentPoint = pathRef.current.getPointAtLength(currentDistance);

        // Look-ahead point for smooth banking rotation
        const delta = Math.min(totalLength - currentDistance, 12);
        const lookAheadPoint = pathRef.current.getPointAtLength(
          Math.min(totalLength, currentDistance + (delta > 0 ? delta : -12))
        );

        let angle = Math.atan2(
          lookAheadPoint.y - currentPoint.y,
          lookAheadPoint.x - currentPoint.x
        ) * (180 / Math.PI);

        if (delta <= 0) angle += 180;

        // Wing flapping speed physics
        const velocityMagnitude = Math.abs(scrollVelocity);
        const flapRate = 0.08 + Math.min(velocityMagnitude * 0.025, 0.4);
        wingTime += flapRate;

        // Sound effect trigger on rapid flight
        if (velocityMagnitude > 8 && Math.random() < 0.1) {
          audioEngine.playWingWhoosh(velocityMagnitude);
        }

        const flapAmplitude = 26 + Math.min(velocityMagnitude * 1.5, 20);
        const wingAngle = Math.sin(wingTime * 4) * flapAmplitude;

        setBirdState({
          x: currentPoint.x,
          y: currentPoint.y,
          rotation: angle,
          wingAngle,
        });

        // Spawn gold feather sparks behind bird
        if (velocityMagnitude > 0.5 || Math.random() < 0.25) {
          const rad = (angle * Math.PI) / 180;
          // Spawn behind bird tail
          const tailX = currentPoint.x - Math.cos(rad) * 28;
          const tailY = currentPoint.y - Math.sin(rad) * 28;

          sparksRef.current.push({
            x: tailX + (Math.random() - 0.5) * 8,
            y: tailY + (Math.random() - 0.5) * 8,
            vx: -Math.cos(rad) * (Math.random() * 2 + 1) + (Math.random() - 0.5) * 1.2,
            vy: -Math.sin(rad) * (Math.random() * 2 + 1) + (Math.random() - 0.5) * 1.2,
            size: Math.random() * 3 + 1.2,
            life: 1.0,
            maxLife: Math.random() * 35 + 25,
            color: Math.random() > 0.4 ? '#d4af37' : '#ffd966',
            rotation: Math.random() * Math.PI * 2,
          });
        }

        // Determine current chapter index
        let chIndex = 0;
        if (clampedProgress < 0.15) chIndex = 0;
        else if (clampedProgress < 0.40) chIndex = 1;
        else if (clampedProgress < 0.65) chIndex = 2;
        else if (clampedProgress < 0.88) chIndex = 3;
        else chIndex = 4;

        onPositionUpdate?.(currentPoint.x, currentPoint.y, angle, chIndex);
      }

      // 2. Draw Sfumato / Chiaroscuro ambient spotlight on bird
      if (sCtx && sfumatoCanvas) {
        sCtx.clearRect(0, 0, sfumatoCanvas.width, sfumatoCanvas.height);

        const currentX = birdState.x || w * 0.5;
        const currentY = birdState.y || h * 0.4;

        // Radial spotlight gradient mimicking candle/alchemy glow
        const glowRadius = Math.min(w, h) * 0.42;
        const grad = sCtx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          glowRadius
        );

        grad.addColorStop(0, 'rgba(212, 175, 55, 0.14)');
        grad.addColorStop(0.3, 'rgba(184, 134, 11, 0.07)');
        grad.addColorStop(0.65, 'rgba(31, 26, 21, 0.03)');
        grad.addColorStop(1, 'rgba(15, 13, 11, 0)');

        sCtx.fillStyle = grad;
        sCtx.fillRect(0, 0, sfumatoCanvas.width, sfumatoCanvas.height);
      }

      // 3. Draw Ambient Dust & Gold Sparks Canvas
      if (pCtx && particlesCanvas) {
        pCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

        // Ambient drifting dust
        particles.forEach((p) => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.pulsePhase += p.pulseSpeed;

          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          const currentOpacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.2;

          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          pCtx.fillStyle = p.color;
          pCtx.globalAlpha = Math.max(0.05, Math.min(0.9, currentOpacity));
          pCtx.shadowBlur = 4;
          pCtx.shadowColor = '#d4af37';
          pCtx.fill();
        });

        // Golden feather sparks
        for (let i = sparksRef.current.length - 1; i >= 0; i--) {
          const spark = sparksRef.current[i];
          spark.x += spark.vx;
          spark.y += spark.vy;
          spark.life -= 1 / spark.maxLife;

          if (spark.life <= 0) {
            sparksRef.current.splice(i, 1);
            continue;
          }

          pCtx.save();
          pCtx.translate(spark.x, spark.y);
          pCtx.rotate(spark.rotation);
          pCtx.beginPath();
          pCtx.ellipse(0, 0, spark.size * 1.5, spark.size * 0.6, 0, 0, Math.PI * 2);
          pCtx.fillStyle = spark.color;
          pCtx.globalAlpha = spark.life * 0.75;
          pCtx.shadowBlur = 8;
          pCtx.shadowColor = '#d4af37';
          pCtx.fill();
          pCtx.restore();
        }
        pCtx.globalAlpha = 1.0;
        pCtx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [scrollProgress, scrollVelocity, w, h, dimensions, onPositionUpdate, birdState.x, birdState.y]);

  return (
    <div
      ref={containerRef}
      id="flight-canvas-container"
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
    >
      {/* Sfumato Chiaroscuro Radial Spotlight Canvas */}
      <canvas
        ref={sfumatoCanvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-90"
      />

      {/* Gold Particles & Embers Canvas */}
      <canvas
        ref={particlesCanvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0 w-full h-full mix-blend-screen opacity-80"
      />

      {/* Fullscreen SVG Flight Track and Da Vinci Ornithopter */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Glowing Gradient for Trajectory Path */}
          <linearGradient id="flightPathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6" />
            <stop offset="35%" stopColor="#f3cf58" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#c29b38" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8b261e" stopOpacity="0.7" />
          </linearGradient>

          {/* Leonardo Da Vinci Brass / Gold Metallic Filter */}
          <filter id="goldenAura" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pattern for Da Vinci Manuscript Grid Lines */}
          <pattern id="manuscriptGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="0.8" fill="rgba(212, 175, 55, 0.15)" />
            <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(212, 175, 55, 0.03)" strokeWidth="1" />
            <line x1="30" y1="0" x2="30" y2="60" stroke="rgba(212, 175, 55, 0.03)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Subtle Background Manuscript Grid Overlay */}
        <rect width="100%" height="100%" fill="url(#manuscriptGrid)" />

        {/* Outer Halo Glow of Flight Path */}
        <path
          d={pathD}
          stroke="#d4af37"
          strokeWidth="6"
          strokeOpacity="0.12"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* The Classical Winding Bézier Flight Path */}
        <path
          ref={pathRef}
          id="flight-path-curve"
          d={pathD}
          stroke="url(#flightPathGrad)"
          strokeWidth="1.8"
          strokeDasharray="6 4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.7}
        />

        {/* Traveled Path Highlight (Glows behind the bird) */}
        <path
          d={pathD}
          stroke="#f8e59e"
          strokeWidth="2.5"
          strokeDasharray={`${scrollProgress * 2800} 3000`}
          strokeLinecap="round"
          opacity={0.85}
          filter="url(#goldenAura)"
        />

        {/* Da Vinci Classical Ornithopter / Golden Mechanical Bird */}
        <g
          ref={birdRef}
          id="davinci-avian-guide"
          transform={`translate(${birdState.x}, ${birdState.y}) rotate(${birdState.rotation})`}
          filter="url(#goldenAura)"
          className="transition-transform duration-75 ease-out"
        >
          {/* Subtle Glow Aura */}
          <circle cx="0" cy="0" r="32" fill="url(#flightPathGrad)" opacity="0.18" />

          {/* Left Wing (Articulated Da Vinci Ribbed Membrane) */}
          <g transform={`rotate(${-birdState.wingAngle}, -6, -2)`}>
            {/* Wooden/Brass Wing Spar */}
            <path
              d="M -6 -2 C -18 -18, -32 -26, -46 -28 C -36 -16, -22 -6, -6 -2"
              fill="rgba(212, 175, 55, 0.28)"
              stroke="#d4af37"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Membrane Feather Ribs */}
            <line x1="-12" y1="-5" x2="-22" y2="-20" stroke="#c29b38" strokeWidth="1" opacity="0.8" />
            <line x1="-20" y1="-8" x2="-34" y2="-24" stroke="#c29b38" strokeWidth="1" opacity="0.8" />
            <line x1="-28" y1="-12" x2="-44" y2="-26" stroke="#c29b38" strokeWidth="1" opacity="0.8" />
            {/* Wingtip feather quill */}
            <path
              d="M -46 -28 Q -52 -30 -56 -36 Q -50 -32 -44 -26"
              fill="#e6ded3"
              stroke="#d4af37"
              strokeWidth="0.8"
            />
          </g>

          {/* Right Wing (Articulated Da Vinci Ribbed Membrane) */}
          <g transform={`rotate(${birdState.wingAngle}, -6, 2)`}>
            {/* Wooden/Brass Wing Spar */}
            <path
              d="M -6 2 C -18 18, -32 26, -46 28 C -36 16, -22 6, -6 2"
              fill="rgba(212, 175, 55, 0.28)"
              stroke="#d4af37"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            {/* Membrane Feather Ribs */}
            <line x1="-12" y1="5" x2="-22" y2="20" stroke="#c29b38" strokeWidth="1" opacity="0.8" />
            <line x1="-20" y1="8" x2="-34" y2="24" stroke="#c29b38" strokeWidth="1" opacity="0.8" />
            <line x1="-28" y1="12" x2="-44" y2="26" stroke="#c29b38" strokeWidth="1" opacity="0.8" />
            {/* Wingtip feather quill */}
            <path
              d="M -46 28 Q -52 30 -56 36 Q -50 32 -44 26"
              fill="#e6ded3"
              stroke="#d4af37"
              strokeWidth="0.8"
            />
          </g>

          {/* Avian Fuselage / Mechanical Ribbed Body */}
          <ellipse
            cx="0"
            cy="0"
            rx="16"
            ry="5.5"
            fill="#171310"
            stroke="#d4af37"
            strokeWidth="1.6"
          />

          {/* Golden Gearwork & Escapement Core */}
          <circle cx="-2" cy="0" r="3.2" fill="#d4af37" />
          <circle cx="-2" cy="0" r="1.5" fill="#171310" />
          <line x1="-5" y1="0" x2="1" y2="0" stroke="#f3cf58" strokeWidth="0.8" />
          <line x1="-2" y1="-3" x2="-2" y2="3" stroke="#f3cf58" strokeWidth="0.8" />

          {/* Avian Beak & Optical Lodestone Pointer */}
          <polygon points="16,0 24,-1.5 28,0 24,1.5" fill="#f3cf58" stroke="#aa821c" strokeWidth="0.8" />
          {/* Glowing Lodestone Eye */}
          <circle cx="12" cy="-1.5" r="1.2" fill="#8b261e" />
          <circle cx="12" cy="-1.5" r="0.6" fill="#ff4d4d" />

          {/* Fan Tail Stabilizer Rudder */}
          <path
            d="M -16 0 L -28 -9 L -32 -6 L -29 0 L -32 6 L -28 9 Z"
            fill="rgba(212, 175, 55, 0.35)"
            stroke="#d4af37"
            strokeWidth="1.2"
          />
          <line x1="-16" y1="0" x2="-29" y2="0" stroke="#f3cf58" strokeWidth="1" />
          <line x1="-16" y1="0" x2="-28" y2="-9" stroke="#aa821c" strokeWidth="0.8" />
          <line x1="-16" y1="0" x2="-28" y2="9" stroke="#aa821c" strokeWidth="0.8" />
        </g>
      </svg>
    </div>
  );
};
