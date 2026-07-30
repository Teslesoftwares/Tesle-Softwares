import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Home, Box, Brain, Lightbulb, Building2, Briefcase,
  DollarSign, Newspaper, Code2, Headphones, BookOpen, GraduationCap,
  HeartPulse, Hotel, Church, Landmark, Kanban, Users, Receipt,
  ShoppingCart, Package, Truck, CreditCard, Settings,
} from 'lucide-react';
import { useShell } from './ShellContext';

const mobileNav = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Products', icon: Box, href: '/products' },
  { label: 'Tesle AI', icon: Brain, href: '/products/ai' },
  { label: 'Solutions', icon: Lightbulb, href: '/solutions' },
  { label: 'Industries', icon: Building2, href: '/industries' },
  { label: 'Enterprise', icon: Briefcase, href: '/enterprise' },
  { label: 'Pricing', icon: DollarSign, href: '/pricing' },
  { label: 'Blog', icon: Newspaper, href: '/blog' },
  { label: 'Developers', icon: Code2, href: '/developers' },
  { label: 'Careers', icon: Briefcase, href: '/careers' },
  { label: 'Contact', icon: Headphones, href: '/contact' },
  { label: 'Resources', icon: BookOpen, href: '/resources' },
  { label: 'Workspace', icon: Settings, href: '/workspace' },
];

export function MobileMenu() {
  const { mobileMenuOpen, setMobileMenuOpen } = useShell();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 bottom-0 w-[280px] bg-surface border-r border-glass flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-14 px-4 border-b border-glass">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
                  <img src="/images/tesle-logo.png" alt="Tesle" className="w-full h-full object-contain" />
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-muted hover:text-text hover:bg-glass-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
              {mobileNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? 'bg-accent/10 text-accent'
                        : 'text-muted hover:text-text hover:bg-glass-hover'
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="p-3 border-t border-glass">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
