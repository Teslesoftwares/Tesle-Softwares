import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageSquare, MessageCircle, X, Headphones } from 'lucide-react';
import { WHATSAPP_NUMBER, getWhatsAppUrl } from '@/data/contact';
import { LiveChatWidget } from './LiveChatWidget';

const CONTACTS = [
  {
    label: 'Chat',
    icon: MessageSquare,
    action: 'chat' as const,
    color: 'text-accent',
    bg: 'hover:bg-accent/10',
  },
  {
    label: 'Call',
    icon: Phone,
    href: `tel:+${WHATSAPP_NUMBER}`,
    color: 'text-green-500',
    bg: 'hover:bg-green-500/10',
  },
  {
    label: 'Email',
    icon: Mail,
    href: 'mailto:hello@teslesoftwares.com',
    color: 'text-blue-500',
    bg: 'hover:bg-blue-500/10',
  },
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: getWhatsAppUrl(),
    target: '_blank' as const,
    color: 'text-[#25D366]',
    bg: 'hover:bg-[#25D366]/10',
  },
];

const spring = { type: 'spring', stiffness: 300, damping: 25, mass: 0.8 };
const smooth = { duration: 0.25, ease: [0.32, 0.08, 0.24, 1] };

const container = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { ...spring, staggerChildren: 0.04, delayChildren: 0.06 },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.95,
    transition: { duration: 0.18, ease: 'easeIn' },
  },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { ...spring } },
};

export function SalesContactButton() {
  const [open, setOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <LiveChatWidget open={chatOpen} onClose={() => setChatOpen(false)} />

      <AnimatePresence mode="popLayout">
        {open && (
          <motion.div
            key="popup"
            variants={container}
            initial="hidden"
            animate="show"
            exit="exit"
            className="flex flex-col gap-1 p-2 rounded-2xl glass border border-accent/20 shadow-lg shadow-accent/10"
          >
            {CONTACTS.map((c) => {
              const Icon = c.icon;
              const shared = `flex items-center gap-3 px-3.5 py-2.5 rounded-xl ${c.bg} transition-colors text-left w-full`;
              if ('action' in c && c.action === 'chat') {
                return (
                  <motion.button
                    key={c.label}
                    variants={item}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { setChatOpen(true); setOpen(false); }}
                    className={shared}
                  >
                    <Icon className={`w-[18px] h-[18px] ${c.color}`} />
                    <span className="text-sm font-medium text-text whitespace-nowrap">{c.label}</span>
                  </motion.button>
                );
              }
              return (
                <motion.a
                  key={c.label}
                  variants={item}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.96 }}
                  href={'href' in c ? c.href : undefined}
                  target={'target' in c ? c.target : '_self'}
                  rel={'target' in c && c.target === '_blank' ? 'noopener noreferrer' : undefined}
                  className={shared}
                >
                  <Icon className={`w-[18px] h-[18px] ${c.color}`} />
                  <span className="text-sm font-medium text-text whitespace-nowrap">{c.label}</span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        key="toggle"
        layoutId="sales"
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={spring}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full glass border shadow-lg transition-shadow
          ${open ? 'border-accent/40 shadow-accent/15' : 'border-white/[0.06] shadow-black/5'}
        `}
        title="Contact sales"
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={open ? 'close' : 'open'}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={smooth}
            className="flex items-center gap-2.5"
          >
            {open ? (
              <X className="w-5 h-5 text-accent" />
            ) : (
              <>
                <Headphones className="w-5 h-5 text-accent" />
                <span className="text-sm font-semibold text-text whitespace-nowrap">Contact Sales</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
