import { useFrame, useThree } from '@react-three/fiber';
import type { MouseRefObject } from './types';

interface CameraRigProps {
  mouseRef: MouseRefObject;
}

export function CameraRig({ mouseRef }: CameraRigProps) {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    camera.position.x += (mx * 1.8 - camera.position.x) * delta * 2;
    camera.position.y += (-my * 1.2 - camera.position.y) * delta * 2;
    camera.position.z += (6 + my * 0.5 - camera.position.z) * delta * 2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
