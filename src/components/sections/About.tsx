import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { Lightbulb, Target, Rocket, HeartHandshake } from 'lucide-react';

const values = [
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description:
      'We stay ahead of the curve, leveraging emerging technologies to give our clients a competitive edge.',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description:
      'Every project is measured against clear KPIs. We don\'t just deliver — we deliver impact.',
  },
  {
    icon: Rocket,
    title: 'Agile & Scalable',
    description:
      'Our workflows adapt to your needs. From startups to enterprises, we scale with you.',
  },
  {
    icon: HeartHandshake,
    title: 'Partnership Mindset',
    description:
      'We treat your business like our own. Deep collaboration and transparency in everything we do.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="About Tesle"
          title="Where technology meets creativity"
          subtitle="We are a full-service digital agency built at the intersection of engineering excellence and creative vision. Since our founding, we have helped businesses across industries transform their digital presence and operations."
        />

        <div className="mt-16 sm:mt-20 grid md:grid-cols-2 gap-6 items-start">
          {/* Left: About text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="h-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                Our Story
              </h3>
              <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed">
                <p>
                  Tesle was born from a simple belief: that technology and
                  creativity are not opposing forces, but powerful allies. We
                  bring together engineers, designers, and strategists under one
                  roof to deliver solutions that are as beautiful as they are
                  functional.
                </p>
                <p>
                  From crafting high-performance web applications to building
                  complete brand identities, our team of 15+ specialists has
                  delivered 50+ projects across e-commerce, fintech, health,
                  media, and enterprise.
                </p>
                <p>
                  We don&apos;t just build products — we build partnerships. Every
                  engagement starts with deep listening and ends with measurable
                  results.
                </p>
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
                  <GlassCard className="h-full !p-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-purple/20 border border-white/[0.06] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="text-sm font-semibold text-white mb-2">
                      {value.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
