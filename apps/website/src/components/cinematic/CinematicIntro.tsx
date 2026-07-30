import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CinematicCanvas } from './CinematicCanvas';
import { CinematicOverlay } from './CinematicOverlay';
const bgSrc = '/background.webp';

function Fallback() {
  return null;
}

function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 55, near: 0.1, far: 100 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={<Fallback />}>
        <CinematicCanvas />
      </Suspense>
    </Canvas>
  );
}

export default function CinematicIntro() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cb = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(cb, { timeout: 500 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(cb, 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={bgSrc} alt="" className="w-full h-full object-cover" fetchPriority="high" />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/80" />

      {/* 3D Scene (deferred to not block initial paint) */}
      <div className="absolute inset-0">
        {ready ? <Scene3D /> : null}
      </div>

      <CinematicOverlay />
    </section>
  );
}
