import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { MouseRefObject } from './types';
import { serviceData } from './types';

function ServiceCard({
  radius, speed, color, label, offset, yOffset, cardW, cardH, mouseRef, index,
}: typeof serviceData[0] & { mouseRef: MouseRefObject; index: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(offset);

  useFrame((state) => {
    if (!groupRef.current || !cardRef.current) return;
    const dt = state.clock.getDelta();
    angleRef.current += dt * speed;
    const a = angleRef.current;

    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;

    groupRef.current.position.x = Math.cos(a) * radius + mx * 0.3;
    groupRef.current.position.z = Math.sin(a) * radius;
    groupRef.current.position.y = yOffset + my * 0.2;

    const s = hovered ? 1.25 : 1;
    cardRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08);

    groupRef.current.lookAt(new THREE.Vector3(-mx * 0.3, -my * 0.2, 4));
  });

  return (
    <group ref={groupRef}>
      <mesh ref={cardRef} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <boxGeometry args={[cardW, cardH, 0.04]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.9}
          roughness={0.05}
          transparent
          opacity={hovered ? 0.35 : 0.2}
          clearcoat={1}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.08}
        />
      </mesh>
      {hovered && (
        <mesh>
          <planeGeometry args={[cardW + 0.3, cardH + 0.2]} />
          <meshBasicMaterial color={color} transparent opacity={0.06} depthWrite={false} />
        </mesh>
      )}
      <Html center distanceFactor={7} position={[0, -cardH * 0.35, 0.06]}>
        <div
          className="px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap text-center"
          style={{
            background: hovered ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: `1px solid ${color}30`,
            color: '#fff',
            letterSpacing: '0.02em',
            opacity: hovered ? 1 : 0.8,
          }}
        >
          {label}
        </div>
      </Html>
    </group>
  );
}

interface OrbitingServicesProps {
  mouseRef: MouseRefObject;
}

export function OrbitingServices({ mouseRef }: OrbitingServicesProps) {
  return (
    <>
      {serviceData.map((item, i) => (
        <ServiceCard key={i} {...item} index={i} mouseRef={mouseRef} />
      ))}
    </>
  );
}
