import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';

const projects = [
  {
    category: 'Enterprise ERP Implementation',
    title: 'Transcorp Group ERP Rollout',
    description: 'Unified 11 disparate systems across 5 subsidiaries into one Tesle ERP instance. Consolidated financial reporting cycle reduced from 2 weeks to 45 minutes.',
    tags: ['ERP', 'Financials', 'Multi-Entity', 'Africa'],
    gradient: 'from-accent/20 via-accent/5 to-transparent',
  },
  {
    category: 'CRM Transformation',
    title: 'Pivot Bank CRM Migration',
    description: 'Migrated 500+ banking staff from spreadsheets and legacy CRM to Tesle CRM. Pipeline visibility improved 300%, deal velocity increased 40% in first quarter.',
    tags: ['CRM', 'Banking', 'Migration', 'AI Scoring'],
    gradient: 'from-accent/20 via-accent/10 to-transparent',
  },
  {
    category: 'HRM Deployment',
    title: 'West African Banking Corp HRM',
    description: 'Deployed Tesle HRM across 3,000 employees in 5 countries. Unified payroll, recruitment, performance, leave, and compliance  payroll errors dropped to zero.',
    tags: ['HRM', 'Multi-Country', 'Payroll', 'Compliance'],
    gradient: 'from-accent/15 via-accent/5 to-transparent',
  },
  {
    category: 'Supply Chain Platform',
    title: 'East Africa Logistics Supply Chain',
    description: 'End-to-end supply chain visibility from procurement to last-mile delivery. AI demand forecasting reduced stockouts by 67% and inventory costs by 23%.',
    tags: ['Supply Chain', 'AI Forecasting', 'Logistics', 'Inventory'],
    gradient: 'from-accent/20 via-accent/5 to-transparent',
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function ProjectCard({ project, index }: { project: typeof projects[number]; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.1 }}
    >
      <GlassCard className="group h-full !p-0 overflow-hidden">
        <div className="p-6 sm:p-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-accent">
            {project.category}
          </span>
          <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-text">
            {project.title}
          </h3>
          <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
            {project.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-full card text-muted border-glass">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={`h-1 w-0 group-hover:w-full transition-all duration-700 bg-gradient-to-r ${project.gradient}`} />
      </GlassCard>
    </motion.div>
  );
}

export default function ProductShowcase() {
  const [expanded, setExpanded] = useState(false);
  const showAll = expanded || projects.length <= 2;
  const itemWidth = 'calc(50% - 0.5rem)';

  return (
    <section id="work" className="relative py-10 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Case Studies"
          title="Enterprise implementations that deliver"
          subtitle="Real results from organisations that transformed their operations with Tesle's unified platform."
        />

        {/* Mobile: carousel or expanded */}
        <div
          className={
            showAll
              ? 'flex flex-col gap-6 mt-10 sm:mt-12 md:hidden'
              : 'flex overflow-x-auto snap-x snap-mandatory gap-4 mt-10 sm:mt-12 pb-2 md:hidden'
          }
          style={showAll ? {} : { scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`div::-webkit-scrollbar{display:none}`}</style>
          {projects.map((project, i) => (
            <div key={project.title} className={showAll ? '' : 'flex-shrink-0 snap-start'} style={showAll ? {} : { width: itemWidth }}>
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mt-16 sm:mt-20">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {projects.length > 2 && (
          <div className="mt-5 text-center md:hidden">
            <button
              onClick={() => setExpanded(!expanded)}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors px-4 py-2 rounded-full border border-white/[0.06] hover:border-accent/30 glass"
            >
              {expanded ? (
                <>Return <ChevronUp className="w-3.5 h-3.5" /></>
              ) : (
                <>View all ({projects.length}) <ChevronDown className="w-3.5 h-3.5" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
