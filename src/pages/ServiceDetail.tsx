import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2, ArrowLeft } from 'lucide-react';
import { getIcon } from '@/lib/iconMap';
import { SEO } from '@/components/layout/SEO';
import { StructuredData } from '@/components/layout/StructuredData';
import { breadcrumbSchema } from '@/lib/structuredData';
import { services } from '@/data/services';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import bgSrc from '@/assets/Images/Background.webp';
import softwareBgSrc from '@/assets/Images/software.webp';

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <SEO title="Service Not Found" noIndex />
        <div className="text-center">
          <p className="text-muted">Service not found.</p>
          <Link to="/services" className="text-accent hover:underline mt-2 inline-block">Back to services</Link>
        </div>
      </main>
    );
  }

  const IconComponent = getIcon(service.icon);

  const breadcrumbs = [
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  return (
    <main>
      <SEO title={service.title} description={service.shortDescription} />
      <StructuredData data={breadcrumbSchema(breadcrumbs)} />
      {/* Hero */}
      <section className="relative min-h-[80vh] sm:min-h-screen flex items-center overflow-hidden">
        {/* Background image — custom per service or default hero bg */}
        <div className="absolute inset-0">
          <img src={service.slug === 'software-development' ? softwareBgSrc : bgSrc} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg/80" />

        {/* Service color accent overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-[0.06] mix-blend-overlay`} />

        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-32 sm:py-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back link */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-10 sm:mb-12 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              All Services
            </Link>

            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                style={{ boxShadow: `0 0 40px ${service.color.includes('cyan') || service.color.includes('teal') || service.color.includes('emerald') ? 'rgba(0,229,255,0.15)' : 'rgba(139,92,246,0.15)'}` }}
              >
                {IconComponent && <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-white" />}
              </motion.div>

              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xs font-semibold tracking-widest uppercase text-accent mb-3"
                >
                  Our Service
                </motion.div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                  {service.title}
                </h1>
                <p className="mt-5 text-base sm:text-lg md:text-xl text-muted max-w-3xl leading-relaxed">
                  {service.fullDescription}
                </p>

                {/* Quick stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-6 sm:gap-8 mt-8 sm:mt-10"
                >
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{service.features.length}</div>
                    <div className="text-xs text-muted mt-1">Features</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{service.benefits.length}</div>
                    <div className="text-xs text-muted mt-1">Benefits</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{service.process.length}</div>
                    <div className="text-xs text-muted mt-1">Steps</div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{service.technologies.length}</div>
                    <div className="text-xs text-muted mt-1">Technologies</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
      </section>

      {/* Features */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">
              What's Included
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {service.features.map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-muted">{feature}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">
              Why Choose This Service
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit, i) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <GlassCard className="h-full !p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Process */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection delay={0.2}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">
              Our Process
            </h2>
            <div className="relative">
              <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent to-purple hidden sm:block" />
              <div className="space-y-8">
                {service.process.map((step, i) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="relative flex items-start gap-6"
                  >
                    <div className={`w-[46px] h-[46px] rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                      {step.step}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-semibold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Technologies */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <AnimatedSection delay={0.3}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-10">
              Technologies We Use
            </h2>
            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-white/[0.04] border border-white/[0.08] text-muted hover:text-white hover:border-white/20 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="relative pb-16 sm:pb-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <AnimatedSection delay={0.4}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {service.faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="glass rounded-2xl overflow-hidden border border-white/[0.06]"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-medium hover:bg-white/[0.02] transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform duration-300 ${
                          openFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === i ? 'auto' : 0,
                        opacity: openFaq === i ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-4 text-sm text-muted leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection delay={0.1}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Ready to Transform Your{' '}
              <span className="text-gradient">{service.title}?</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Let's discuss your project and create a tailored solution that drives results.
              Book a free consultation today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Book a Free Consultation
              </Button>
              <Link to="/services">
                <Button variant="outline" size="lg">
                  Explore Other Services
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
