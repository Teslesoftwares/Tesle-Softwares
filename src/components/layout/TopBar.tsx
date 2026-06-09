import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music, Search, User, Sun, Moon, Menu, X,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface TopBarProps {
  musicOpen: boolean;
  onMusicOpenChange: (v: boolean) => void;
  mobileMenuOpen: boolean;
  onMobileMenuOpenChange: (v: boolean) => void;
  isPlaying?: boolean;
}

export function TopBar({ musicOpen, onMusicOpenChange, mobileMenuOpen, onMobileMenuOpenChange, isPlaying }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="fixed z-50 flex items-center gap-1.5
      top-4 left-1/2 -translate-x-1/2
      lg:top-1/2 lg:left-4 lg:-translate-y-1/2 lg:-translate-x-0"
    >
      {/* Unified glass pill */}
      <div className="flex items-center gap-1 glass rounded-full px-2 py-1.5 border border-white/[0.06] shadow-lg
        lg:flex-col lg:rounded-2xl lg:py-2 lg:px-1.5"
      >
        {/* T Logo */}
        <a href="/" className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex-shrink-0">
          <span className="text-accent font-bold text-xs">T</span>
        </a>

        {/* Divider */}
        <div className="w-px h-5 bg-white/[0.06] lg:w-5 lg:h-px" />

        {/* Music player toggle */}
        <button
          onClick={() => onMusicOpenChange(!musicOpen)}
          className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors ${musicOpen ? 'text-accent bg-accent/10' : 'text-muted hover:text-white hover:bg-white/[0.05]'}`}
        >
          <Music className="w-4 h-4" />
          {isPlaying && (
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          )}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/[0.06] lg:w-5 lg:h-px" />

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/[0.06] lg:w-5 lg:h-px" />

        {/* Search */}
        <div className="relative flex items-center lg:flex lg:justify-center">
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.form
                key="search-form"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 180, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSearch}
                className="flex items-center lg:absolute lg:left-full lg:ml-3 lg:top-1/2 lg:-translate-y-1/2"
              >
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setSearchOpen(false)}
                  placeholder="Search..."
                  className="w-full bg-transparent text-xs text-white placeholder-muted outline-none px-2 glass rounded-lg h-8 border border-white/[0.06]"
                />
              </motion.form>
            ) : (
              <motion.button
                key="search-btn"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => setSearchOpen(true)}
                className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <Search className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-white/[0.06] lg:w-5 lg:h-px" />

        {/* Profile */}
        <a
          href="/contact"
          className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-white hover:bg-white/[0.05] transition-colors"
        >
          <User className="w-4 h-4" />
        </a>

        {/* Divider (mobile only) */}
        <div className="w-px h-5 bg-white/[0.06] lg:hidden" />

        {/* Hamburger (mobile only) */}
        <button
          onClick={() => onMobileMenuOpenChange(!mobileMenuOpen)}
          className="flex items-center justify-center w-8 h-8 rounded-full text-muted hover:text-white hover:bg-white/[0.05] transition-colors lg:hidden"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
