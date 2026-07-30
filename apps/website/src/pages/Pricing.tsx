import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
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
    href: '/contact',
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
    href: '/contact',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organisations with complex requirements, dedicated infrastructure, and enterprise-grade compliance.',
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
    href: '/enterprise',
  },
];

export default function Pricing() {
  return (
    <main>
      <SEO title="Pricing" description="Transparent pricing for businesses of every size. Start free, scale as you grow with Tesle's enterprise SaaS platform." />
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }} animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">Pricing</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Enterprise software.{' '}
              <span className="text-gradient">Transparent pricing.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Start free, scale as you grow. No hidden fees, no surprise charges  just predictable SaaS pricing for businesses of every size.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={cn(
                  'relative rounded-2xl p-6 sm:p-8 transition-all duration-500',
                  plan.popular
                    ? 'bg-gradient-to-b border-2 border-accent/20 bg-accent/[0.03]'
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
                    <span className="text-4xl sm:text-5xl font-bold text-text">{plan.price}</span>
                    {plan.price !== 'Free' && plan.price !== 'Custom' && <span className="text-muted text-sm">/user/month</span>}
                  </div>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={cn('w-4 h-4 mt-0.5 flex-shrink-0', plan.popular ? 'text-accent' : 'text-accent/70')} />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={plan.href}>
                  <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full" icon={plan.popular ? <ArrowRight className="w-4 h-4" /> : undefined}>
                    {plan.cta}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="relative pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Need something different?</h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-8">
              We offer custom plans for non-profits, educational institutions, and organisations with unique requirements.
            </p>
            <Link to="/contact"><Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>Talk to Sales</Button></Link>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
