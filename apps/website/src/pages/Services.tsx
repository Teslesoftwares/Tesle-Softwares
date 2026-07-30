import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getIcon } from '@/lib/iconMap';
import { SEO } from '@/components/layout/SEO';
import { StructuredData } from '@/components/layout/StructuredData';
import { serviceSchema } from '@/lib/structuredData';
import { services } from '@/data/services';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function Services() {
  const serviceList = services.map((s) => ({ title: s.title, description: s.shortDescription, slug: s.slug }));
  return (
    <main>
      <SEO title="Our Services" description="Explore Tesle's 12 enterprise software modules  ERP, CRM, HRM, Financials, Analytics, and more. One unified platform, purpose-built for African businesses." />
      <StructuredData data={serviceSchema(serviceList)} />
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Platform Modules
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              One Platform.{' '}
              <span className="text-gradient">Endless Possibilities.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              12 integrated enterprise modules that work together as one operating system  purpose-built for African businesses. Pick the modules you need, or run everything on Tesle.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {services.map((service) => {
              const IconComponent = getIcon(service.icon);
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <Link to={`/services/${service.slug}`} className="block h-full">
                    <GlassCard className="h-full group !p-5">
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} bg-opacity-20 border border-white/[0.08] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                      >
                        {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
                      </div>
                      <h3 className="text-base font-semibold text-text mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </GlassCard>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
              style={{
                background:
                  'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                Ready to Transform{' '}
                <span className="text-gradient">Your Business?</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                Book a demo and see how Tesle can unify your operations, automate workflows, and power your growth.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Book a Demo
                </Button>
                <Button variant="outline" size="lg">
                  Explore Case Studies
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
