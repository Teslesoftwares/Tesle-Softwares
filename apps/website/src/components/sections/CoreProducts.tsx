import { motion } from 'framer-motion';
import { Check, ArrowRight, Building2, Rocket, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';

const editions = [
  {
    icon: Rocket,
    name: 'Starter',
    price: 'Free',
    description: 'Essential modules for small teams to centralise operations and get started with Tesle.',
    features: ['Tesle CRM (up to 10 users)', 'Basic project management', 'Team collaboration', 'Mobile app', 'Community support', '1 GB storage'],
    cta: 'Get Started Free',
    to: '/pricing',
  },
  {
    icon: Building2,
    name: 'Business',
    price: '$19',
    description: 'Full platform access with AI-powered automation for growing organisations.',
    popular: true,
    features: ['All 12 modules', 'Up to 100 users', 'AI analytics & automation', 'Advanced dashboards', 'API & integrations', 'Priority support SLA'],
    cta: 'Start Free Trial',
    to: '/pricing',
  },
  {
    icon: Shield,
    name: 'Enterprise',
    price: 'Custom',
    description: 'Dedicated infrastructure, custom AI models, and enterprise-grade compliance.',
    features: ['Unlimited users & modules', 'Dedicated infrastructure', 'SSO/SAML & advanced security', 'Custom AI training', 'Dedicated success manager', '24/7 premium support'],
    cta: 'Contact Sales',
    to: '/contact',
  },
];

export default function CoreProducts() {
  return (
    <section id="products" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <SectionTitle
          label="Core Products"
          title="Three editions. One platform."
          subtitle="Choose the plan that fits your organisation. All editions share the same modern architecture  you only pay for scale and advanced capabilities."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mt-16 sm:mt-20 grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
        >
          {editions.map((edition, i) => {
            const Icon = edition.icon;
            return (
              <motion.div
                key={edition.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <GlassCard className={`relative p-6 sm:p-8 h-full ${edition.popular ? 'border-accent/30' : ''}`}>
                  {edition.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-black text-xs font-semibold">
                      Most Popular
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>

                  <h3 className="text-xl font-semibold text-text">{edition.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-text">{edition.price}</span>
                    {edition.price !== 'Free' && edition.price !== 'Custom' && (
                      <span className="text-muted text-sm">/month</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{edition.description}</p>

                  <ul className="mt-6 space-y-3">
                    {edition.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
                        <span className="text-muted">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Link to={edition.to}>
                      <Button variant={edition.popular ? 'primary' : 'outline'} className="w-full" icon={<ArrowRight className="w-4 h-4" />}>
                        {edition.cta}
                      </Button>
                    </Link>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
