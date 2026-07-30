import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import type { MouseRefObject } from './types';
import { C } from './types';
import modelSrc from '@/assets/Images/Model.webp';

interface CharacterModelProps {
  mouseRef: MouseRefObject;
}

export function CharacterModel({ mouseRef }: CharacterModelProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const texRef = useRef<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(modelSrc, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      texRef.current = tex;
      if (matRef.current) {
        matRef.current.map = tex;
        matRef.current.needsUpdate = true;
      }
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return;

    const mx = mouseRef.current.x * 0.12;
    const my = mouseRef.current.y * 0.12;
    const time = state.clock.elapsedTime;

    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position;
    if (!pos.array) return;

    const initial = (meshRef.current.userData.initialPos as Float32Array | undefined)
      ?? (() => {
        const arr = new Float32Array(pos.array);
        meshRef.current!.userData.initialPos = arr;
        return arr;
      })();

    for (let i = 0; i < pos.count; i++) {
      const ix = i * 3;
      const bx = initial[ix], by = initial[ix + 1], bz = initial[ix + 2];
      const dist = Math.sqrt(bx * bx + by * by);
      const breathe = Math.sin(time * 0.5 + dist * 4) * 0.012;
      const weight = Math.max(0, 1 - dist * 0.7);

      pos.array[ix] = bx + mx * weight * 0.2;
      pos.array[ix + 1] = by + my * weight * 0.2;
      pos.array[ix + 2] = bz + breathe + (mx * weight * 0.08);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    if (texRef.current) {
      texRef.current.offset.x += (mx * 0.002 - texRef.current.offset.x) * 0.04;
      texRef.current.offset.y += (my * 0.002 - texRef.current.offset.y) * 0.04;
    }
  });

  return (
    <group>
      <Float speed={1} floatIntensity={0.4} rotationIntensity={0.1}>
        <mesh ref={meshRef} castShadow>
          <planeGeometry args={[2.0, 2.5, 32, 32]} />
          <meshPhysicalMaterial
            ref={matRef}
            transparent
            side={THREE.DoubleSide}
            metalness={0.05}
            roughness={0.25}
            emissive={C.cyan}
            emissiveIntensity={0.02}
          />
        </mesh>
      </Float>
    </group>
  );
}
