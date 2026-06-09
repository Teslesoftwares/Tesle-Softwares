import { motion } from 'framer-motion';
import { Search, PenTool, Code, Rocket } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Discover',
    description:
      'We dive deep into your goals, audience, and market to define a clear roadmap for success.',
  },
  {
    number: 2,
    icon: PenTool,
    title: 'Design',
    description:
      'Wireframes, prototypes, and visual designs that align your vision with user expectations.',
  },
  {
    number: 3,
    icon: Code,
    title: 'Develop',
    description:
      'Agile development with continuous testing ensures quality at every sprint milestone.',
  },
  {
    number: 4,
    icon: Rocket,
    title: 'Deliver',
    description:
      'Launch, monitor, and support — we ensure your product performs flawlessly in production.',
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Process"
          title="How we work"
          subtitle="A proven 4-step methodology that takes your project from idea to impact."
        />

        <div className="mt-16 sm:mt-20 relative">
          {/* Desktop: horizontal layout */}
          <div className="hidden md:flex items-start justify-between gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="flex-1 text-center relative"
                >
                  {i < steps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeInOut' as const, delay: 0.8 }}
                      className="absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/40 to-purple/40 origin-left"
                    />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-purple/20 border border-accent/20 flex items-center justify-center mx-auto mb-6 relative"
                  >
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-black text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <Icon className="w-7 h-7 text-accent" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.2, duration: 0.5 }}
                  className="flex gap-5"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-purple/20 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-gradient-to-b from-accent/30 to-transparent my-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-accent">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
