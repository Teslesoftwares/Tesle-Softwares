import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, Zap, Globe, Shield, Cpu, Orbit } from 'lucide-react';

interface Slide {
  id: number;
  icon: typeof Sparkles;
  title: string;
  gradient: string;
  color: string;
}

const slides: Slide[] = [
  { id: 1, icon: Sparkles, title: 'Neural Intelligence', gradient: 'from-accent via-accent/50 to-purple', color: '#00E5FF' },
  { id: 2, icon: Orbit, title: 'Spatial Computing', gradient: 'from-purple via-purple/50 to-accent', color: '#8B5CF6' },
  { id: 3, icon: Zap, title: 'Real-Time Sync', gradient: 'from-accent via-cyan-400 to-accent/30', color: '#00E5FF' },
  { id: 4, icon: Globe, title: 'Global Network', gradient: 'from-purple/80 via-accent/40 to-purple', color: '#8B5CF6' },
  { id: 5, icon: Cpu, title: 'Quantum Core', gradient: 'from-accent/80 via-purple/60 to-accent/20', color: '#00E5FF' },
  { id: 6, icon: Shield, title: 'Zero-Trust Security', gradient: 'from-purple via-accent/30 to-purple/80', color: '#8B5CF6' },
];

const slideWidth = 280;
const slideGap = 20;
const visibleSlides = 5;

export function VideoSlider3D() {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const totalSlides = slides.length;

  const goTo = useCallback((index: number) => {
    const target = -index * (slideWidth + slideGap);
    animate(x, target, { type: 'spring', stiffness: 200, damping: 30 });
    setCurrent(index);
  }, [x]);

  const next = useCallback(() => goTo((current + 1) % totalSlides), [goTo, current, totalSlides]);
  const prev = useCallback(() => goTo((current - 1 + totalSlides) % totalSlides), [goTo, current, totalSlides]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    setDragging(false);
    const threshold = 50;
    if (info.offset.x < -threshold) next();
    else if (info.offset.x > threshold) prev();
    else goTo(current);
  };

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [next]);

  const startAutoPlay = () => {
    autoPlayRef.current = setInterval(next, 4000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  return (
    <div
      className="relative w-full py-8"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* 3D Slider */}
      <div className="relative overflow-hidden" style={{ perspective: '1200px' }}>
        <motion.div
          ref={containerRef}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -(totalSlides - 1) * (slideWidth + slideGap), right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
        >
          {slides.map((slide, i) => {
            const Icon = slide.icon;
            const distance = i - current;
            const isCenter = distance === 0;

            // 3D transforms based on position
            const rotateY = useTransform(
              x,
              [
                -(i - 1) * (slideWidth + slideGap),
                -i * (slideWidth + slideGap),
                -(i + 1) * (slideWidth + slideGap),
              ],
              [10, 0, -10]
            );

            const zIndex = totalSlides - Math.abs(distance);
            const scale = 1 - Math.abs(distance) * 0.08;

            return (
              <motion.div
                key={slide.id}
                className="flex-shrink-0 relative group"
                style={{
                  width: slideWidth,
                  marginRight: slideGap,
                  zIndex,
                }}
                animate={{
                  scale: isCenter ? 1.05 : scale,
                  opacity: Math.abs(distance) > 2 ? 0 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    rotateY,
                    transformStyle: 'preserve-3d',
                    transform: `scale(${scale})`,
                  }}
                  whileHover={{ y: -8 }}
                >
                  {/* Video card frame */}
                  <div className="aspect-[9/16] bg-surface border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                    {/* Animated "video" content */}
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Animated gradient background */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                        animate={{
                          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                        style={{ backgroundSize: '200% 200%' }}
                      />

                      {/* Grid overlay */}
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage:
                            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                          backgroundSize: '20px 20px',
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
                        {/* Icon circle */}
                        <motion.div
                          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-white text-base font-semibold text-center leading-tight">
                          {slide.title}
                        </h3>

                        {/* Pulse dots */}
                        <div className="flex gap-1.5 mt-4">
                          {[...Array(3)].map((_, j) => (
                            <motion.div
                              key={j}
                              className="w-1.5 h-1.5 rounded-full bg-white/60"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.3 }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Glass reflection overlay */}
                      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent" />
                    </div>
                  </div>

                  {/* Glow effect on center card */}
                  {isCenter && (
                    <motion.div
                      className="absolute -inset-4 rounded-3xl -z-10"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background: `radial-gradient(circle, ${slide.color}15 0%, transparent 70%)`,
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-white hover:bg-white/[0.08] transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? 'bg-accent w-6' : 'bg-white/20 w-1.5 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-white hover:bg-white/[0.08] transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
