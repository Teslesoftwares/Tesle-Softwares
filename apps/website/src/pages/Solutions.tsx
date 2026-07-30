import { motion } from 'framer-motion';
import { Landmark, Briefcase, Users, Truck, Code2, Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const departments = [
  { icon: Landmark, title: 'Finance & Accounting', desc: 'Automate accounts payable/receivable, consolidate multi-entity financials, and get real-time cash flow visibility with AI-powered forecasting.' },
  { icon: Briefcase, title: 'Human Resources', desc: 'Streamline recruitment, onboarding, performance management, payroll, and compliance across multiple African markets from one dashboard.' },
  { icon: Users, title: 'Sales & Marketing', desc: 'AI-powered lead scoring, pipeline management, campaign tracking, and 360-degree customer views that help your team close deals faster.' },
  { icon: Truck, title: 'Operations & Supply Chain', desc: 'End-to-end visibility from procurement to last-mile delivery with AI demand forecasting and real-time inventory tracking.' },
  { icon: Code2, title: 'IT & Engineering', desc: 'Manage projects, track assets, automate workflows, and integrate Tesle with your existing tech stack through our API and webhooks.' },
  { icon: Building2, title: 'Executive Leadership', desc: 'Real-time dashboards, predictive analytics, and consolidated reporting across every department  giving leadership one source of truth.' },
];

export default function Solutions() {
  return (
    <main>
      <SEO title="Solutions" description="Tesle solutions for every department  finance, HR, sales, operations, IT, and executive leadership." />
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }} animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">Solutions</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Solutions for every{' '}
              <span className="text-gradient">department</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Tesle adapts to your workflow  whether you're in finance, HR, sales, operations, IT, or the C-suite.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {departments.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: i * 0.08, duration: 0.5 }}>
                  <GlassCard className="h-full !p-6 group hover:border-accent/20 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-text mb-2">{d.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{d.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="relative pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Not sure which solution fits?</h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-8">Book a discovery call and we'll map Tesle to your specific workflows and requirements.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>Book a Discovery Call</Button></Link>
              <Link to="/services"><Button variant="outline" size="lg">Explore Platform Modules</Button></Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
