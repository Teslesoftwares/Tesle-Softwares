import type { JobPosition, Internship, TeamMember, CultureValue, Benefit } from '@/types';
import data from './jobs.json';

export const positions: JobPosition[] = data.positions as JobPosition[];
export const internships: Internship[] = data.internships as Internship[];
export const teamMembers: TeamMember[] = data.team as TeamMember[];
export const cultureValues: CultureValue[] = data.culture.values as CultureValue[];
export const benefits: Benefit[] = data.benefits as Benefit[];

export function getPositionBySlug(slug: string): JobPosition | undefined {
  return positions.find((p) => p.slug === slug);
}
