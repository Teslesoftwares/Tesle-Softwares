import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers, Briefcase, PenTool, CreditCard, Image, Clapperboard, Newspaper,
  Code2, Globe, Smartphone, Palette, Camera, Video,
  PenTool as PenToolIcon, TrendingUp, Search, Bot, Music4, Share2,
  ChevronDown,
} from 'lucide-react';

const services = [
  { label: 'Software Development', href: '/services/software-development', icon: Code2 },
  { label: 'Website Development', href: '/services/website-development', icon: Globe },
  { label: 'Mobile App Development', href: '/services/mobile-applications', icon: Smartphone },
  { label: 'Graphics & Branding', href: '/services/graphics-and-branding', icon: Palette },
  { label: 'Photography', href: '/services/photography', icon: Camera },
  { label: 'Videography', href: '/services/videography', icon: Video },
  { label: 'Content Creation', href: '/services/content-creation', icon: PenToolIcon },
  { label: 'Digital Marketing', href: '/services/digital-marketing', icon: TrendingUp },
  { label: 'SEO', href: '/services/seo', icon: Search },
  { label: 'Business Automation', href: '/services/business-automation', icon: Bot },
  { label: 'Music Production', href: '/services/music-production', icon: Music4 },
  { label: 'Digital Distribution & Promotion', href: '/services/digital-distribution-and-promotion', icon: Share2 },
];

const navLinks = [
  { label: 'Services', href: '/services', icon: Layers, mega: true },
  { label: 'Portfolio', href: '/portfolio', icon: Image },
  { label: 'Media', href: '/media', icon: Clapperboard },
  { label: 'Blog', href: '/blog', icon: Newspaper },
  { label: 'Contact', href: '/contact', icon: Briefcase },
];

interface NavbarProps {
  mobileOpen: boolean;
  onMobileOpenChange: (v: boolean) => void;
}

export function Navbar({ mobileOpen, onMobileOpenChange }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      {/* Desktop: Sticky Pill Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 justify-center px-4 hidden md:flex transition-all duration-500 ${
          scrolled ? 'pt-2' : 'pt-4 sm:pt-6'
        }`}
      >
        <div
          className={`w-full max-w-4xl flex items-center justify-between h-14 sm:h-16 px-4 sm:px-8 rounded-full border transition-all duration-500 shadow-2xl ${
            scrolled
              ? 'glass border-white/[0.06] shadow-black/40'
              : 'bg-transparent border-transparent shadow-transparent'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="relative z-10 flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <span className="text-accent font-bold text-xs sm:text-sm">T</span>
            </div>
            <span className="text-white font-semibold text-base sm:text-lg tracking-tight">Tesle</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.mega && setMegaOpen(true)}
                  onMouseLeave={() => link.mega && setMegaOpen(false)}
                >
                  <a
                    href={link.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-white transition-colors rounded-full hover:bg-white/[0.05]"
                    onClick={(e) => {
                      if (link.mega) {
                        e.preventDefault();
                        navigate('/services');
                      }
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    {link.mega && (
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
                    )}
                  </a>

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.mega && megaOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] rounded-2xl p-5 border border-white/[0.08] shadow-2xl shadow-black/60 bg-[#0a0e1e]/95 backdrop-blur-2xl"
                      >
                        <div className="grid grid-cols-2 gap-1">
                          {services.map((svc) => {
                            const SvgIcon = svc.icon;
                            return (
                              <Link
                                key={svc.label}
                                to={svc.href}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted hover:text-white hover:bg-white/[0.05] transition-all"
                              >
                                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                                  <SvgIcon className="w-4 h-4 text-accent" />
                                </div>
                                <span className="text-sm font-medium">{svc.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <a
            href="#cta"
            className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all duration-300"
          >
            Get Started
          </a>
        </div>
      </motion.nav>

      {/* Mobile: Bottom Navigation Bar — only 4 icons */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4 md:hidden"
      >
        <div className="w-full max-w-sm glass rounded-full px-4 flex items-center justify-evenly h-14 border-white/[0.06] shadow-2xl shadow-black/50">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isRoute = link.href.startsWith('/');
            if (isRoute) {
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className="flex items-center justify-center w-10 h-10 text-muted hover:text-white transition-colors rounded-full hover:bg-white/[0.05]"
                >
                  <Icon className="w-5 h-5" />
                </Link>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center justify-center w-10 h-10 text-muted hover:text-white transition-colors rounded-full hover:bg-white/[0.05]"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Mobile Full Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-bg/95 backdrop-blur-2xl" />
            <div className="relative h-full overflow-y-auto px-6 pt-24 pb-28">
              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  if (link.href.startsWith('/')) {
                    return (
                      <Link
                        key={link.label}
                        to={link.href}
                        onClick={() => onMobileOpenChange(false)}
                        className="flex items-center gap-3 px-4 py-3.5 text-muted hover:text-white transition-colors rounded-xl hover:bg-white/[0.05]"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-base font-medium">{link.label}</span>
                      </Link>
                    );
                  }
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => onMobileOpenChange(false)}
                      className="flex items-center gap-3 px-4 py-3.5 text-muted hover:text-white transition-colors rounded-xl hover:bg-white/[0.05]"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-base font-medium">{link.label}</span>
                    </a>
                  );
                })}
              </div>

              <div className="mt-8">
                <h4 className="px-4 text-xs font-semibold tracking-widest uppercase text-muted mb-3">
                  All Services
                </h4>
                <div className="space-y-1">
                  {services.map((svc) => {
                    const SvgIcon = svc.icon;
                    return (
                      <Link
                        key={svc.label}
                        to={svc.href}
                        onClick={() => onMobileOpenChange(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-muted hover:text-white transition-colors rounded-xl hover:bg-white/[0.05]"
                      >
                        <SvgIcon className="w-4 h-4 text-accent" />
                        <span>{svc.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 px-4">
                <a
                  href="#cta"
                  onClick={() => onMobileOpenChange(false)}
                  className="block px-4 py-3.5 text-center text-sm font-medium bg-accent text-black rounded-xl"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
