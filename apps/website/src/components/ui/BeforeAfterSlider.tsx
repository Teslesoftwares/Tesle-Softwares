import { useState, useRef, useCallback, useEffect } from 'react';

interface BeforeAfterSliderProps {
  before: { url: string; alt: string };
  after: { url: string; alt: string };
  className?: string;
}

export function BeforeAfterSlider({ before, after, className = '' }: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
    const handleTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
    const handleEnd = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updatePosition]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-xl glass cursor-ew-resize ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{ aspectRatio: '4/3' }}
    >
      {/* After image (full width, clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img loading="lazy" decoding="async"
          src={after.url}
          alt={after.alt}
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Before image (full width) */}
      <img loading="lazy" decoding="async"
        src={before.url}
        alt={before.alt}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
      />

      {/* Labels */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-white/80 pointer-events-none"
        style={{ opacity: position > 15 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        Before
      </div>
      <div
        className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-semibold uppercase tracking-wider text-white/80 pointer-events-none"
        style={{ opacity: position < 85 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        After
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 w-10 h-10 -ml-5 -mt-5 rounded-full bg-white shadow-lg shadow-black/30 flex items-center justify-center pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3L3 8l5 5" />
          <path d="M16 3l5 5-5 5" />
          <path d="M3 8h18" />
          <path d="M3 16h18" />
          <path d="M8 21l-5-5 5-5" />
          <path d="M16 21l5-5-5-5" />
        </svg>
      </div>
    </div>
  );
}
