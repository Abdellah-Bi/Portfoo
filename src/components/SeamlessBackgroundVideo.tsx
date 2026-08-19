import React, { useEffect, useRef, useState } from 'react';

interface SeamlessBackgroundVideoProps {
  src?: string;
  zoom?: number;
  className?: string;
}

export const SeamlessBackgroundVideo: React.FC<SeamlessBackgroundVideoProps> = ({
  src = '/Vid.mp4',
  zoom = 0.72,
  className = '',
}) => {
  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);
  const [activePlayer, setActivePlayer] = useState<'A' | 'B'>('A');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const vidA = videoRefA.current;
    const vidB = videoRefB.current;
    if (!vidA || !vidB) return;

    vidA.muted = true;
    vidB.muted = true;
    vidA.playsInline = true;
    vidB.playsInline = true;

    // Start Player A
    const playInitial = () => {
      vidA.muted = true;
      vidA.play().then(() => setIsLoaded(true)).catch(() => {});
    };

    playInitial();

    // User gesture fallback for autoplay restriction
    const handleGesture = () => {
      if (vidA.paused && activePlayer === 'A') {
        vidA.muted = true;
        vidA.play().catch(() => {});
      } else if (vidB.paused && activePlayer === 'B') {
        vidB.muted = true;
        vidB.play().catch(() => {});
      }
    };

    window.addEventListener('click', handleGesture, { once: true });
    window.addEventListener('touchstart', handleGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
    };
  }, []);

  // Time-update handler for Player A to initiate Player B crossfade before end
  const handleTimeUpdateA = () => {
    const vidA = videoRefA.current;
    const vidB = videoRefB.current;
    if (!vidA || !vidB || activePlayer !== 'A') return;

    const duration = vidA.duration;
    if (!duration || isNaN(duration)) return;

    // Crossfade threshold (350ms before end)
    if (duration - vidA.currentTime <= 0.35) {
      vidB.currentTime = 0;
      vidB.muted = true;
      vidB.play().then(() => {
        setActivePlayer('B');
      }).catch(() => {});
    }
  };

  // Time-update handler for Player B to initiate Player A crossfade before end
  const handleTimeUpdateB = () => {
    const vidA = videoRefA.current;
    const vidB = videoRefB.current;
    if (!vidA || !vidB || activePlayer !== 'B') return;

    const duration = vidB.duration;
    if (!duration || isNaN(duration)) return;

    // Crossfade threshold (350ms before end)
    if (duration - vidB.currentTime <= 0.35) {
      vidA.currentTime = 0;
      vidA.muted = true;
      vidA.play().then(() => {
        setActivePlayer('A');
      }).catch(() => {});
    }
  };

  const handleEndedA = () => {
    if (activePlayer === 'A') {
      const vidB = videoRefB.current;
      if (vidB) {
        vidB.currentTime = 0;
        vidB.play().catch(() => {});
        setActivePlayer('B');
      }
    }
  };

  const handleEndedB = () => {
    if (activePlayer === 'B') {
      const vidA = videoRefA.current;
      if (vidA) {
        vidA.currentTime = 0;
        vidA.play().catch(() => {});
        setActivePlayer('A');
      }
    }
  };

  return (
    <div className={`relative w-full h-full flex items-center justify-center overflow-hidden pointer-events-none ${className}`}>
      {/* Video Stream A */}
      <video
        ref={videoRefA}
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        controls={false}
        onTimeUpdate={handleTimeUpdateA}
        onEnded={handleEndedA}
        style={{
          transform: `scale(${zoom})`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-in-out',
        }}
        className={`absolute inset-0 h-full w-full object-contain max-h-[92vh] max-w-[95vw] object-center ${
          activePlayer === 'A' ? 'opacity-90 z-2' : 'opacity-0 z-1'
        }`}
      />

      {/* Video Stream B (Seamless Crossfade Buffer) */}
      <video
        ref={videoRefB}
        src={src}
        muted
        playsInline
        preload="auto"
        controls={false}
        onTimeUpdate={handleTimeUpdateB}
        onEnded={handleEndedB}
        style={{
          transform: `scale(${zoom})`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-in-out',
        }}
        className={`absolute inset-0 h-full w-full object-contain max-h-[92vh] max-w-[95vw] object-center ${
          activePlayer === 'B' ? 'opacity-90 z-2' : 'opacity-0 z-1'
        }`}
      />
    </div>
  );
};
