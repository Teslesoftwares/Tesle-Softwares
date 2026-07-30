import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import {
  Search, Command, ArrowRight, Home, Box, Brain, Lightbulb, Briefcase,
  DollarSign, Newspaper, Code2, Headphones, BookOpen, Building2, Users,
} from 'lucide-react';
import { useShell } from './ShellContext';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  href: string;
  category: string;
}

const commandItems: CommandItem[] = [
  { id: 'home', label: 'Home', description: 'Go to homepage', icon: Home, href: '/', category: 'Pages' },
  { id: 'products', label: 'Products', description: 'Browse all products', icon: Box, href: '/products', category: 'Pages' },
  { id: 'ai', label: 'Tesle AI', description: 'AI capabilities', icon: Brain, href: '/products/ai', category: 'Products' },
  { id: 'erp', label: 'Tesle ERP', description: 'Enterprise resource planning', icon: Box, href: '/products/erp', category: 'Products' },
  { id: 'crm', label: 'Tesle CRM', description: 'Customer relationship management', icon: Users, href: '/products/crm', category: 'Products' },
  { id: 'hr', label: 'Tesle HR', description: 'Human resource management', icon: Briefcase, href: '/products/hr', category: 'Products' },
  { id: 'accounting', label: 'Tesle Accounting', description: 'Financial management', icon: DollarSign, href: '/products/accounting', category: 'Products' },
  { id: 'solutions', label: 'Solutions', description: 'Industry solutions', icon: Lightbulb, href: '/solutions', category: 'Pages' },
  { id: 'industries', label: 'Industries', description: 'Industry verticals', icon: Building2, href: '/industries', category: 'Pages' },
  { id: 'enterprise', label: 'Enterprise', description: 'Enterprise plans', icon: Briefcase, href: '/enterprise', category: 'Pages' },
  { id: 'pricing', label: 'Pricing', description: 'View pricing plans', icon: DollarSign, href: '/pricing', category: 'Pages' },
  { id: 'blog', label: 'Blog', description: 'Read articles', icon: Newspaper, href: '/blog', category: 'Resources' },
  { id: 'developers', label: 'Developers', description: 'API documentation', icon: Code2, href: '/developers', category: 'Resources' },
  { id: 'careers', label: 'Careers', description: 'Join our team', icon: Headphones, href: '/careers', category: 'Company' },
  { id: 'contact', label: 'Contact', description: 'Get in touch', icon: Headphones, href: '/contact', category: 'Company' },
  { id: 'about', label: 'About', description: 'About Tesle', icon: Users, href: '/about', category: 'Company' },
  { id: 'portfolio', label: 'Case Studies', description: 'Success stories', icon: BookOpen, href: '/portfolio', category: 'Resources' },
  { id: 'resources', label: 'Resources', description: 'Help center', icon: BookOpen, href: '/resources', category: 'Resources' },
  { id: 'workspace', label: 'Workspace', description: 'Open dashboard', icon: Box, href: '/workspace', category: 'Pages' },
];

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen } = useShell();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  const filtered = commandItems.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const categories = Array.from(new Set(filtered.map((i) => i.category)));

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      navigate(filtered[selectedIndex].href);
      setCommandPaletteOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-lg mx-4 bg-card border border-glass-hover rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 border-b border-glass">
              <Search size={18} className="text-muted shrink-0" />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, products, actions..."
                className="flex-1 py-3.5 text-sm bg-transparent text-text placeholder:text-muted focus:outline-none"
              />
              <kbd className="text-[10px] px-1.5 py-0.5 bg-glass border border-glass rounded text-muted">ESC</kbd>
            </div>
            <div className="max-h-[320px] overflow-y-auto p-2 scrollbar-thin">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center py-8 text-muted">
                  <Search size={24} className="mb-2 opacity-50" />
                  <p className="text-sm">No results found</p>
                </div>
              ) : (
                categories.map((cat) => (
                  <div key={cat}>
                    <p className="px-3 py-1.5 text-[10px] font-semibold text-muted uppercase tracking-wider">{cat}</p>
                    {filtered
                      .filter((i) => i.category === cat)
                      .map((item) => {
                        const globalIndex = filtered.indexOf(item);
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              navigate(item.href);
                              setCommandPaletteOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                              selectedIndex === globalIndex
                                ? 'bg-accent/10 text-accent'
                                : 'text-text hover:bg-glass-hover'
                            }`}
                          >
                            <Icon size={16} className="shrink-0 text-muted" />
                            <div className="flex-1 text-left min-w-0">
                              <span className="font-medium">{item.label}</span>
                              {item.description && (
                                <span className="text-xs text-muted ml-2">{item.description}</span>
                              )}
                            </div>
                            <ArrowRight size={14} className="shrink-0 text-muted" />
                          </button>
                        );
                      })}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
