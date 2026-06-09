import type { Service } from '@/types';
import data from './services.json';

export const services: Service[] = data as Service[];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceById(id: number): Service | undefined {
  return services.find((s) => s.id === id);
}
