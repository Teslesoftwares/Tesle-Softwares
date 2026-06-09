import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(0,229,255,0.2) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-56 h-56 rounded-full opacity-15"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          }}
          animate={{
            x: [0, -25, 15, 0],
            y: [0, 20, -10, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
            Let's Talk
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Ready to Start{' '}
            <span className="text-gradient">Your Project?</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Let's discuss your vision and turn it into reality. Book a free consultation
            and we'll provide a tailored proposal within 48 hours.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              className="animate-glow"
            >
              Book a Free Consultation
            </Button>
            <Button variant="outline" size="lg">
              View Our Work
            </Button>
          </div>

          <p className="mt-6 text-xs text-muted">
            No obligation &middot; Free consultation &middot; Response within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
