import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { IndustryData } from '@/data/industries';

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

export function IndustryPage({ industry }: { industry: IndustryData }) {
  const Icon = industry.icon;

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
              {industry.name}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              {industry.heroTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              {industry.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Book a Demo
                </Button>
              </Link>
              <Link to="/industries">
                <Button variant="outline" size="lg">
                  View All Industries
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ CHALLENGES ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div {...fadeUp}>
                <SectionTitle
                  label="Challenges"
                  title={`${industry.name} challenges we solve`}
                  subtitle="Organisations in the industry face common obstacles that Tesle is purpose-built to address."
                  align="left"
                />
              </motion.div>
              <motion.div {...fadeUp} className="space-y-4">
                {industry.challenges.map((challenge, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-4 p-4 rounded-xl glass border border-white/[0.04]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-red-400 text-sm font-bold">{i + 1}</span>
                    </div>
                    <p className="text-sm text-muted leading-relaxed pt-1">{challenge}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ SOLUTIONS ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Solutions"
              title="Tesle solutions for your industry"
              subtitle="Each solution is purpose-built for the unique needs of your industry."
            />
            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {industry.solutions.map((solution, i) => {
                const SolutionIcon = solution.icon;
                return (
                  <motion.div key={solution.title} {...stagger} transition={{ delay: i * 0.06, duration: 0.5 }}>
                    <GlassCard className="h-full !p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                        <SolutionIcon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-base font-semibold text-text mb-2">{solution.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{solution.description}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ RELEVANT PRODUCTS ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Products"
              title="Tesle products for your industry"
              subtitle="These Tesle products work together to address the full range of challenges in your industry."
            />
            <div className="mt-16 sm:mt-20 max-w-3xl mx-auto">
              <div className="flex flex-wrap justify-center gap-3">
                {industry.relevantProducts.map((product) => (
                  <Link key={product.slug} to={`/products/${product.slug}`}>
                    <div className="px-5 py-3 rounded-xl glass border border-white/[0.04] hover:border-accent/20 hover:glass transition-all group cursor-pointer">
                      <span className="text-sm text-white font-medium group-hover:text-accent transition-colors">{product.name}</span>
                      <ArrowRight className="w-3 h-3 inline ml-2 text-accent opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ CASE STUDY ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Case Study"
              title={industry.caseStudy.title}
            />
            <div className="mt-16 sm:mt-20 grid lg:grid-cols-2 gap-8 items-start">
              <motion.div {...fadeUp} className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-accent border border-accent/20">
                  <Star className="w-3 h-3" />
                  Client Results
                </div>
                <div className="space-y-3">
                  {industry.caseStudy.results.map((result, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{result}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeUp} className="glass rounded-2xl p-6 sm:p-8 border border-accent/10 relative">
                <Quote className="w-8 h-8 text-accent/20 absolute top-4 left-4" />
                <blockquote className="relative z-10 text-base sm:text-lg text-muted leading-relaxed italic mt-4">
                  &ldquo;{industry.caseStudy.quote}&rdquo;
                </blockquote>
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <p className="text-sm font-semibold text-text">{industry.caseStudy.author}</p>
                  <p className="text-xs text-muted">{industry.caseStudy.role}</p>
                </div>
                <p className="mt-4 text-sm text-accent font-medium">{industry.caseStudy.company}</p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ DEMO CTA ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Ready to transform your{' '}
                <span className="text-gradient">{industry.name}</span>{' '}
                operations?
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                See how Tesle can solve the unique challenges of your industry. Book a
                personalised demo with our industry specialists.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/industries">
                  <Button variant="outline" size="lg">
                    Explore All Industries
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
