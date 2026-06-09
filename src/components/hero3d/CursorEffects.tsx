import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MouseRefObject } from './types';
import { C } from './types';

interface CursorEffectsProps {
  mouseRef: MouseRefObject;
}

export function CursorEffects({ mouseRef }: CursorEffectsProps) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (!lightRef.current) return;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    lightRef.current.position.x += (mx * 4 - lightRef.current.position.x) * delta * 3;
    lightRef.current.position.y += (my * 3 - lightRef.current.position.y) * delta * 3;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={1.5}
      color={C.cyan}
      distance={10}
    />
  );
}
