import { useFrame } from '@react-three/fiber';
import type { MouseRefObject } from './types';

interface MouseSmootherProps {
  mouseRef: MouseRefObject;
  target: { x: number; y: number };
}

export function MouseSmoother({ mouseRef, target }: MouseSmootherProps) {
  useFrame((_, delta) => {
    mouseRef.current.x += (target.x - mouseRef.current.x) * delta * 3;
    mouseRef.current.y += (target.y - mouseRef.current.y) * delta * 3;
  });

  return null;
}
