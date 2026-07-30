import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Globe, Headphones, Code2, DollarSign,
  HeartPulse, GraduationCap, Building2, Factory, HardHat, Hotel,
  Truck, Church, Home as HomeIcon,
} from 'lucide-react';

const industries = [
  { name: 'Healthcare', icon: HeartPulse, slug: 'healthcare' },
  { name: 'Education', icon: GraduationCap, slug: 'education' },
  { name: 'Financial Services', icon: Building2, slug: 'financial-services' },
  { name: 'Manufacturing', icon: Factory, slug: 'manufacturing' },
  { name: 'Construction', icon: HardHat, slug: 'construction' },
  { name: 'Hospitality', icon: Hotel, slug: 'hospitality' },
  { name: 'Transportation', icon: Truck, slug: 'transportation' },
  { name: 'Churches', icon: Church, slug: 'churches' },
];

const features = [
  { icon: Shield, title: 'SOC 2 Compliant', desc: 'Enterprise-grade security' },
  { icon: Zap, title: 'AI-Powered', desc: 'Intelligent automation' },
  { icon: Globe, title: '15+ Markets', desc: 'Built for Africa' },
  { icon: Headphones, title: '24/7 Support', desc: 'Premium & community' },
  { icon: Code2, title: 'API & Integrations', desc: '100+ connectors' },
  { icon: DollarSign, title: 'Free Tier', desc: 'Start at $0/month' },
];

const pricingTiers = [
  { name: 'Starter', price: 'Free', desc: 'Essential modules for small teams', cta: 'Get Started', highlight: false },
  { name: 'Business', price: '$19/mo', desc: 'Full platform with AI for growing orgs', cta: 'Start Trial', highlight: true },
  { name: 'Enterprise', price: 'Custom', desc: 'Dedicated infra & custom AI models', cta: 'Contact Sales', highlight: false },
];

export function QuickSections() {
  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* Industries */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="heading text-xl sm:text-2xl text-text">Industry Solutions</h2>
              <p className="text-sm text-muted mt-1">Vertical solutions built for your sector</p>
            </div>
            <Link to="/industries" className="text-sm font-semibold text-accent hover:text-accent/80 flex items-center gap-1 transition-colors">
              All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-surface border border-glass hover:border-accent/20 hover:shadow-md transition-all text-center"
                  >
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="text-[11px] font-medium text-text leading-tight">{ind.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          <div className="text-center mb-8">
            <h2 className="heading text-xl sm:text-2xl text-text">Why <span className="text-gradient">Tesle</span>?</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex flex-col items-center text-center p-4 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm font-semibold text-text">{f.title}</span>
                  <span className="text-xs text-muted mt-0.5">{f.desc}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="heading text-xl sm:text-2xl text-text">Simple Pricing</h2>
              <p className="text-sm text-muted mt-1">Start free, scale as you grow</p>
            </div>
            <Link to="/pricing" className="text-sm font-semibold text-accent hover:text-accent/80 flex items-center gap-1 transition-colors">
              Compare plans <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative p-5 rounded-2xl border transition-all ${
                  tier.highlight
                    ? 'bg-accent/5 border-accent/30 shadow-lg shadow-accent/5'
                    : 'bg-surface border-glass hover:border-accent/10'
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-0.5 rounded-full bg-accent text-white">
                    Most Popular
                  </span>
                )}
                <h3 className="text-sm font-semibold text-text">{tier.name}</h3>
                <div className="mt-2 text-2xl font-bold text-text">{tier.price}</div>
                <p className="mt-1 text-xs text-muted">{tier.desc}</p>
                <Link
                  to={tier.name === 'Enterprise' ? '/enterprise' : '/contact'}
                  className={`mt-4 block w-full text-center py-2 rounded-xl text-sm font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'border border-glass text-text hover:border-accent/20'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-accent/5 via-accent/[0.02] to-transparent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <h2 className="heading text-2xl sm:text-3xl text-text">
            Ready to get started?
          </h2>
          <p className="mt-3 text-sm text-muted max-w-lg mx-auto">
            Join 50,000+ users across 15+ African markets. Start free  no credit card required.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="px-6 py-2.5 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors">
              Get Started Free
            </Link>
            <Link to="/enterprise" className="px-6 py-2.5 border border-glass rounded-xl text-sm font-semibold text-text hover:border-accent/20 transition-colors">
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
