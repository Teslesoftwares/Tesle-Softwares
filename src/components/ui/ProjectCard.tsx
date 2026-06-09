import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import type { PortfolioProject } from '@/types';

const categoryColors: Record<string, string> = {
  'Software': 'from-cyan-500 to-blue-600',
  'Websites': 'from-emerald-500 to-teal-600',
  'Mobile Apps': 'from-violet-500 to-purple-600',
  'Branding': 'from-pink-500 to-rose-600',
  'Photography': 'from-amber-500 to-orange-600',
  'Videography': 'from-red-500 to-rose-600',
  'Marketing Campaigns': 'from-green-500 to-emerald-600',
};

interface ProjectCardProps {
  project: PortfolioProject;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = project.images[0];

  return (
    <Link to={`/portfolio/${project.slug}`} className="block h-full group">
      <GlassCard className="h-full !p-0 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.02]">
          <img decoding="async"
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gradient-to-r ${categoryColors[project.category] || 'from-accent to-purple'} text-white shadow-lg`}>
              {project.category}
            </span>
          </div>

          {/* Hover arrow */}
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>

          {/* Bottom gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <h3 className="text-lg font-semibold text-white mb-1">{project.title}</h3>
            <p className="text-xs text-white/70">{project.client.company}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-muted leading-relaxed line-clamp-2">
            {project.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.08] text-muted"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.08] text-muted">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[4/3] bg-white/[0.05]" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/[0.05] rounded w-3/4" />
        <div className="h-3 bg-white/[0.05] rounded w-1/2" />
        <div className="h-3 bg-white/[0.05] rounded w-full" />
        <div className="flex gap-2">
          <div className="h-5 bg-white/[0.05] rounded-full w-14" />
          <div className="h-5 bg-white/[0.05] rounded-full w-16" />
          <div className="h-5 bg-white/[0.05] rounded-full w-12" />
        </div>
      </div>
    </div>
  );
}
