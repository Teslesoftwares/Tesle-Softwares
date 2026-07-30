import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MascotCompanion } from '@/components/ui/MascotCompanion';

const stats = [
  { value: '50K+', label: 'Users' },
  { value: '200+', label: 'Organizations' },
  { value: '15+', label: 'Markets' },
  { value: '15', label: 'Modules' },
];

export function CompactHero() {
  return (
    <section className="relative py-10 sm:py-16 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, transparent 60%)' }}
          animate={{ x: [0, 30, -20, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 60%)' }}
          animate={{ x: [0, -20, 15, 0], y: [0, 20, -15, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-xs font-semibold text-accent mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Africa's Enterprise Software Platform
            </div>

            <h1 className="heading text-3xl sm:text-4xl md:text-5xl text-text leading-tight">
              One platform to{' '}
              <span className="text-gradient">replace all software</span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-muted max-w-lg leading-relaxed">
              Save money  run procurement, HR, finance, CRM, and more from one platform.
              AI-powered automation across every department. 15+ integrated modules built for Africa.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Get Started Free
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg" icon={<Play className="w-5 h-5" />}>
                  Explore Platform
                </Button>
              </Link>
            </div>

            <p className="mt-2 text-xs text-muted">Free forever. No credit card.</p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-4 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-lg sm:text-xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs text-muted uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-72 h-72 xl:w-80 xl:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 via-accent/5 to-transparent blur-2xl" />
              <img
                src="/mascot.png"
                alt="Tesle AI"
                className="relative w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,107,0,0.2)]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <MascotCompanion />
    </section>
  );
}
