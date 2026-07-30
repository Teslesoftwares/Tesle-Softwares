import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { HeroCanvas } from './HeroCanvas';
import { HeroOverlay } from './HeroOverlay';

export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
    });
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    setMouse({
      x: ((touch.clientX - rect.left) / rect.width) * 2 - 1,
      y: -((touch.clientY - rect.top) / rect.height) * 2 + 1,
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg"
      onPointerMove={!isMobile ? handlePointerMove : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
    >
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <HeroCanvas mouse={mouse} />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/20 to-bg pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/40 pointer-events-none z-[1]" />

      <HeroOverlay />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
