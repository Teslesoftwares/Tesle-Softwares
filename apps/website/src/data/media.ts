import type { MediaCategory } from '@/types';
import data from './media.json';

export const mediaCategories: MediaCategory[] = data as MediaCategory[];

export function getMediaCategoryBySlug(slug: string): MediaCategory | undefined {
  return mediaCategories.find((c) => c.slug === slug);
}

export function getTotalMediaCount(): number {
  return mediaCategories.reduce((sum, cat) => sum + cat.items.length, 0);
}
