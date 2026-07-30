import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MouseRefObject } from './types';
import { C } from './types';

interface ParticleSystemProps {
  mouseRef: MouseRefObject;
}

function Particles({ mouseRef }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2500;

  const { positions, colors, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const palette = [C.cyan, C.purple, C.blue, C.gold];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 5;

      const c = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
    }
    return { positions: pos, colors: col, velocities: vel };
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array as Float32Array;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const cx = mx * 3;
    const cy = -my * 3;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = positions[ix];
      const by = positions[ix + 1];
      const bz = positions[ix + 2];

      const dx = posArray[ix] - cx;
      const dy = posArray[ix + 1] - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pushRadius = 3;

      if (dist < pushRadius) {
        const force = (1 - dist / pushRadius) * 2;
        const angle = Math.atan2(dy, dx);
        velocities[ix] += Math.cos(angle) * force * delta;
        velocities[ix + 1] += Math.sin(angle) * force * delta;
        velocities[ix + 2] += (Math.random() - 0.5) * force * delta;
      }

      velocities[ix] *= 0.95;
      velocities[ix + 1] *= 0.95;
      velocities[ix + 2] *= 0.95;

      posArray[ix] += velocities[ix];
      posArray[ix + 1] += velocities[ix + 1];
      posArray[ix + 2] += velocities[ix + 2];

      const rx = posArray[ix] - bx;
      const ry = posArray[ix + 1] - by;
      const rz = posArray[ix + 2] - bz;
      const restDist = Math.sqrt(rx * rx + ry * ry + rz * rz);
      if (restDist > 0.5) {
        posArray[ix] += (bx - posArray[ix]) * 0.02;
        posArray[ix + 1] += (by - posArray[ix + 1]) * 0.02;
        posArray[ix + 2] += (bz - posArray[ix + 2]) * 0.02;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute args={[colors, 3]} attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function Connections() {
  const count = 150;
  const threshold = 3;

  const linePositions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }

    const pairs: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < threshold) {
          pairs.push(i, j);
        }
      }
    }

    const lp = new Float32Array(pairs.length * 3);
    for (let k = 0; k < pairs.length; k++) {
      const idx = pairs[k];
      lp[k * 3] = pos[idx * 3];
      lp[k * 3 + 1] = pos[idx * 3 + 1];
      lp[k * 3 + 2] = pos[idx * 3 + 2];
    }
    return lp;
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          args={[linePositions, 3]}
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color={C.cyan}
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
}

export function ParticleSystem({ mouseRef }: ParticleSystemProps) {
  return (
    <>
      <Particles mouseRef={mouseRef} />
      <Connections />
    </>
  );
}
