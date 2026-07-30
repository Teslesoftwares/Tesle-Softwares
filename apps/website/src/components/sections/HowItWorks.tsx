import { motion } from 'framer-motion';
import { Search, Settings, Shield, Rocket } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Discovery & Assessment',
    description:
      'Deep-dive workshops to map your business processes, pain points, and growth opportunities. We analyse your current tech stack and deliver a tailored implementation roadmap.',
  },
  {
    number: 2,
    icon: Settings,
    title: 'Configuration & Integration',
    description:
      'We configure Tesle modules to match your workflows, migrate your data, integrate with existing tools, and set up AI-powered automations  all with zero downtime.',
  },
  {
    number: 3,
    icon: Shield,
    title: 'Testing & Compliance',
    description:
      'Rigorous quality assurance, security auditing, and compliance validation. UAT sessions with your team ensure everything works your way before go-live.',
  },
  {
    number: 4,
    icon: Rocket,
    title: 'Go-Live & Optimisation',
    description:
      'Staged rollout across departments with hands-on training, real-time monitoring, and continuous optimisation. We don\'t just deploy  we partner with your team for ongoing success.',
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Deployment Process"
          title="From sign-up to go-live in weeks, not months"
          subtitle="A proven 4-phase deployment framework that gets your organisation up and running on Tesle with minimal disruption and maximum adoption."
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
                      className="absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent/40 to-accent/20 origin-left"
                    />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6 relative"
                  >
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-bg text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                    <Icon className="w-7 h-7 text-accent" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-text mb-3">
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
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
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
                    <h3 className="text-lg font-semibold text-text mb-2">
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
