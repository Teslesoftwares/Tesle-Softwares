import type { MutableRefObject } from 'react';

export const C = {
  cyan: '#00e5ff',
  purple: '#8b5cf6',
  gold: '#f59e0b',
  blue: '#3b82f6',
  red: '#ef4444',
  pink: '#ec4899',
  indigo: '#6366f1',
  green: '#10b981',
} as const;

export interface MouseRef {
  x: number;
  y: number;
}

export type MouseRefObject = MutableRefObject<MouseRef>;

export interface ServiceItem {
  radius: number;
  speed: number;
  color: string;
  label: string;
  offset: number;
  yOffset: number;
  cardW: number;
  cardH: number;
}

export const serviceData: ServiceItem[] = [
  { radius: 3.0, speed: 0.35, color: C.cyan, label: 'Software Development', offset: 0, yOffset: 0.3, cardW: 1.1, cardH: 0.5 },
  { radius: 3.6, speed: -0.25, color: C.purple, label: 'Website Development', offset: 1.8, yOffset: -0.4, cardW: 1.1, cardH: 0.5 },
  { radius: 3.2, speed: 0.4, color: C.gold, label: 'Mobile Apps', offset: 3.2, yOffset: 0.5, cardW: 0.9, cardH: 0.5 },
  { radius: 4.0, speed: -0.3, color: C.blue, label: 'Photography', offset: 1.2, yOffset: -0.5, cardW: 1.0, cardH: 0.5 },
  { radius: 3.8, speed: 0.28, color: C.red, label: 'Videography', offset: 4.5, yOffset: 0.2, cardW: 1.0, cardH: 0.5 },
  { radius: 4.2, speed: -0.35, color: C.pink, label: 'Content Creation', offset: 2.5, yOffset: -0.3, cardW: 1.1, cardH: 0.5 },
  { radius: 3.4, speed: 0.32, color: C.indigo, label: 'Digital Marketing', offset: 5.5, yOffset: 0.4, cardW: 1.1, cardH: 0.5 },
];
