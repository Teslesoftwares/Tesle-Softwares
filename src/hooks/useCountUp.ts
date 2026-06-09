import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export function useCountUp(target: number, duration = 2, suffix = '') {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, target, {
        duration,
        ease: 'easeOut',
        onUpdate: (v) => setDisplayed(Math.round(v)),
      });
      return controls.stop;
    }
  }, [inView, target, duration]);

  return { ref, displayed: `${displayed}${suffix}`, inView };
}
