import { motion } from 'framer-motion';
import { Globe, Smartphone, Palette, Code, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';

const projects = [
  {
    category: 'Web Development',
    title: 'E-Commerce Platform',
    description: 'A high-performance React-based storefront with real-time inventory, AI recommendations, and sub-second page loads.',
    tags: ['React', 'Node.js', 'Stripe', 'Redis'],
    gradient: 'from-accent/20 via-purple/10 to-transparent',
  },
  {
    category: 'Mobile App',
    title: 'Health & Fitness App',
    description: 'Cross-platform mobile app with workout tracking, meal planning, live coaching, and social features.',
    tags: ['React Native', 'Firebase', 'WebSockets'],
    gradient: 'from-purple/20 via-accent/10 to-transparent',
  },
  {
    category: 'Branding & Design',
    title: 'Fintech Rebrand',
    description: 'Complete brand overhaul including logo, typography, color system, and design guidelines for a fintech startup.',
    tags: ['Brand Identity', 'UI/UX', 'Design System'],
    gradient: 'from-accent/15 via-purple/15 to-transparent',
  },
  {
    category: 'Software Development',
    title: 'CRM Automation Tool',
    description: 'Custom CRM with pipeline management, automated workflows, email integration, and analytics dashboards.',
    tags: ['Python', 'PostgreSQL', 'Docker', 'API'],
    gradient: 'from-purple/20 via-accent/5 to-transparent',
  },
];

export default function ProductShowcase() {
  return (
    <section id="work" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Portfolio"
          title="Recent work"
          subtitle="A selection of projects we've delivered across web, mobile, branding, and software."
        />

        <div className="mt-16 sm:mt-20 grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlassCard className="group h-full !p-0 overflow-hidden">
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-semibold tracking-widest uppercase text-accent">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-xs rounded-full glass text-muted border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${project.gradient}`} />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
