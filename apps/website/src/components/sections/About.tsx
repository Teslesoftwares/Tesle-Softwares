import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { ExpandableCard } from '@/components/ui/ExpandableCard';
import {
  Lightbulb, Target, Rocket, HeartHandshake,
  Search, Palette, Code2, TrendingUp,
  Sparkles, BarChart3, Users, Globe, Layers,
} from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We stay ahead of the curve, leveraging emerging technologies to give our clients a competitive edge.',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'Every project is measured against clear KPIs. We don\'t just deliver  we deliver impact.',
  },
  {
    icon: Rocket,
    title: 'Agile & Scalable',
    description: 'Our workflows adapt to your needs. From startups to enterprises, we scale with you.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnership Mindset',
    description: 'We treat your business like our own. Deep collaboration and transparency in everything we do.',
  },
];

const stats = [
  { value: 50, suffix: 'K+', label: 'Users on Platform', icon: Sparkles },
  { value: 12, suffix: '', label: 'Enterprise Modules', icon: Layers },
  { value: 99.9, suffix: '%', label: 'Platform Uptime', icon: BarChart3 },
  { value: 15, suffix: '+', label: 'Countries Deployed', icon: Globe },
] as const;

const steps = [
  { num: '01', icon: Search, title: 'Discover', description: 'We dive deep into your vision, market, and users to uncover opportunities.' },
  { num: '02', icon: Palette, title: 'Design', description: 'We craft intuitive experiences that blend beauty with purpose.' },
  { num: '03', icon: Code2, title: 'Build', description: 'We engineer robust, scalable solutions using modern technologies.' },
  { num: '04', icon: TrendingUp, title: 'Scale', description: 'We optimize, deploy, and evolve to ensure long-term growth.' },
];

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const duration = 1500;
          const start = performance.now();
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-10 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <SectionTitle
          label="About Tesle"
          title="The OS for African Business"
          subtitle="We are building the AI-native operating system that powers Africa's most ambitious organisations  replacing fragmented legacy systems with one unified enterprise platform."
        />

        <div className="mt-16 sm:mt-20 grid md:grid-cols-2 gap-6 items-start">
          {/* Left: About text + stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="h-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-text mb-4">
                Our Story
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed">
                <p>
                  Tesle is building the definitive operating system for African
                  business. Where legacy enterprise software was designed for
                  Western markets and bolted onto African operations, Tesle is
                  engineered from the ground up for Africa's unique business
                  environment  multi-currency, multi-country, mobile-first,
                  and AI-native.
                </p>
                <p>
                  Our unified platform replaces the fragmentation of 10+
                  disconnected tools with one integrated system: ERP, CRM, HR,
                  financial management, payroll, analytics, project management,
                  inventory, customer support, and collaboration  all powered
                  by artificial intelligence. Today, over 50,000 users across
                  200+ organisations in 15 African countries run their business
                  on Tesle.
                </p>
              </div>

              {/* Stats row */}
              <div className="mt-6 grid grid-cols-4 gap-3">
                {stats.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.label} className="text-center p-3 rounded-xl glass">
                      <Icon className="w-4 h-4 text-accent/60 mx-auto mb-1.5" />
                      <div className="text-lg sm:text-xl font-bold text-text tabular-nums">
                        <AnimatedCounter target={s.value} suffix={s.suffix} />
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted mt-0.5 leading-tight">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </motion.div>

          {/* Right: Values */}
          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <ExpandableCard className="!p-5 border border-white/[0.04] hover:border-accent/20 transition-all duration-300" maxHeight={200}>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/10 transition-all duration-300">
                      <Icon className="w-5 h-5 text-accent group-hover:text-text transition-colors duration-300" />
                    </div>
                    <h4 className="text-sm font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </ExpandableCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* How We Work Process */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-3 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              How We Work
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-text">
              From implementation to impact  our enterprise deployment framework
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                  >
                    <ExpandableCard className="!p-4 sm:!p-6" maxHeight={220}>
                      <div className="relative mb-3 sm:mb-4">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/15 to-accent/5 border border-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-5 sm:w-7 h-5 sm:h-7 text-accent" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 text-[9px] sm:text-[10px] font-bold text-accent/60 bg-bg px-1 sm:px-1.5 py-0.5 rounded-full border border-white/[0.06]">
                          {step.num}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-semibold text-text mb-1">{step.title}</h4>
                      <p className="text-[11px] sm:text-sm text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </ExpandableCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
      </div>
    </section>
  );
}
