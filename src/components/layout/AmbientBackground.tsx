import { useMemo } from 'react';

function Dot({ index }: { index: number }) {
  const style = useMemo(() => {
    const size = 1 + Math.random() * 2;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = 10 + Math.random() * 15;
    const delay = Math.random() * -25;
    const driftX = (Math.random() - 0.5) * 80;
    const driftY = (Math.random() - 0.5) * 60;
    return {
      '--x': `${x}%`,
      '--y': `${y}%`,
      '--dx': `${driftX}px`,
      '--dy': `${driftY}px`,
      '--s': `${size}px`,
      '--dur': `${dur}s`,
      '--delay': `${delay}s`,
    } as React.CSSProperties;
  }, [index]);

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: 'var(--s)',
        height: 'var(--s)',
        left: 'var(--x)',
        top: 'var(--y)',
        background: index % 3 === 0 ? 'rgba(139, 92, 246, 0.25)' : 'rgba(0, 229, 255, 0.2)',
        boxShadow: index % 2 === 0 ? '0 0 6px rgba(0, 229, 255, 0.15)' : 'none',
        animation: 'ambient-drift var(--dur) ease-in-out var(--delay) infinite alternate',
        transform: 'translate(var(--dx), var(--dy))',
      }}
    />
  );
}

function TechLine({ index }: { index: number }) {
  const isHorizontal = index % 2 === 0;
  const style = useMemo(() => {
    const pos = 5 + Math.random() * 90;
    const len = 40 + Math.random() * 200;
    const dur = 4 + Math.random() * 4;
    const delay = Math.random() * -6;
    return {
      '--pos': `${pos}%`,
      '--len': `${len}px`,
      '--dur': `${dur}s`,
      '--delay': `${delay}s`,
    } as React.CSSProperties;
  }, [index]);

  return (
    <div
      className="absolute"
      style={{
        [isHorizontal ? 'top' : 'left']: 'var(--pos)',
        [isHorizontal ? 'left' : 'top']: `${isHorizontal ? -80 : 50 - (index % 3) * 25}px`,
        [isHorizontal ? 'width' : 'height']: 'var(--len)',
        [isHorizontal ? 'height' : 'width']: '1px',
        background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, rgba(0, 229, 255, 0.04), transparent)`,
        animation: `tech-flicker var(--dur) ease-in-out var(--delay) infinite alternate`,
      }}
    />
  );
}

function Diamond({ index }: { index: number }) {
  const style = useMemo(() => {
    const x = 10 + Math.random() * 80;
    const y = 10 + Math.random() * 80;
    const size = 20 + Math.random() * 40;
    const dur = 15 + Math.random() * 10;
    const delay = Math.random() * -15;
    return {
      '--x': `${x}%`,
      '--y': `${y}%`,
      '--sz': `${size}px`,
      '--dur': `${dur}s`,
      '--delay': `${delay}s`,
    } as React.CSSProperties;
  }, [index]);

  return (
    <div
      className="absolute"
      style={{
        left: 'var(--x)',
        top: 'var(--y)',
        width: 'var(--sz)',
        height: 'var(--sz)',
        border: '0.5px solid rgba(0, 229, 255, 0.04)',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        animation: `diamond-drift var(--dur) ease-in-out var(--delay) infinite alternate`,
      }}
    />
  );
}

function LightBeam() {
  return (
    <div
      className="absolute"
      style={{
        top: '15%',
        left: '50%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.02) 0%, transparent 60%)',
        transform: 'translateX(-50%)',
        animation: 'beam-pulse 6s ease-in-out infinite',
      }}
    />
  );
}

function LightBeam2() {
  return (
    <div
      className="absolute"
      style={{
        bottom: '25%',
        right: '10%',
        width: '300px',
        height: '150px',
        background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.015) 0%, transparent 60%)',
        transform: 'rotate(-20deg)',
        animation: 'beam-pulse 8s ease-in-out infinite alternate',
      }}
    />
  );
}

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 229, 255, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #00e5ff 0%, transparent 60%)',
          opacity: 0.02,
          animation: 'ambient-orb 25s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 60%)',
          opacity: 0.015,
          animation: 'ambient-orb 30s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Tech lines */}
      {Array.from({ length: 6 }, (_, i) => (
        <TechLine key={`tl-${i}`} index={i} />
      ))}

      {/* Diamonds */}
      {Array.from({ length: 4 }, (_, i) => (
        <Diamond key={`d-${i}`} index={i} />
      ))}

      {/* Light beams */}
      <LightBeam />
      <LightBeam2 />

      {/* Particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <Dot key={`dot-${i}`} index={i} />
      ))}

      <style>{`
        @keyframes ambient-drift {
          0% { transform: translate(0px, 0px); opacity: 0.1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0.35; }
        }
        @keyframes ambient-orb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(80px, -50px) scale(1.2); }
        }
        @keyframes tech-flicker {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes diamond-drift {
          0% { transform: translate(-50%, -50%) rotate(45deg) scale(1); opacity: 0.2; }
          100% { transform: translate(-50%, -50%) rotate(65deg) scale(1.2); opacity: 0.4; }
        }
        @keyframes beam-pulse {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(1); }
          50% { opacity: 0.7; transform: translateX(-50%) scaleX(1.3); }
        }
      `}</style>
    </div>
  );
}
