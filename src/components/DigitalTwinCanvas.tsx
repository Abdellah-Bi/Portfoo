import React, { useEffect, useRef, useState } from 'react';

interface DigitalTwinCanvasProps {
  zoom?: number;
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface NodePoint {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  pulsePhase: number;
  size: number;
  color: string;
}

export const DigitalTwinCanvas: React.FC<DigitalTwinCanvasProps> = ({
  zoom = 1,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = normX * 0.45;
      mouseRef.current.targetY = normY * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate 3D Digital Twin Geometry (Multi-tier Gyroscope + Chassis + Neural Tensor Grid)
    const nodes: NodePoint[] = [];
    const numRings = 4;
    const pointsPerRing = 32;

    // Orbital Gyroscopic Rings
    for (let r = 0; r < numRings; r++) {
      const radius = 120 + r * 55;
      for (let i = 0; i < pointsPerRing; i++) {
        const angle = (i / pointsPerRing) * Math.PI * 2;
        let x = 0, y = 0, z = 0;
        if (r === 0) {
          x = Math.cos(angle) * radius;
          y = Math.sin(angle) * radius;
          z = 0;
        } else if (r === 1) {
          x = Math.cos(angle) * radius;
          y = 0;
          z = Math.sin(angle) * radius;
        } else if (r === 2) {
          x = 0;
          y = Math.cos(angle) * radius;
          z = Math.sin(angle) * radius;
        } else {
          const tilt = Math.PI / 4;
          x = Math.cos(angle) * radius;
          y = Math.sin(angle) * radius * Math.cos(tilt);
          z = Math.sin(angle) * radius * Math.sin(tilt);
        }

        nodes.push({
          x, y, z,
          baseX: x, baseY: y, baseZ: z,
          pulsePhase: Math.random() * Math.PI * 2,
          size: r === 0 ? 2.5 : 1.8,
          color: r === 0 ? '#34d399' : r === 1 ? '#60a5fa' : '#f59e0b',
        });
      }
    }

    // Central Core 3D Polyhedral Nodes (Digital Twin Kernel)
    const phi = (1 + Math.sqrt(5)) / 2;
    const coreScale = 75;
    const icosahedronVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 }, { x: 1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 }, { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: -phi }, { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 }, { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }
    ];

    icosahedronVertices.forEach((v) => {
      nodes.push({
        x: v.x * coreScale,
        y: v.y * coreScale,
        z: v.z * coreScale,
        baseX: v.x * coreScale,
        baseY: v.y * coreScale,
        baseZ: v.z * coreScale,
        pulsePhase: Math.random() * Math.PI * 2,
        size: 3.5,
        color: '#ffffff',
      });
    });

    // Particle Cloud Surrounding Digital Twin
    const particles: Point3D[] = [];
    for (let p = 0; p < 80; p++) {
      const radius = 250 + Math.random() * 200;
      const theta = Math.random() * Math.PI * 2;
      const phiAngle = Math.acos(2 * Math.random() - 1);
      particles.push({
        x: radius * Math.sin(phiAngle) * Math.cos(theta),
        y: radius * Math.sin(phiAngle) * Math.sin(theta),
        z: radius * Math.cos(phiAngle),
      });
    }

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const render = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      frameCount++;
      if (currentTime - lastFpsUpdate > 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      // Smooth mouse follow interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      angleY += 0.008 + mouseRef.current.x * 0.02;
      angleX += 0.004 + mouseRef.current.y * 0.02;
      angleZ += 0.002;

      // Dark Canvas Clear
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Subtle Cybernetic Radial Gradient
      const grad = ctx.createRadialGradient(
        width / 2, height / 2, 20,
        width / 2, height / 2, Math.max(width, height) * 0.6
      );
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.45)');
      grad.addColorStop(0.5, 'rgba(5, 5, 5, 0.85)');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 3D Projection Engine
      const cx = width / 2;
      const cy = height / 2;
      const fov = 480 * zoom;

      // Rotate & Project Function
      const project = (p: Point3D): { x: number; y: number; scale: number; depth: number } => {
        // Y-axis rotation
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;

        // X-axis rotation
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        // Z-axis rotation
        const cosZ = Math.cos(angleZ);
        const sinZ = Math.sin(angleZ);
        const x3 = x1 * cosZ - y2 * sinZ;
        const y3 = x1 * sinZ + y2 * cosZ;

        const depth = z2 + 650;
        const scale = fov / Math.max(depth, 100);

        return {
          x: cx + x3 * scale,
          y: cy + y3 * scale,
          scale,
          depth,
        };
      };

      // 1. Draw Background Particles
      particles.forEach((pt) => {
        const prj = project(pt);
        if (prj.scale > 0) {
          const alpha = Math.max(0.1, Math.min(0.4, (800 - prj.depth) / 600));
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(prj.x, prj.y, 1.2 * prj.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 2. Draw Ring Polylines
      for (let r = 0; r < numRings; r++) {
        const ringNodes = nodes.slice(r * pointsPerRing, (r + 1) * pointsPerRing);
        ctx.beginPath();
        ringNodes.forEach((node, i) => {
          const prj = project(node);
          if (i === 0) ctx.moveTo(prj.x, prj.y);
          else ctx.lineTo(prj.x, prj.y);
        });
        ctx.closePath();
        ctx.strokeStyle = r === 0 ? 'rgba(52, 211, 153, 0.35)' : r === 1 ? 'rgba(96, 165, 250, 0.25)' : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // 3. Draw Core Polyhedron Edges
      const coreNodes = nodes.slice(numRings * pointsPerRing);
      for (let i = 0; i < coreNodes.length; i++) {
        const prj1 = project(coreNodes[i]);
        for (let j = i + 1; j < coreNodes.length; j++) {
          const dist = Math.hypot(
            coreNodes[i].baseX - coreNodes[j].baseX,
            coreNodes[i].baseY - coreNodes[j].baseY,
            coreNodes[i].baseZ - coreNodes[j].baseZ
          );
          if (dist < 165) {
            const prj2 = project(coreNodes[j]);
            const edgeAlpha = Math.max(0.15, Math.min(0.8, 1 - (prj1.depth + prj2.depth) / 1600));
            ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha * 0.45})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(prj1.x, prj1.y);
            ctx.lineTo(prj2.x, prj2.y);
            ctx.stroke();
          }
        }
      }

      // 4. Draw Glowing Nodes
      nodes.forEach((node) => {
        const prj = project(node);
        if (prj.scale > 0) {
          const pulse = Math.sin(currentTime * 0.003 + node.pulsePhase) * 0.3 + 0.7;
          const nodeAlpha = Math.max(0.2, Math.min(0.95, (900 - prj.depth) / 600));

          // Outer Glow
          ctx.beginPath();
          ctx.arc(prj.x, prj.y, node.size * prj.scale * 2.2 * pulse, 0, Math.PI * 2);
          ctx.fillStyle = node.color === '#34d399'
            ? `rgba(52, 211, 153, ${nodeAlpha * 0.3})`
            : `rgba(255, 255, 255, ${nodeAlpha * 0.25})`;
          ctx.fill();

          // Core Node Dot
          ctx.beginPath();
          ctx.arc(prj.x, prj.y, node.size * prj.scale, 0, Math.PI * 2);
          ctx.fillStyle = node.color;
          ctx.fill();
        }
      });

      // 5. Digital Twin Telemetry Crosshair Overlays
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);

      // Vertical & Horizontal Grid Alignment
      ctx.beginPath();
      ctx.moveTo(cx, 40);
      ctx.lineTo(cx, height - 40);
      ctx.moveTo(40, cy);
      ctx.lineTo(width - 40, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [zoom]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          filter: 'contrast(105%)',
        }}
      />
      {/* HUD Telemetry Watermark */}
      <div className="absolute bottom-4 left-6 hidden md:flex items-center gap-4 text-[10px] font-mono text-white/30 pointer-events-none select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          TWIN STATE: ACTIVE [60 FPS]
        </span>
        <span>LAT: 47.4979° N // LON: 19.0402° E</span>
        <span>AVR // XGBOOST // FULLSTACK</span>
      </div>
    </div>
  );
};
