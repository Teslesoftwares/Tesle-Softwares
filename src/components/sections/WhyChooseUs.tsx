import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import {
  Zap, Shield, Users, HeadphonesIcon, Gauge, Layers,
} from 'lucide-react';

const reasons = [
  {
    icon: Zap,
    title: 'Speed to Market',
    description:
      'Agile workflows and streamlined processes mean we deliver faster without compromising quality.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-grade security practices, GDPR compliance, and secure development lifecycle on every project.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description:
      'A consistent team of engineers, designers, and project managers who know your business inside out.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description:
      'Round-the-clock support with guaranteed response times and proactive monitoring for all clients.',
  },
  {
    icon: Gauge,
    title: 'Performance Optimized',
    description:
      'Every product we build is engineered for speed — targeting sub-second load times and 99.9% uptime.',
  },
  {
    icon: Layers,
    title: 'End-to-End Service',
    description:
      'From strategy and design to development, launch, and maintenance — we handle it all.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Why Choose Us"
          title="Built to outperform"
          subtitle="We combine deep technical expertise with creative vision to deliver results that matter."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <motion.div key={reason.title} variants={itemVariants}>
                <GlassCard className="h-full group !p-5">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-purple/20 border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {reason.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
