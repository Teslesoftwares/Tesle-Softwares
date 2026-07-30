import { motion } from 'framer-motion';

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ label, title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 rounded-md border border-accent/20 bg-accent/5">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
