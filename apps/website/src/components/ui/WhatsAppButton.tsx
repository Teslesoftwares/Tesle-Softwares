import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getWhatsAppUrl } from '@/data/contact';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition-shadow duration-300 md:bottom-8 md:right-8"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Chat on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
