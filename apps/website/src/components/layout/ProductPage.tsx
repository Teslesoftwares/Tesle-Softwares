import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Star, ChevronDown, ChevronUp, Check, Plus } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { ProductData } from '@/data/products';
import { useInstalledApps } from '@/hooks/useInstalledApps';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const sectionBg = 'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent';

export function ProductPage({ product }: { product: ProductData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const { isInstalled, install, uninstall } = useInstalledApps();
  const installed = isInstalled(product.slug);
  const Icon = product.icon;

  return (
    <main className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
            style={{ background: `radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              <Icon className="w-4 h-4" />
              {product.name}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              {product.heroTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              {product.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => installed ? uninstall(product.slug) : install(product.slug)}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                  installed
                    ? 'bg-emerald-500 text-white hover:bg-red-500'
                    : 'bg-accent text-white hover:bg-accent-dark'
                }`}
              >
                {installed ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {installed ? 'Installed' : 'Install App'}
              </button>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ OVERVIEW ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeUp}>
                <SectionTitle
                  label="Overview"
                  title={product.overviewTitle}
                  align="left"
                />
                <p className="mt-6 text-base text-muted leading-relaxed max-w-xl">
                  {product.overview}
                </p>
              </motion.div>
              <motion.div {...fadeUp} className="grid grid-cols-2 gap-4">
                {[
                  { icon: product.icon, label: 'AI-Powered', desc: 'Intelligent automation built in' },
                  { icon: ArrowRight, label: 'Modular', desc: 'Start small, scale up' },
                  { icon: CheckCircle2, label: 'Integrated', desc: 'Works across all Tesle modules' },
                  { icon: Star, label: 'Enterprise', desc: 'SOC 2 compliant & secure' },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-2xl p-5 text-center border border-white/[0.04]">
                    <item.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                    <p className="text-sm font-semibold text-text">{item.label}</p>
                    <p className="text-xs text-muted mt-1">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ FEATURES ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Features"
              title={product.featuresTitle}
              subtitle={product.featuresSubtitle}
            />
            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {product.features.map((feature, i) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div key={feature.title} {...stagger} transition={{ delay: i * 0.06, duration: 0.5 }}>
                    <GlassCard className="h-full !p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                        <FeatureIcon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-base font-semibold text-text mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ MODULES ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Modules"
              title={product.modulesTitle}
              subtitle={product.modulesSubtitle}
            />
            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {product.modules.map((mod, i) => (
                <motion.div
                  key={mod.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className="glass rounded-2xl p-5 border border-white/[0.04] hover:border-accent/20 transition-all"
                >
                  <h3 className="text-base font-semibold text-text mb-2">{mod.name}</h3>
                  <p className="text-sm text-muted leading-relaxed">{mod.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ BENEFITS ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Benefits"
              title={product.benefitsTitle}
              subtitle={product.benefitsSubtitle}
            />
            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {product.benefits.map((benefit, i) => {
                const BenefitIcon = benefit.icon;
                return (
                  <motion.div key={benefit.title} {...stagger} transition={{ delay: i * 0.06, duration: 0.5 }}>
                    <GlassCard className="h-full !p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                        <BenefitIcon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-base font-semibold text-text mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ INTEGRATIONS ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Integrations"
              title={product.integrationsTitle}
              subtitle={product.integrationsSubtitle}
            />
            <div className="mt-16 sm:mt-20 max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {product.integrations.map((int) => (
                  <div
                    key={int.name}
                    className="px-4 py-2.5 rounded-xl glass border border-white/[0.04] hover:border-accent/20 transition-all"
                  >
                    <span className="text-sm text-white font-medium">{int.name}</span>
                    <span className="text-xs text-muted ml-2">({int.category})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ PRICING ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Pricing"
              title={product.pricingTitle}
              subtitle={product.pricingSubtitle}
            />
            <div className="mt-16 sm:mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { name: 'Starter', price: product.pricing.starter, desc: 'For small teams getting started', popular: false },
                { name: 'Business', price: product.pricing.business, desc: 'For growing organisations', popular: true },
                { name: 'Enterprise', price: product.pricing.enterprise, desc: 'For large organisations with custom needs', popular: false },
              ].map((plan) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative rounded-2xl p-6 transition-all duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-b border-2 border-accent/20 bg-accent/[0.03]'
                      : 'glass'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-black text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-text">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-text">{plan.price}</span>
                    {![product.pricing.starter, product.pricing.enterprise, 'Included', 'Free', 'Custom'].includes(plan.price) && (
                      <span className="text-muted text-sm">/user/mo</span>
                    )}
                    {plan.price === 'Included' && (
                      <span className="text-muted text-sm">in all plans</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-muted">{plan.desc}</p>
                  <div className="mt-6">
                    <Link to={plan.name === 'Enterprise' ? '/contact' : '/pricing'}>
                      <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ FAQ ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="FAQ"
              title="Frequently asked questions"
              subtitle={`Everything you need to know about ${product.name}.`}
            />
            <div className="mt-12 space-y-3">
              {product.faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="glass rounded-2xl border border-white/[0.04] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-text pr-4">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-accent flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ DEMO CTA ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Ready to get started with{' '}
                <span className="text-gradient">{product.name}</span>?
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                See {product.name} in action. Book a personalised demo with our product experts and
                discover how it can transform your operations.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" size="lg">
                    Explore All Products
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
