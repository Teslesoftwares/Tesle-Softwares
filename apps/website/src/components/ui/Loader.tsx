import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SEGMENTS = 6;
const POINTS = 30;

// T logo segment definitions (relative to center)
// Horizontal bar: 3 segments, Vertical bar: 3 segments
const LOGO = [
  { x1: -38, y1: -28, x2: -12, y2: -28 },
  { x1: -12, y1: -28, x2: 12, y2: -28 },
  { x1: 12, y1: -28, x2: 38, y2: -28 },
  { x1: 0, y1: -28, x2: 0, y2: -6 },
  { x1: 0, y1: -6, x2: 0, y2: 16 },
  { x1: 0, y1: 16, x2: 0, y2: 38 },
];

// 3D line points (for rotation)
const line3D = Array.from({ length: POINTS }, (_, i) => ({
  x: -1.3 + (2.6 * i) / (POINTS - 1),
  y: 0,
  z: 0,
}));

interface LoaderProps {
  loaded: boolean;
  onLoaded: (v: boolean) => void;
}

export function Loader({ loaded, onLoaded }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaded) return;
    let hasSeen = false;
    try { hasSeen = !!localStorage.getItem('tesle-loader-seen'); } catch {}
    if (hasSeen) { onLoaded(true); return; }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, cx = 0, cy = 0;
    let animId: number;
    let time = 0;
    let phase = 0;
    let splitT = 1; // 1 = fully line, 0 = fully logo
    let cursorX = 0, cursorY = 0;
    let trail: { x: number; y: number; a: number }[] = [];
    let orbitAngle = 0;
    let burstSize = 0;

    // Segment animation data
    const segs = LOGO.map((l, i) => ({
      x1: 0, y1: 0, x2: 0, y2: 0,
      tx1: l.x1, ty1: l.y1, tx2: l.x2, ty2: l.y2,
      alpha: 0,
      linePos: (i + 0.5) / SEGMENTS, // normalized position on line
    }));

    // Trail particles
    const particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] = [];

    function resize() {
      w = canvas!.width = canvas!.offsetWidth;
      h = canvas!.height = canvas!.offsetHeight;
      cx = w / 2;
      cy = h / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e: MouseEvent) => {
      cursorX = (e.clientX / w - 0.5) * 2;
      cursorY = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    function project(pt: { x: number; y: number; z: number }, ax: number, ay: number, s: number) {
      const cy2 = Math.cos(ay), sy2 = Math.sin(ay);
      const x1 = pt.x * cy2 - pt.z * sy2;
      const z1 = pt.x * sy2 + pt.z * cy2;
      const cx2 = Math.cos(ax), sx2 = Math.sin(ax);
      const y1 = pt.y * cx2 - z1 * sx2;
      const z2 = pt.y * sx2 + z1 * cx2;
      const d = 3;
      return { x: x1 * s * (d / (d + z2)), y: y1 * s * (d / (d + z2)) };
    }

    // -- GSAP timeline --
    let pageLoaded = document.readyState === 'complete';
    function finish() {
      localStorage.setItem('tesle-loader-seen', '1');
      onLoaded(true);
    }
    const onPageLoad = () => { pageLoaded = true; };
    window.addEventListener('load', onPageLoad, { once: true });

    const splitObj = { val: 1 };
    const sphereObj = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        if (pageLoaded) finish();
        else window.addEventListener('load', finish, { once: true });
      },
    });

    // Phase 0: dot (0-0.15s)
    tl.call(() => { phase = 0; }, [], 0);
    tl.to(sphereObj, { val: 0, duration: 0.15 }, 0);

    // Phase 1: line appears + rotates, sphere travels (0.15-0.8s)
    tl.call(() => { phase = 1; }, [], 0.15);
    tl.to(sphereObj, { val: 1, duration: 0.65, ease: 'power2.inOut' }, 0.15);

    // Phase 2: split + assemble logo (0.8-1.3s)
    tl.call(() => { phase = 2; }, [], 0.8);
    tl.to(splitObj, { val: 0, duration: 0.5, ease: 'power2.inOut' }, 0.8);

    // Phase 3: logo + text (1.3-1.6s)
    tl.call(() => {
      phase = 3;
      if (textRef.current) textRef.current.classList.add('visible');
    }, [], 1.3);

    // Phase 4: orbit (1.6-2.2s)
    tl.call(() => { phase = 4; }, [], 1.6);
    tl.to({}, { duration: 0.6 }, 1.6);

    // Phase 5: collapse (2.2-2.3s)
    tl.call(() => { phase = 5; }, [], 2.2);
    tl.to({}, { duration: 0.1 }, 2.2);

    // Phase 6: burst (2.3-2.5s)
    tl.call(() => { phase = 6; }, [], 2.3);
    tl.to({}, { duration: 0.2 }, 2.3);

    // -- star particles (for orbit phase) --
    function emitOrbitParticle(x: number, y: number) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        alpha: 0.4 + Math.random() * 0.4,
        size: 0.3 + Math.random() * 0.6,
      });
    }

    // -- render loop --
    function draw() {
      ctx!.clearRect(0, 0, w, h);

      const scale = Math.min(w, h) * 0.16;
      const ay = time * 0.5 + cursorX * 0.12;
      const ax = 0.12 + Math.sin(time * 0.25) * 0.06 + cursorY * 0.06;

      splitT = splitObj.val;

      // Project all 3D points
      const pts = line3D.map(p => project(p, ax, ay, scale));

      // Update segment positions (interpolate between line and logo)
      for (let i = 0; i < SEGMENTS; i++) {
        const seg = segs[i];
        const segLen = 1 / SEGMENTS;
        const s0 = Math.max(0, Math.floor((seg.linePos - segLen / 2) * (POINTS - 1)));
        const s1 = Math.min(POINTS - 1, Math.floor((seg.linePos + segLen / 2) * (POINTS - 1)));
        const pA = pts[s0];
        const pB = pts[Math.min(s1 + 1, POINTS - 1)];

        seg.x1 = cx + pA.x * splitT + seg.tx1 * (1 - splitT);
        seg.y1 = cy + pA.y * splitT + seg.ty1 * (1 - splitT);
        seg.x2 = cx + pB.x * splitT + seg.tx2 * (1 - splitT);
        seg.y2 = cy + pB.y * splitT + seg.ty2 * (1 - splitT);

        seg.alpha = Math.min(1, phase >= 1 ? (time - 0.5) / 1.3 * 1.5 : 0);
        if (splitT < 0.3) seg.alpha = Math.min(1, seg.alpha + 0.3);
      }

      // Draw HUD rings during rotation (phase 1+)
      if (phase >= 1 && phase < 3) {
        for (let i = 0; i < 2; i++) {
          const r = scale * 2 * (1 + i * 0.15);
          ctx!.beginPath();
          ctx!.arc(cx, cy, r, time * 0.3 + i * 0.5, time * 0.3 + Math.PI * 0.8 + i * 0.5);
          ctx!.strokeStyle = `rgba(255, 107, 0, ${0.03 - i * 0.01})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }

      // Draw line or logo segments
      const isLogo = splitT < 0.3;
      for (let i = 0; i < SEGMENTS; i++) {
        const seg = segs[i];
        if (seg.alpha < 0.01) continue;

        const a = seg.alpha * (isLogo ? 0.9 : 0.5);
        const lw = isLogo ? 2.5 : Math.max(1, 2.5 * splitT);

        ctx!.beginPath();
        ctx!.moveTo(seg.x1, seg.y1);
        ctx!.lineTo(seg.x2, seg.y2);
        ctx!.strokeStyle = isLogo
          ? `rgba(255, 107, 0, ${a * 0.9})`
          : `rgba(255, 255, 255, ${a * 0.5})`;
        ctx!.lineWidth = lw;
        ctx!.shadowColor = isLogo ? 'rgba(255, 107, 0, 0.4)' : 'transparent';
        ctx!.shadowBlur = isLogo ? 15 : 0;
        ctx!.stroke();
        ctx!.shadowBlur = 0;
      }

      // Logo glow
      if (isLogo) {
        for (let i = 0; i < SEGMENTS; i++) {
          const seg = segs[i];
          const g = ctx!.createRadialGradient(
            (seg.x1 + seg.x2) / 2, (seg.y1 + seg.y2) / 2, 0,
            (seg.x1 + seg.x2) / 2, (seg.y1 + seg.y2) / 2, 25,
          );
          g.addColorStop(0, 'rgba(255, 107, 0, 0.04)');
          g.addColorStop(1, 'transparent');
          ctx!.fillStyle = g;
          ctx!.fillRect(seg.x1 - 25, seg.y1 - 25, 50, 50);
        }
      }

      // -- Sphere --
      const logoCenter = { x: cx, y: cy - 5 };

      if (phase <= 4) {
        // Determine sphere position
        let sx: number, sy: number;

        if (phase >= 3 && phase <= 4) {
          orbitAngle += phase === 4 ? 0.025 : 0.02;
          const or = 55;
          sx = logoCenter.x + Math.cos(orbitAngle) * or;
          sy = logoCenter.y + Math.sin(orbitAngle) * or;
          if (phase === 4 && Math.random() < 0.4) emitOrbitParticle(sx, sy);
        } else {
          const st = sphereObj.val;
          const idx = st * (POINTS - 1);
          const i0 = Math.floor(idx);
          const i1 = Math.min(i0 + 1, POINTS - 1);
          const f = idx - i0;
          const p1 = pts[i0];
          const p2 = pts[i1];
          sx = cx + p1.x + (p2.x - p1.x) * f;
          sy = cy + p1.y + (p2.y - p1.y) * f;
        }

        // Trail
        trail.push({ x: sx, y: sy, a: 1 });
        if (trail.length > 50) trail.shift();
        for (let i = trail.length - 1; i >= 0; i--) {
          const t = trail[i];
          t.a *= 0.94;
          if (t.a < 0.01) { trail.splice(i, 1); continue; }
          ctx!.beginPath();
          ctx!.arc(t.x, t.y, 0.8 + trail.length > i ? (trail.length - i) / trail.length * 2 : 0, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255, 107, 0, ${t.a * 0.35})`;
          ctx!.fill();
        }

        // Sphere glow
        const sg = ctx!.createRadialGradient(sx, sy, 0, sx, sy, 15);
        sg.addColorStop(0, 'rgba(255, 107, 0, 0.3)');
        sg.addColorStop(0.3, 'rgba(255, 107, 0, 0.1)');
        sg.addColorStop(1, 'transparent');
        ctx!.fillStyle = sg;
        ctx!.beginPath();
        ctx!.arc(sx, sy, 15, 0, Math.PI * 2);
        ctx!.fill();

        // Sphere body
        ctx!.beginPath();
        ctx!.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx!.shadowColor = 'rgba(255, 107, 0, 0.7)';
        ctx!.shadowBlur = 20;
        ctx!.fill();
        ctx!.shadowBlur = 0;

        // Lens flare
        ctx!.beginPath();
        ctx!.arc(sx - 1, sy - 1, 1.2, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx!.fill();
      }

      // Draw orbit particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha *= 0.97;
        p.size *= 0.99;
        if (p.alpha < 0.01) { particles.splice(i, 1); continue; }
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255, 107, 0, ${p.alpha * 0.5})`;
        ctx!.fill();
      }

      // Phase 5: collapse to center
      if (phase >= 5) {
        for (let i = 0; i < SEGMENTS; i++) {
          segs[i].x1 += (cx - segs[i].x1) * 0.08;
          segs[i].y1 += (cy - segs[i].y1) * 0.08;
          segs[i].x2 += (cx - segs[i].x2) * 0.08;
          segs[i].y2 += (cy - segs[i].y2) * 0.08;
          segs[i].alpha *= 0.95;
        }
      }

      // Phase 6: burst
      if (phase >= 6) {
        burstSize = Math.min(burstSize + 18, Math.max(w, h) * 2.5);
        const burst = Math.min(burstSize / 350, 1);
        const bg = ctx!.createRadialGradient(cx, cy, 0, cx, cy, burstSize);
        bg.addColorStop(0, `rgba(255, 107, 0, ${burst * 0.4})`);
        bg.addColorStop(0.1, `rgba(255, 255, 255, ${burst * 0.15})`);
        bg.addColorStop(0.25, `rgba(255, 107, 0, ${burst * 0.06})`);
        bg.addColorStop(0.5, `rgba(255, 107, 0, ${burst * 0.02})`);
        bg.addColorStop(1, 'transparent');
        ctx!.fillStyle = bg;
        ctx!.fillRect(0, 0, w, h);
      }

      time += 0.016;
      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      tl.kill();
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('load', onPageLoad);
      window.removeEventListener('load', finish);
    };
  }, [loaded]);

  return (
    <div ref={overlayRef} className={`loader-overlay${loaded ? ' fade-out' : ''}`}>
      <canvas ref={canvasRef} className="loader-canvas" />
      <div ref={textRef} className="loader-text-group">
        <p className="loader-title">TESLE SOFTWARE & WEB INNOVATIONS</p>
        <p className="loader-subtitle">Transforming Ideas Into Digital Reality</p>
      </div>
    </div>
  );
}
