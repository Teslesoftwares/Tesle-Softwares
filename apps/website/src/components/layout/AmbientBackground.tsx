import { useMemo } from 'react';

function FloatingOrb({ index }: { index: number }) {
  const style = useMemo(() => {
    const size = 200 + Math.random() * 400;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = 20 + Math.random() * 20;
    const delay = Math.random() * -20;
    const colors = [
      'rgba(255, 107, 0, 0.06)',
      'rgba(139, 92, 246, 0.05)',
      'rgba(0, 145, 255, 0.04)',
      'rgba(255, 2, 240, 0.03)',
    ];
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
      background: `radial-gradient(circle, ${colors[index % colors.length]} 0%, transparent 70%)`,
      animation: `orb-float-${index % 3} ${dur}s ease-in-out ${delay}s infinite alternate`,
    } as React.CSSProperties;
  }, [index]);

  return <div className="absolute rounded-full" style={style} />;
}

function GridPattern() {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }}
    />
  );
}

function Particle({ index }: { index: number }) {
  const style = useMemo(() => {
    const size = 2 + Math.random() * 3;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = 12 + Math.random() * 18;
    const delay = Math.random() * -15;
    const driftX = (Math.random() - 0.5) * 100;
    const driftY = (Math.random() - 0.5) * 80;
    const isAccent = index % 3 === 0;
    return {
      width: `${size}px`,
      height: `${size}px`,
      left: `${x}%`,
      top: `${y}%`,
      background: isAccent ? 'rgba(255, 107, 0, 0.3)' : 'rgba(139, 92, 246, 0.25)',
      boxShadow: isAccent ? '0 0 8px rgba(255, 107, 0, 0.15)' : 'none',
      animation: `particle-drift ${dur}s ease-in-out ${delay}s infinite alternate`,
      ['--dx' as string]: `${driftX}px`,
      ['--dy' as string]: `${driftY}px`,
    } as React.CSSProperties;
  }, [index]);

  return <div className="absolute rounded-full" style={style} />;
}

function DiagonalLine({ index }: { index: number }) {
  const style = useMemo(() => {
    const pos = 5 + Math.random() * 90;
    const len = 60 + Math.random() * 150;
    const dur = 5 + Math.random() * 5;
    const delay = Math.random() * -8;
    const isHorizontal = index % 2 === 0;
    return {
      [isHorizontal ? 'top' : 'left']: `${pos}%`,
      [isHorizontal ? 'left' : 'top']: '0',
      [isHorizontal ? 'width' : 'height']: `${len}px`,
      [isHorizontal ? 'height' : 'width']: '1px',
      background: `linear-gradient(${isHorizontal ? '90deg' : '180deg'}, transparent, rgba(255, 107, 0, 0.06), transparent)`,
      animation: `line-shimmer ${dur}s ease-in-out ${delay}s infinite alternate`,
    } as React.CSSProperties;
  }, [index]);

  return <div className="absolute" style={style} />;
}

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <GridPattern />

      {Array.from({ length: 5 }, (_, i) => (
        <FloatingOrb key={`orb-${i}`} index={i} />
      ))}

      {Array.from({ length: 8 }, (_, i) => (
        <DiagonalLine key={`line-${i}`} index={i} />
      ))}

      {Array.from({ length: 25 }, (_, i) => (
        <Particle key={`p-${i}`} index={i} />
      ))}

      <style>{`
        @keyframes orb-float-0 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(60px, -40px) scale(1.15); }
        }
        @keyframes orb-float-1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, 30px) scale(1.1); }
        }
        @keyframes orb-float-2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 50px) scale(1.05); }
        }
        @keyframes particle-drift {
          0% { transform: translate(0, 0); opacity: 0.15; }
          100% { transform: translate(var(--dx), var(--dy)); opacity: 0.5; }
        }
        @keyframes line-shimmer {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
