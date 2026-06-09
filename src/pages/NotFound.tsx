import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { ParticleField } from '@/components/ui/ParticleField';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SEO title="404 — Page Not Found" description="The page you're looking for doesn't exist or has been moved." noIndex />
      <ParticleField count={30} color="139, 92, 246" speed={0.2} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/50 to-bg pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        <motion.span
          className="text-8xl sm:text-9xl font-bold text-gradient"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          404
        </motion.span>
        <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-white">
          Page Not Found
        </h1>
        <p className="mt-3 text-muted max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
