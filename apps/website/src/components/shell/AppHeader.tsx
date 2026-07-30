import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Menu, User, Command, LogIn, LogOut } from 'lucide-react';
import { useShell } from './ShellContext';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

export function AppHeader() {
  const { setCommandPaletteOpen, notificationsOpen, setNotificationsOpen, setMobileMenuOpen } = useShell();
  const { isLoggedIn, login, logout } = useAuth();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);

  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="h-14 border-b border-glass flex items-center gap-3 px-4 bg-surface/85 backdrop-blur-xl shrink-0 sticky top-0 z-30">
      {/* Mobile menu toggle */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden p-2 -ml-2 rounded-xl text-muted hover:text-text hover:bg-glass-hover transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Breadcrumb / Page title */}
      <div className="flex items-center gap-2 min-w-0">
        <h1 className="text-sm font-semibold text-text truncate">{pageTitle}</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1.5 ml-auto">
        {/* Search / Cmd+K */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-muted bg-glass border border-glass rounded-xl hover:bg-glass-hover hover:text-text transition-colors"
        >
          <Search className="w-4 h-4" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] bg-bg border border-glass rounded">
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </button>

        <ThemeToggle />

        {isLoggedIn && (
          <>
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-muted hover:text-text hover:bg-glass-hover transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
              </button>
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-glass-hover transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/20 to-violet-500/20 border border-glass flex items-center justify-center">
                  <User className="w-4 h-4 text-accent" />
                </div>
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute top-full mt-2 right-0 w-56 bg-card border border-glass-hover rounded-xl shadow-2xl z-50 py-2">
                    <div className="px-4 py-2.5 border-b border-glass">
                      <div className="text-sm font-medium text-text">Welcome back</div>
                      <div className="text-[11px] text-muted">hello@teslesoftwares.com</div>
                    </div>
                    <Link to="/workspace" onClick={() => setProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-muted hover:text-text hover:bg-glass-hover transition-colors block">Workspace</Link>
                    <Link to="/pricing" onClick={() => setProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-muted hover:text-text hover:bg-glass-hover transition-colors block">Pricing</Link>
                    <Link to="/enterprise" onClick={() => setProfileOpen(false)} className="w-full text-left px-4 py-2 text-sm text-muted hover:text-text hover:bg-glass-hover transition-colors block">Enterprise</Link>
                    <div className="border-t border-glass mt-1 pt-1">
                      <button onClick={() => { setProfileOpen(false); logout(); }} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors flex items-center gap-2 font-medium">
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {!isLoggedIn && (
          <button
            onClick={login}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent-dark transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Log In
          </button>
        )}
      </div>
    </header>
  );
}

function getPageTitle(pathname: string): string {
  if (pathname === '/') return 'Home';
  if (pathname === '/about') return 'About';
  if (pathname === '/pricing') return 'Pricing';
  if (pathname === '/enterprise') return 'Enterprise';
  if (pathname === '/contact') return 'Contact';
  if (pathname === '/careers') return 'Careers';
  if (pathname === '/platform') return 'Platform';
  if (pathname === '/developers') return 'Developers';
  if (pathname === '/solutions') return 'Solutions';
  if (pathname === '/resources') return 'Resources';
  if (pathname === '/workspace') return 'Workspace';
  if (pathname === '/products') return 'Products';
  if (pathname === '/products/ai') return 'Tesle AI';
  if (pathname.startsWith('/products/')) {
    const slug = pathname.split('/products/')[1];
    return slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Product';
  }
  if (pathname === '/industries') return 'Industries';
  if (pathname.startsWith('/industries/')) {
    const slug = pathname.split('/industries/')[1];
    return slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ') : 'Industry';
  }
  if (pathname === '/blog') return 'Blog';
  if (pathname.startsWith('/blog/')) return 'Article';
  if (pathname === '/portfolio') return 'Case Studies';
  if (pathname.startsWith('/portfolio/')) return 'Case Study';
  if (pathname === '/services') return 'Services';
  if (pathname.startsWith('/services/')) return 'Service';
  return 'Tesle';
}
