import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { industries } from '@/data/industries';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Industries() {
  return (
    <main className="overflow-hidden">
      <SEO title="Industries" description="Tesle serves organisations across healthcare, education, construction, government, retail, manufacturing, hospitality, NGOs, churches, financial services, transportation, and real estate." />

      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Industries
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Built for every{' '}
              <span className="text-gradient">industry</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              Tesle serves organisations across 12 major industries  with configurable modules,
              pre-built compliance packages, and industry-specific workflows for each sector.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {industries.map((ind) => {
              const Icon = ind.icon;
              return (
                <motion.div key={ind.slug} variants={item}>
                  <Link to={`/industries/${ind.slug}`}>
                    <GlassCard className="h-full !p-6 group cursor-pointer hover:border-accent/20 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-text mb-1 group-hover:text-accent transition-colors">
                        {ind.name}
                      </h3>
                      <p className="text-xs text-accent/70 mb-3 font-medium">{ind.tagline}</p>
                      <p className="text-sm text-muted leading-relaxed">{ind.description}</p>
                      <div className="mt-4 flex items-center gap-1 text-xs text-accent font-medium">
                        Learn more <ArrowRight className="w-3 h-3" />
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Don't see your industry?</h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-8">
              Tesle is highly configurable and adapts to virtually any industry. Talk to our team about your specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>Talk to Sales</Button></Link>
              <Link to="/solutions"><Button variant="outline" size="lg">Explore Solutions</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
