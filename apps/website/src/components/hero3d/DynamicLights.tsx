import { C } from './types';

export function DynamicLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <directionalLight position={[-4, -3, 5]} intensity={0.6} color={C.cyan} />
      <directionalLight position={[4, -2, 3]} intensity={0.4} color={C.gold} />
      <hemisphereLight args={[C.cyan, '#050505', 0.5]} />
    </>
  );
}
