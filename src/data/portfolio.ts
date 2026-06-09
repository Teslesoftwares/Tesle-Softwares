import type { PortfolioProject } from '@/types';
import data from './portfolio.json';

export const portfolioProjects: PortfolioProject[] = data as PortfolioProject[];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: string): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.category === category);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((p) => p.featured);
}

export function getProjectCategories(): string[] {
  return [...new Set(portfolioProjects.map((p) => p.category))];
}

export function getRelatedProjects(project: PortfolioProject, limit = 3): PortfolioProject[] {
  return portfolioProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, limit);
}
