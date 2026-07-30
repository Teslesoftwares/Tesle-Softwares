import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useSpring } from 'framer-motion';

const EYE_LEFT = { x: 35.5, y: 43 };
const EYE_RIGHT = { x: 65.6, y: 43 };
const SIZE = 28;

function BlinkEyes({ blink, hover }: { blink: boolean; hover: boolean }) {
  const glow = '8px';
  const eyeBase: React.CSSProperties = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    translate: '-50% -50%',
    background: 'radial-gradient(circle at 35% 30%, #fff 0%, rgba(34,211,238,0.9) 35%, rgba(34,211,238,0.3) 70%, transparent 100%)',
    boxShadow: `0 0 ${glow} rgba(34,211,238,0.6), 0 0 ${parseInt(glow) * 2}px rgba(34,211,238,0.2)`,
  };

  const hoverAnim = hover ? { scale: [1, 1.35, 1], opacity: [1, 0.5, 1] } : {};

  return (
    <>
      <motion.div
        style={{ ...eyeBase, left: `${EYE_LEFT.x}%`, top: `${EYE_LEFT.y}%` }}
        animate={
          blink
            ? { scaleY: [1, 0.05, 0.05, 1], scaleX: [1, 1.2, 1.2, 1] }
            : hoverAnim
        }
        transition={{ duration: blink ? 0.22 : 0.5, times: blink ? [0, 0.1, 0.7, 1] : undefined }}
      />
      <motion.div
        style={{ ...eyeBase, left: `${EYE_RIGHT.x}%`, top: `${EYE_RIGHT.y}%` }}
        animate={
          blink
            ? { scaleY: [1, 0.05, 0.05, 1], scaleX: [1, 1.2, 1.2, 1] }
            : hoverAnim
        }
        transition={{ duration: blink ? 0.22 : 0.5, times: blink ? [0, 0.1, 0.7, 1] : undefined }}
      />
      {(blink || hover) && (
        <>
          <motion.div
            className="absolute rounded-full bg-cyan-300/30 blur-xl pointer-events-none"
            style={{ left: `${EYE_LEFT.x}%`, top: `${EYE_LEFT.y}%`, width: '40px', height: '40px', translate: '-50% -50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: hover ? [0, 3, 0] : [0, 2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: hover ? 0.8 : 0.4 }}
          />
          <motion.div
            className="absolute rounded-full bg-cyan-300/30 blur-xl pointer-events-none"
            style={{ left: `${EYE_RIGHT.x}%`, top: `${EYE_RIGHT.y}%`, width: '40px', height: '40px', translate: '-50% -50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: hover ? [0, 3, 0] : [0, 2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: hover ? 0.8 : 0.4 }}
          />
        </>
      )}
    </>
  );
}

export function MascotCompanion() {
  const [blink, setBlink] = useState(false);
  const [hover, setHover] = useState(false);
  const [winWidth, setWinWidth] = useState(0);
  const prevBlink = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setWinWidth(window.innerWidth);
    const onResize = () => setWinWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      prevBlink.current = setTimeout(() => setBlink(false), 220);
    }, 3000 + Math.random() * 2000);
    return () => {
      clearInterval(interval);
      if (prevBlink.current) clearTimeout(prevBlink.current);
    };
  }, []);

  const gap = 24;
  const mascotPx = SIZE * 4;
  const targetX = winWidth - mascotPx - gap;

  const bounceSpring = useSpring(1, { stiffness: 200, damping: 12 });
  const xSpring = useSpring(targetX, { stiffness: 50, damping: 18 });

  useEffect(() => { xSpring.set(targetX); }, [targetX, xSpring]);

  const xVal = xSpring as unknown as number;

  return (
    <motion.div className="fixed bottom-8 z-40 pointer-events-none" style={{ left: 0 }}>
      <motion.div
        className="relative cursor-pointer pointer-events-auto"
        style={{
          width: SIZE * 4,
          height: SIZE * 4,
          x: xVal,
          scale: bounceSpring as unknown as number,
        }}
        onMouseEnter={() => { setHover(true); bounceSpring.set(1.18); }}
        onMouseLeave={() => { setHover(false); bounceSpring.set(1); }}
        animate={hover ? { y: [0, -8, 2, -4, 0] } : { y: [0, -5, 0] }}
        transition={{
          duration: hover ? 0.6 : 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {hover && (
          <motion.div
            className="absolute -inset-4 rounded-full border border-cyan-400/30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
        <motion.div
          className="absolute inset-1 rounded-full bg-gradient-to-br from-cyan-400/20 via-accent/10 to-transparent blur-lg"
          animate={
            hover
              ? { scale: [1, 1.15, 1], opacity: [0.2, 0.7, 0.2] }
              : { scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }
          }
          transition={{ duration: hover ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        <img
          src="/mascot.png"
          alt="Tesle AI Mascot"
          className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.25)]"
        />
        <BlinkEyes blink={blink} hover={hover} />

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex gap-1">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
