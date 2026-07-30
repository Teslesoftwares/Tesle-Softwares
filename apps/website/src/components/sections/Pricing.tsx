import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'For small teams getting started with Tesle. Core modules with essential features to run your daily operations.',
    features: [
      'Tesle CRM with up to 10 users',
      'Basic project management',
      'Team collaboration tools',
      'Mobile app access',
      'Email & chat support',
      'Community access',
      '1 GB storage',
    ],
    cta: 'Get Started Free',
  },
  {
    name: 'Business',
    price: '$19',
    description: 'For growing organisations that need the full power of Tesle across departments with advanced AI capabilities.',
    features: [
      'All modules (ERP, CRM, HR, Financials, etc.)',
      'Up to 100 users',
      'AI-powered analytics & automation',
      'Advanced reporting & dashboards',
      'API access & integrations',
      'Custom branding',
      'Priority support SLA',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organisations with complex requirements, dedicated infrastructure, and enterprise-grade compliance needs.',
    features: [
      'Unlimited users & modules',
      'Dedicated infrastructure',
      'SSO/SAML & advanced security',
      'Custom AI model training',
      'Dedicated success manager',
      '24/7 premium support',
      'SLA guarantees',
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
          title="Enterprise software. Transparent pricing."
          subtitle="Start free, scale as you grow. No hidden fees, no surprise charges  just predictable SaaS pricing for businesses of every size."
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
                  ? 'border-2 border-accent/20 bg-accent/[0.03]'
                  : 'glass hover:glass-hover'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-black text-xs font-semibold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-text">{plan.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold text-text">
                    {plan.price}
                  </span>
                  {plan.price !== 'Free' && plan.price !== 'Custom' && (
                    <span className="text-muted text-sm">/month</span>
                  )}
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
