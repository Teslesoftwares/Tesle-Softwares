import { useRef, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import modelSrc from '@/assets/Images/Model.webp';

function FloatComp({ speed = 1, floatIntensity = 1, children }: { speed?: number; floatIntensity?: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = Math.sin(t * 0.5) * 0.08 * floatIntensity;
    ref.current.position.x = Math.cos(t * 0.3) * 0.03 * floatIntensity;
  });
  return <group ref={ref}>{children}</group>;
}

export function CinematicCanvas() {
  const modelRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const sweepRef = useRef<THREE.SpotLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const texture = useTexture(modelSrc);
  texture.colorSpace = THREE.SRGBColorSpace;

  const initial = useRef<Float32Array | null>(null);

  // Particle data
  const particleData = useMemo(() => {
    const count = 1500;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = ['#00e5ff', '#8b5cf6', '#f59e0b', '#3b82f6'];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 6;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 3;
      const c = new THREE.Color(palette[Math.floor(Math.random() * palette.length)]);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, []);

  // Entrance animation: light sweep
  useEffect(() => {
    let startTime = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      if (sweepRef.current) {
        const progress = Math.min(elapsed / 2.5, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        sweepRef.current.position.x = -5 + eased * 10;
        sweepRef.current.intensity = Math.sin(progress * Math.PI) * 3;
      }
      if (rimRef.current) {
        const progress = Math.min(elapsed / 1.5, 1);
        rimRef.current.intensity = progress * 1.5;
      }
      if (matRef.current) {
        const progress = Math.min(Math.max((elapsed - 0.3) / 1.5, 0), 1);
        matRef.current.opacity = progress;
      }
      if (modelRef.current) {
        const progress = Math.min(Math.max((elapsed - 0.3) / 1.5, 0), 1);
        const s = 0.85 + progress * 0.15;
        modelRef.current.scale.setScalar(s);
      }
      if (glowRef.current) {
        const progress = Math.min(Math.max((elapsed - 0.8) / 1.5, 0), 1);
        (glowRef.current.material as THREE.MeshBasicMaterial).opacity = progress * 0.06;
      }
      if (elapsed < 4) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // Mouse tracking on the document
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', handler);
    return () => document.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state, delta) => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const time = state.clock.elapsedTime;

    // Camera follow
    camera.position.x += (mx * 0.8 - camera.position.x) * delta * 1.5;
    camera.position.y += (-my * 0.5 - camera.position.y) * delta * 1.5;
    camera.lookAt(0, 0, 0);

    // Model vertex displacement
    if (modelRef.current && matRef.current) {
      const geo = modelRef.current.geometry;
      const pos = geo.attributes.position;
      if (!initial.current) {
        initial.current = new Float32Array(pos.array);
      }
      const init = initial.current;
      for (let i = 0; i < pos.count; i++) {
        const ix = i * 3;
        const bx = init[ix], by = init[ix + 1], bz = init[ix + 2];
        const dist = Math.sqrt(bx * bx + by * by);
        const breathe = Math.sin(time * 0.4 + dist * 3) * 0.01;
        const weight = Math.max(0, 1 - dist * 0.6);
        pos.array[ix] = bx + mx * weight * 0.15;
        pos.array[ix + 1] = by + my * weight * 0.15;
        pos.array[ix + 2] = bz + breathe + (mx * weight * 0.05);
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      const mat = matRef.current as unknown as { mapOffset: THREE.Vector2 };
      mat.mapOffset.x += (mx * 0.001 - mat.mapOffset.x) * 0.03;
      mat.mapOffset.y += (my * 0.001 - mat.mapOffset.y) * 0.03;
    }

    // Particles
    if (particlesRef.current) {
      const posAttr = particlesRef.current.geometry.attributes.position;
      const pa = posAttr.array as Float32Array;
      const count = particleData.positions.length / 3;
      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const bx = particleData.positions[ix];
        const by = particleData.positions[ix + 1];
        pa[ix] += (bx + Math.sin(time * 0.2 + i) * 0.1 - pa[ix]) * 0.008;
        pa[ix + 1] += (by + Math.cos(time * 0.15 + i * 0.5) * 0.1 - pa[ix + 1]) * 0.008;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[2, 3, 4]} intensity={1.2} />
      <directionalLight position={[-2, 1, 3]} intensity={0.4} color="#8b5cf6" />
      <directionalLight ref={rimRef} position={[0, 1, -3]} intensity={0} color="#00e5ff" />

      <spotLight
        ref={sweepRef}
        position={[-5, 2, 4]}
        angle={0.6}
        penumbra={0.5}
        intensity={0}
        color="#00e5ff"
        distance={15}
      />

      <mesh ref={glowRef} position={[0, 0, -0.3]}>
        <planeGeometry args={[3.5, 4]} />
        <meshBasicMaterial color="#00e5ff" transparent opacity={0} depthWrite={false} />
      </mesh>

      <FloatComp speed={0.6} floatIntensity={0.25}>
        <mesh ref={modelRef} castShadow>
          <planeGeometry args={[2.2, 2.8, 32, 32]} />
          <meshPhysicalMaterial
            ref={matRef}
            map={texture}
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            metalness={0.05}
            roughness={0.2}
            emissive="#00e5ff"
            emissiveIntensity={0.015}
          />
        </mesh>
      </FloatComp>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute args={[particleData.positions, 3]} attach="attributes-position" count={particleData.positions.length / 3} array={particleData.positions} itemSize={3} />
          <bufferAttribute args={[particleData.colors, 3]} attach="attributes-color" count={particleData.colors.length / 3} array={particleData.colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          vertexColors
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
}
