import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';

const stats = [
  { value: 50, suffix: 'K+', label: 'Active Users', desc: 'Running their business on Tesle daily' },
  { value: 200, suffix: '+', label: 'Organizations', desc: 'From SMEs to multinational enterprises' },
  { value: 15, suffix: '+', label: 'Countries', desc: 'Deployed across African markets' },
  { value: 12, suffix: '', label: 'Enterprise Modules', desc: 'One unified, AI-powered platform' },
];

function StatCard({ value, suffix, label, desc, index }: { value: number; suffix: string; label: string; desc: string; index: number }) {
  const { ref, displayed } = useCountUp(value, 2, '');

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="text-center group relative"
    >
      <div className="relative inline-block">
        <motion.div
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gradient"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: index * 0.1 }}
        >
          {displayed}
          <span className="text-accent">{suffix}</span>
        </motion.div>
        <motion.div
          className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 70%)',
          }}
        />
      </div>
      <p className="mt-2 text-sm sm:text-base text-text font-medium">{label}</p>
      <p className="mt-1 text-xs text-muted max-w-[180px] mx-auto">{desc}</p>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={ref} className="relative py-10 sm:py-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.02] via-accent/[0.02] to-transparent" />
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,0,0.2) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-60 h-60 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div style={{ scale, opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent origin-left"
        />
      </motion.div>
    </section>
  );
}
