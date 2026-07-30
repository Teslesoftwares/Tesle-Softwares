import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { ParticleField } from '@/components/ui/ParticleField';

interface Slide {
  id: number;
  tag: string;
  headline: string[];
  description: string;
  primaryCta: string;
  primaryCtaLink: string;
  secondaryCta: string;
  secondaryCtaLink: string;
  subtext?: string;
  stats: { value: string; label: string }[];
  modules?: string[];
  bg: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bg: '/images/slides/slide-1.png',
    tag: "Africa's Enterprise Software Platform",
    headline: ['One Platform to', 'Replace All Software'],
    description:
      'Save money. Run procurement, HR, finance, CRM, and more from one platform.\nSave time. AI-powered automation across every department.\nGrow faster. 15+ integrated enterprise modules designed for Africa.',
    primaryCta: 'Explore Platform',
    primaryCtaLink: '/create-account',
    secondaryCta: "It's FREE",
    secondaryCtaLink: '/create-account',
    subtext: 'Free forever. No credit card.',
    stats: [
      { value: '50K+', label: 'Active Users' },
      { value: '200+', label: 'Organizations' },
      { value: '15+', label: 'African Markets' },
      { value: '12', label: 'Enterprise Modules' },
    ],
    modules: ['ERP', 'CRM', 'HR', 'Accounting', 'Payroll', 'Inventory', 'Logistics', 'Procurement', 'POS', 'School', 'Hospital', 'AI'],
  },
  {
    id: 2,
    bg: '/images/slides/slide-2.png',
    tag: 'Creative & Brand Identity',
    headline: ['Branding That', 'Commands Attention'],
    description:
      'Build a powerful brand identity that resonates with your audience and stands out in the market.\nFrom logo design to full brand guidelines, we craft visual systems that tell your story.\nConsistent brand experiences across every touchpoint  digital, print, and physical.',
    primaryCta: 'View Our Work',
    primaryCtaLink: '/create-account',
    secondaryCta: 'Get a Quote',
    secondaryCtaLink: '/create-account',
    subtext: 'Trusted by 200+ brands across Africa.',
    stats: [
      { value: '200+', label: 'Brands Built' },
      { value: '95%', label: 'Client Retention' },
      { value: '50+', label: 'Industries' },
      { value: '4.9/5', label: 'Client Rating' },
    ],
    modules: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Brand Strategy', 'Rebranding'],
  },
  {
    id: 3,
    bg: '/images/slides/slide-3.png',
    tag: 'Performance Marketing',
    headline: ['Digital Marketing', 'That Drives Results'],
    description:
      'Data-driven campaigns across Google, Meta, LinkedIn, and TikTok that maximize your ROI.\nSEO, PPC, email marketing, and conversion optimization  all under one roof.\nReal-time analytics and transparent reporting so you see exactly where your budget goes.',
    primaryCta: 'See Results',
    primaryCtaLink: '/create-account',
    secondaryCta: 'Free Audit',
    secondaryCtaLink: '/create-account',
    subtext: 'Average 4x return on ad spend.',
    stats: [
      { value: '4x', label: 'Average ROAS' },
      { value: '500K+', label: 'Leads Generated' },
      { value: '30%', label: 'Lower CPA' },
      { value: '98%', label: 'Client Satisfaction' },
    ],
    modules: ['SEO', 'Google Ads', 'Meta Ads', 'Email Marketing', 'CRO'],
  },
  {
    id: 4,
    bg: '/images/slides/slide-4.png',
    tag: 'Social Media Growth',
    headline: ['Social Media', 'Management & Growth'],
    description:
      'End-to-end social media management  content creation, scheduling, community management, and analytics.\nGrow your audience organically with strategic content calendars and trend-jacking.\nReal-time engagement monitoring and crisis management to protect your brand reputation.',
    primaryCta: 'Grow Your Audience',
    primaryCtaLink: '/create-account',
    secondaryCta: 'Case Studies',
    secondaryCtaLink: '/create-account',
    subtext: 'Managing 100+ social accounts across platforms.',
    stats: [
      { value: '1M+', label: 'Followers Managed' },
      { value: '100+', label: 'Accounts Managed' },
      { value: '5x', label: 'Engagement Growth' },
      { value: '24/7', label: 'Community Monitoring' },
    ],
    modules: ['Content Creation', 'Scheduling', 'Community Mgmt', 'Analytics', 'Paid Social'],
  },
  {
    id: 5,
    bg: '/images/slides/slide-5.png',
    tag: 'Artificial Intelligence',
    headline: ['AI Solutions', 'Built for Business'],
    description:
      'Custom AI agents, chatbots, and automation tools trained on your business data.\nPredictive analytics, intelligent document processing, and natural language interfaces.\nIntegrate AI into your existing workflows  no PhD required.',
    primaryCta: 'Explore AI',
    primaryCtaLink: '/create-account',
    secondaryCta: 'Book Demo',
    secondaryCtaLink: '/create-account',
    subtext: 'Powering 50+ businesses with AI.',
    stats: [
      { value: '50+', label: 'AI Deployments' },
      { value: '80%', label: 'Time Saved' },
      { value: '24/7', label: 'AI Operations' },
      { value: '10x', label: 'Productivity Gain' },
    ],
    modules: ['AI Chatbots', 'Predictive Analytics', 'Doc Processing', 'Automation', 'Custom AI'],
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const goTo = useCallback((index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 6000);
  };

  const slide = slides[current];

  return (
    <section
      className="relative min-h-full flex items-center justify-center"
    >
      <ParticleField count={80} color="255, 107, 0" speed={0.3} />

      {/* Slide Background Images */}
      <AnimatePresence mode="sync">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slide.bg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/70 sm:from-black/75 sm:via-black/40 sm:to-black/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-black/60 sm:from-black/45 sm:via-transparent sm:to-black/45" />
        </motion.div>
      </AnimatePresence>

      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.03] via-purple/[0.02] to-transparent" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)' }}
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -20, 0], scale: [1, 0.9, 1.05, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.04) 0%, transparent 70%)' }}
          animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>


      {/* Vertical Pagination - Right Side */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetTimer(); }}
          >
            <span
              className={`block rounded-full transition-all duration-500 ${
                i === current
                  ? 'w-1 h-8 bg-accent'
                  : 'w-1 h-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Slide Content */}
      <motion.div className="relative z-10 w-full h-full flex items-start pt-4 sm:pt-6">
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-16 text-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={slide.id}
              custom={direction}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Pill badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.08] text-xs font-semibold tracking-wide uppercase text-white mb-5 border border-white/25"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {slide.tag}
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1] text-white"
              >
                <span style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 6px rgba(0,0,0,0.4)' }}>{slide.headline[0]}</span><br />
                <span className="text-gradient">{slide.headline[1]}</span>
              </motion.h1>

              {/* Description with bullets */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-5 sm:mt-6 text-sm sm:text-base text-white/80 max-w-3xl mx-auto leading-relaxed space-y-2"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              >
                {slide.description.split('\n').map((line, i) => (
                  <p key={i} className="flex items-start gap-2.5 justify-center">
                    <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{line}</span>
                  </p>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link to={slide.primaryCtaLink}>
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    {slide.primaryCta}
                  </Button>
                </Link>
                <Link to={slide.secondaryCtaLink}>
                  <Button variant="outline" size="lg" icon={<Play className="w-5 h-5" />}>
                    {slide.secondaryCta}
                  </Button>
                </Link>
              </motion.div>

              {slide.subtext && (
                <p className="mt-2 text-xs sm:text-sm text-white/50 font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>{slide.subtext}</p>
              )}

              {/* Module pills */}
              {slide.modules && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-5 flex flex-wrap items-center justify-center gap-2"
                >
                  {slide.modules.map((mod) => (
                    <span
                      key={mod}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-black/30 border border-white/[0.12] text-white/80 hover:text-white hover:border-accent/30 hover:bg-accent/[0.06] transition-all backdrop-blur-sm"
                    >
                      {mod}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto"
              >
                {slide.stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
                    className="text-center bg-black/30 rounded-xl py-3 px-2 border border-white/[0.10] backdrop-blur-sm"
                  >
                    <div className="text-xl sm:text-2xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <p className="text-[10px] sm:text-xs text-white/60 mt-0.5 uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

    </section>
  );
}
