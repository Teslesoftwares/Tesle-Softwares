import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Tesle AI', href: '/create-account' },
  { label: 'About Us', href: '/create-account' },
  { label: 'Products', href: '/create-account' },
  { label: 'Solutions', href: '/create-account' },
  { label: 'Gallery', href: '/create-account' },
  { label: 'Contact Us', href: '/create-account' },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 h-14 border-b border-glass flex items-center px-4 sm:px-6 bg-surface/85 backdrop-blur-xl z-50 shrink-0">
      {/* Logo */}
      <Link to="/" className="flex items-center mr-8 shrink-0">
        <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden">
          <img src="/images/tesle-logo.png" alt="Tesle" className="w-full h-full object-contain" />
        </div>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-muted hover:text-text hover:bg-glass-hover transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />

        <Link
          to="/create-account"
          className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-xl text-sm font-medium text-muted hover:text-text hover:bg-glass-hover transition-colors"
        >
          Log In
        </Link>

        <Link
          to="/create-account"
          className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-colors"
        >
          Sign Up
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2 rounded-xl text-muted hover:text-text hover:bg-glass-hover transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 top-14 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <nav className="fixed top-14 left-0 right-0 bg-surface border-b border-glass z-50 p-3 space-y-1 lg:hidden max-h-[70vh] overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-text hover:bg-glass-hover transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </header>
  );
}
