import { useRef } from 'react';
import { MouseSmoother } from './MouseSmoother';
import { CameraRig } from './CameraRig';
import { ParticleSystem } from './ParticleSystem';
import { CharacterModel } from './CharacterModel';
import { OrbitingServices } from './OrbitingServices';
import { DynamicLights } from './DynamicLights';
import { CursorEffects } from './CursorEffects';
import { BackgroundEnvironment } from './BackgroundEnvironment';
import type { MouseRef } from './types';

interface HeroCanvasProps {
  mouse: { x: number; y: number };
}

export function HeroCanvas({ mouse }: HeroCanvasProps) {
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0 });

  return (
    <>
      <MouseSmoother mouseRef={mouseRef} target={mouse} />
      <DynamicLights />
      <CursorEffects mouseRef={mouseRef} />
      <CameraRig mouseRef={mouseRef} />
      <CharacterModel mouseRef={mouseRef} />
      <OrbitingServices mouseRef={mouseRef} />
      <ParticleSystem mouseRef={mouseRef} />
      <BackgroundEnvironment />
    </>
  );
}
