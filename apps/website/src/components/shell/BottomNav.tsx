import { Link, useLocation } from 'react-router-dom';
import { Home, Box, Lightbulb, BookOpen, MoreHorizontal } from 'lucide-react';
import { useShell } from './ShellContext';

const bottomNavItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/' },
  { id: 'products', label: 'Products', icon: Box, href: '/products' },
  { id: 'solutions', label: 'Solutions', icon: Lightbulb, href: '/solutions' },
  { id: 'resources', label: 'Resources', icon: BookOpen, href: '/resources' },
  { id: 'more', label: 'More', icon: MoreHorizontal, href: '#more' },
];

export function BottomNav() {
  const location = useLocation();
  const { setMobileMenuOpen } = useShell();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-glass safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {bottomNavItems.map((item) => {
          if (item.id === 'more') {
            return (
              <button
                key={item.id}
                onClick={() => setMobileMenuOpen(true)}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl text-muted transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          }
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                active ? 'text-accent' : 'text-muted'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
