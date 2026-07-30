import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function HeroOverlay() {
  return (
    <div className="relative z-10 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center pt-24 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-accent mb-8 border-accent/20"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Enterprise AI Software for Africa
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          The Operating System{' '}
          <span className="text-gradient">for</span>
          <br />
          <span className="text-gradient">African Business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-muted max-w-3xl mx-auto leading-relaxed"
        >
          AI-Native Enterprise Platform  ERP, CRM, HR, Financials &amp; Analytics
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
            Book a Demo
          </Button>
          <Button variant="outline" size="lg" icon={<MessageCircle className="w-5 h-5" />}>
            Explore Products
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '50K+', label: 'Users on Platform' },
            { value: '200+', label: 'Businesses Served' },
            { value: '15+', label: 'Countries Deployed' },
            { value: '99.9%', label: 'Platform Uptime' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
              <p className="text-xs sm:text-sm text-muted mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
