import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { leadCaptureSchema, type LeadCaptureData } from '@/lib/validations';
import { FormInput, FormSelect } from '@/components/ui/FormInput';
import { serviceInquiries } from '@/data/contact';

interface LeadCaptureProps {
  /** Delay in ms before popup appears */
  delay?: number;
  /** Show on exit intent (mouse leaves window) */
  exitIntent?: boolean;
  /** Only show on specific paths */
  includePaths?: string[];
}

export function LeadCapture({ delay = 8000, exitIntent = false, includePaths }: LeadCaptureProps) {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<LeadCaptureData>({
    resolver: zodResolver(leadCaptureSchema),
  });

  // Check path
  useEffect(() => {
    if (includePaths) {
      const match = includePaths.some((p) => window.location.pathname.startsWith(p));
      if (!match) return;
    }
  }, [includePaths]);

  // Timer popup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed && !localStorage.getItem('lead-capture-dismissed')) {
        setOpen(true);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, dismissed]);

  // Exit intent
  useEffect(() => {
    if (!exitIntent) return;
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 0 && !dismissed && !localStorage.getItem('lead-capture-dismissed')) {
        setOpen(true);
      }
    };
    document.addEventListener('mouseleave', handler);
    return () => document.removeEventListener('mouseleave', handler);
  }, [exitIntent, dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setOpen(false);
    localStorage.setItem('lead-capture-dismissed', 'true');
  };

  const onSubmit = (data: LeadCaptureData) => {
    console.log('Lead capture:', data);
    setSubmitted(true);
    localStorage.setItem('lead-capture-dismissed', 'true');
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md glass rounded-3xl p-6 sm:p-8 border border-white/[0.06] overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/[0.06] blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple/[0.04] blur-3xl" />

            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-muted hover:text-white transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-purple/30 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">You're on the List!</h3>
                <p className="text-sm text-muted">We'll send you exclusive insights, tips, and offers to help grow your business.</p>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-purple/20 border border-white/[0.06] flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">Get Exclusive Insights</h3>
                    <p className="text-xs text-muted">Join 500+ forward-thinking businesses</p>
                  </div>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-5">
                  Subscribe to receive our best tips on digital growth, design trends, and technology — straight to your inbox.
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <FormInput label="Full Name" name="name" register={form.register} error={form.formState.errors.name} placeholder="Your name" required />
                  <FormInput label="Email" name="email" register={form.register} error={form.formState.errors.email} placeholder="you@example.com" type="email" required />
                  <FormInput label="Company" name="company" register={form.register} error={form.formState.errors.company} placeholder="Company name (optional)" />
                  <FormSelect label="Area of Interest" name="interest" register={form.register} error={form.formState.errors.interest} options={serviceInquiries} required />

                  <button type="submit" className="w-full h-11 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all duration-300 inline-flex items-center justify-center gap-2 mt-1">
                    Subscribe <Send className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-muted">No spam. Unsubscribe anytime.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
