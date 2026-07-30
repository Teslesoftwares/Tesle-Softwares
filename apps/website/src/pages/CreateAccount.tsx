import { motion } from 'framer-motion';
import { Headphones, Mail, MessageCircle, Phone } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/data/contact';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@teslesoftwares.com',
    href: 'mailto:hello@teslesoftwares.com',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10 hover:bg-blue-500/20',
  },
  {
    icon: Phone,
    label: 'Call',
    value: '+233 53 838 7208',
    href: `tel:+${WHATSAPP_NUMBER}`,
    color: 'text-green-500',
    bg: 'bg-green-500/10 hover:bg-green-500/20',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Chat with us',
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    color: 'text-[#25D366]',
    bg: 'bg-[#25D366]/10 hover:bg-[#25D366]/20',
  },
];

export default function CreateAccount() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent/10 flex items-center justify-center">
            <Headphones className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-text mb-3">
            Contact Sales to Sign Up
          </h1>
          <p className="text-muted text-lg leading-relaxed max-w-md mx-auto">
            Tesle is currently in early access. Please reach out to our sales team to create your account and get started.
          </p>
        </div>

        <div className="space-y-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex items-center gap-4 p-4 rounded-xl border border-glass transition-colors ${method.bg}`}
              >
                <div className={`w-11 h-11 rounded-lg ${method.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${method.color}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted">{method.label}</p>
                  <p className="text-text font-medium truncate">{method.value}</p>
                </div>
              </a>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted mt-8">
          We typically respond within 24 hours.
        </p>
      </motion.div>
    </div>
  );
}
