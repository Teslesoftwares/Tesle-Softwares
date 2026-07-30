import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Brain, ArrowRight, Zap, Globe, BarChart3, Shield, Users, Layers,
  Sparkles, CheckCircle2, Star, ChevronDown, ChevronUp, Bot,
  MessageSquare, BookOpen, TrendingUp, Cpu, BrainCircuit,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MascotCompanion } from '@/components/ui/MascotCompanion';
import { getProductBySlug } from '@/data/products';

const EYE_LEFT = { x: 35.5, y: 43 };
const EYE_RIGHT = { x: 65.6, y: 43 };

function HeroBlinkEyes({ blink }: { blink: boolean }) {
  const glow = '10px';
  const eyeBase: React.CSSProperties = {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    translate: '-50% -50%',
    background: 'radial-gradient(circle at 35% 30%, #fff 0%, rgba(34,211,238,0.9) 35%, rgba(34,211,238,0.3) 70%, transparent 100%)',
    boxShadow: `0 0 ${glow} rgba(34,211,238,0.6), 0 0 ${parseInt(glow) * 2}px rgba(34,211,238,0.2)`,
  };

  return (
    <>
      <motion.div
        style={{ ...eyeBase, left: `${EYE_LEFT.x}%`, top: `${EYE_LEFT.y}%` }}
        animate={blink ? { scaleY: [1, 0.05, 0.05, 1], scaleX: [1, 1.2, 1.2, 1] } : {}}
        transition={{ duration: 0.22, times: [0, 0.1, 0.7, 1] }}
      />
      <motion.div
        style={{ ...eyeBase, left: `${EYE_RIGHT.x}%`, top: `${EYE_RIGHT.y}%` }}
        animate={blink ? { scaleY: [1, 0.05, 0.05, 1], scaleX: [1, 1.2, 1.2, 1] } : {}}
        transition={{ duration: 0.22, times: [0, 0.1, 0.7, 1] }}
      />
      {blink && (
        <>
          <motion.div
            className="absolute rounded-full bg-cyan-300/30 blur-xl pointer-events-none"
            style={{ left: `${EYE_LEFT.x}%`, top: `${EYE_LEFT.y}%`, width: '50px', height: '50px', translate: '-50% -50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute rounded-full bg-cyan-300/30 blur-xl pointer-events-none"
            style={{ left: `${EYE_RIGHT.x}%`, top: `${EYE_RIGHT.y}%`, width: '50px', height: '50px', translate: '-50% -50%' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.4 }}
          />
        </>
      )}
    </>
  );
}

const features = [
  { icon: Brain, title: 'Predictive Analytics', description: 'Demand forecasting, cash flow prediction, sales forecasting, and attrition risk scoring trained on your data.' },
  { icon: MessageSquare, title: 'Natural Language Processing', description: 'Ask questions in plain English and get answers. Sentiment analysis and AI-powered document understanding.' },
  { icon: Zap, title: 'Intelligent Automation', description: 'Auto-categorise transactions, route support tickets, match invoices to POs, and generate journal entries.' },
  { icon: Shield, title: 'Anomaly Detection', description: 'Unusual patterns in financial transactions, inventory discrepancies, and operational anomalies surfaced proactively.' },
  { icon: TrendingUp, title: 'Recommendation Engine', description: 'Next-best-action for sales reps, product recommendations, and learning recommendations for employees.' },
  { icon: BrainCircuit, title: 'Custom Model Training', description: 'Train proprietary models on your data. Private, isolated, and deployed in your environment with full MLOps.' },
];

const orbitItems = [
  { icon: Brain, label: 'Predictions', angle: 0 },
  { icon: Bot, label: 'Automation', angle: 60 },
  { icon: BarChart3, label: 'Analytics', angle: 120 },
  { icon: Shield, label: 'Security', angle: 180 },
  { icon: Globe, label: 'Global', angle: 240 },
  { icon: Sparkles, label: 'AI Models', angle: 300 },
];

export default function TesleAI() {
  const product = getProductBySlug('ai');
  const [blink, setBlink] = useState(false);
  const blinkRef = useRef<ReturnType<typeof setTimeout>>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      blinkRef.current = setTimeout(() => setBlink(false), 220);
    }, 3000 + Math.random() * 2000);
    return () => {
      clearInterval(interval);
      if (blinkRef.current) clearTimeout(blinkRef.current);
    };
  }, []);

  if (!product) return null;

  return (
    <main className="overflow-hidden">
      <MascotCompanion />

      {/* ============ HERO ============ */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden min-h-[85vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 60%)' }}
            animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 60%)' }}
            animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.05, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                <Brain className="w-4 h-4" />
                Tesle AI
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
                AI that works{' '}
                <span className="text-gradient">across your</span>
                <br />
                entire business
              </h1>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                The shared intelligence layer that powers every Tesle product. Predictions, NLP, automation, anomaly detection, and custom model training  unified in one engine.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-8">
                {[
                  { value: '50K+', label: 'Users' },
                  { value: '12', label: 'Modules' },
                  { value: '99.9%', label: 'Uptime' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl sm:text-2xl font-bold text-gradient">{stat.value}</div>
                    <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Mascot with orbits */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              {/* Glow ring */}
              <div className="absolute w-[480px] h-[480px] sm:w-[600px] sm:h-[600px] rounded-full border border-accent/10" />
              <div className="absolute w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] rounded-full border border-cyan-400/10" />

              {/* Orbit items */}
              {orbitItems.map((item, i) => {
                const radius = 240;
                const angle = (item.angle * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                  <motion.div
                    key={item.label}
                    className="absolute glass rounded-xl px-3 py-2 border border-white/[0.06] flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.4, type: 'spring' }}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                  >
                    <item.icon className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium text-text whitespace-nowrap">{item.label}</span>
                  </motion.div>
                );
              })}

              {/* Mascot */}
              <motion.div
                className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/15 via-accent/10 to-transparent blur-2xl" />
                <img
                  src="/mascot.png"
                  alt="Tesle AI"
                  className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                />
                <HeroBlinkEyes blink={blink} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Capabilities"
              title="Everything you need to scale with AI"
              subtitle="Production-grade ML capabilities available to every Tesle module."
            />
            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                >
                  <GlassCard className="h-full !p-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-base font-semibold text-text mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ OVERVIEW ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <SectionTitle label="Overview" title={product.overviewTitle} align="left" />
                <p className="mt-6 text-base text-muted leading-relaxed max-w-xl">
                  {product.overview}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: Brain, label: 'AI-Powered', desc: 'Intelligent automation built in' },
                  { icon: Layers, label: 'Modular', desc: 'Start small, scale up' },
                  { icon: CheckCircle2, label: 'Integrated', desc: 'Works across all Tesle modules' },
                  { icon: Star, label: 'Enterprise', desc: 'SOC 2 compliant & secure' },
                ].map((item) => (
                  <div key={item.label} className="glass rounded-2xl p-5 text-center">
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

      {/* ============ MODULES ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
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

      {/* ============ FAQ ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32 bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SectionTitle label="FAQ" title="Frequently asked questions" subtitle="Everything you need to know about Tesle AI." />
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

      {/* ============ CTA ============ */}
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
                <span className="text-gradient">Tesle AI</span>?
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                See Tesle AI in action. Book a personalised demo with our product experts and
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
