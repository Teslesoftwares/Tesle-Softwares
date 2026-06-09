import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { C } from './types';

function GridRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
      <ringGeometry args={[1.5, 6, 80]} />
      <meshBasicMaterial color={C.cyan} transparent opacity={0.04} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function RadialLines() {
  const count = 36;
  const linePositions = new Float32Array(count * 6);

  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    linePositions[i * 6] = 0;
    linePositions[i * 6 + 1] = 0;
    linePositions[i * 6 + 2] = 0;
    linePositions[i * 6 + 3] = Math.cos(a) * 5;
    linePositions[i * 6 + 4] = Math.sin(a) * 5;
    linePositions[i * 6 + 5] = 0;
  }

  return (
    <lineSegments position={[0, -1.6, 0]}>
      <bufferGeometry>
        <bufferAttribute args={[linePositions, 3]} attach="attributes-position" count={count * 2} array={linePositions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={C.cyan} transparent opacity={0.03} blending={THREE.AdditiveBlending} depthWrite={false} />
    </lineSegments>
  );
}

export function BackgroundEnvironment() {
  return (
    <>
      <GridRing />
      <RadialLines />
    </>
  );
}
