import { motion } from 'framer-motion';
import { Cpu, Globe, Shield, Gauge, Layers, Headphones, Check, ArrowUpRight } from 'lucide-react';
import { useCountUp } from '@/hooks/useCountUp';

const reasons = [
  { icon: Cpu, title: 'AI-Native Architecture', description: 'Built from the ground up with AI at its core  delivering intelligent automation, predictive insights, and natural language interfaces across every module.' },
  { icon: Globe, title: 'Built for Africa', description: 'Purpose-built for multi-currency, multi-country, and mobile-first operations. Pre-configured for local tax regimes and banking integrations across 15+ African markets.' },
  { icon: Shield, title: 'Enterprise Security', description: 'SOC 2-compliant with end-to-end encryption, SSO/SAML, RBAC, audit trails, and data residency options for regulated industries.' },
  { icon: Gauge, title: '99.9% Uptime SLA', description: 'Multi-region redundancy, automated failover, and 24/7 monitoring. Your business never stops running on Tesle.' },
  { icon: Layers, title: 'One Unified Platform', description: 'Replace 10+ disconnected tools with one integrated system. All sharing the same data, workflows, and user experience.' },
  { icon: Headphones, title: 'Enterprise-Grade Support', description: 'Dedicated success managers, implementation specialists, and 24/7 technical support. We partner with your team for the long haul.' },
];

const stats = [
  { value: 50, suffix: 'K+', label: 'Active Users' },
  { value: 200, suffix: '+', label: 'Organizations' },
  { value: 15, suffix: '+', label: 'African Markets' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA' },
];

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, displayed } = useCountUp(value, 2, '');
  return (
    <div ref={ref} className="text-center">
      <div className="heading text-3xl sm:text-4xl text-accent">
        {displayed}
        <span className="text-accent">{suffix}</span>
      </div>
      <p className="text-sm text-muted mt-1">{label}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            Why Tesle
          </span>
          <h2 className="heading text-3xl sm:text-4xl md:text-5xl text-text leading-tight">
            Enterprise software,{' '}
            <span className="text-gradient">engineered for Africa</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            We&apos;re not building another SaaS tool. We&apos;re building the operating system that powers Africa&apos;s most ambitious organisations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            >
              <StatCard {...stat} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
        >
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className="group relative p-5 rounded-2xl card hover:card-hover transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-text mb-1.5">{reason.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
