import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--text) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>

          <h2 className="heading text-3xl sm:text-4xl md:text-6xl leading-tight text-text">
            All your business.{' '}
            <span className="text-gradient">All powered by AI.</span>
          </h2>
          <p className="mt-5 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            See Tesle in action. Book a personalized demo and discover how our integrated platform can streamline your operations, automate workflows, and accelerate growth.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-foreground text-bg font-semibold text-sm hover:bg-foreground/90 transition-all"
            >
              <span>Get started FREE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-accent/20" />
            </Link>
            <Link
              to="/products"
              className="px-5 py-3 text-sm text-muted hover:text-text transition-colors"
            >
              Explore platform
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted">
            Free forever &middot; No credit card &middot; 30-min demo &middot; Enterprise-grade security
          </p>
        </motion.div>
      </div>
    </section>
  );
}
