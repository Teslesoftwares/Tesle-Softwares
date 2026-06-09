import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const plans = [
  {
    name: 'Starter',
    price: '$2,499',
    description: 'Ideal for startups and small businesses needing a strong digital foundation.',
    features: [
      '5-page website or landing page',
      'Responsive design',
      'Basic SEO setup',
      'Contact form integration',
      'Social media links',
      '1 round of revisions',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '$6,999',
    description: 'For established businesses ready to scale with a full digital presence.',
    features: [
      'Custom website or web app',
      'Mobile-responsive design',
      'Complete SEO strategy',
      'Brand identity package',
      'Content creation (5 pages)',
      '3 rounds of revisions',
      'Priority support',
    ],
    cta: 'Start a Project',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solutions for organizations with complex requirements.',
    features: [
      'Custom software development',
      'Mobile app (iOS + Android)',
      'Full branding & design system',
      'Dedicated project manager',
      'Ongoing maintenance & support',
      'SLA guarantee',
      'Business automation',
    ],
    cta: 'Contact Sales',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Pricing"
          title="Choose your plan"
          subtitle="Simple, transparent pricing designed to scale with your needs."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 sm:mt-20 grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={cn(
                'relative rounded-2xl p-6 sm:p-8 transition-all duration-500',
                plan.popular
                  ? 'bg-gradient-to-b from-accent/[0.08] via-purple/[0.05] to-card border border-accent/20 glow-accent'
                  : 'glass hover:glass-hover'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-black text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-muted text-sm">/month</span>
                </div>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className={cn(
                        'w-4 h-4 mt-0.5 flex-shrink-0',
                        plan.popular ? 'text-accent' : 'text-accent/70'
                      )}
                    />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
                icon={plan.popular ? <ArrowRight className="w-4 h-4" /> : undefined}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
