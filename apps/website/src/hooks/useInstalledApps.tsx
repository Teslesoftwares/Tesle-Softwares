import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface InstalledAppsContextType {
  installed: string[];
  install: (slug: string) => void;
  uninstall: (slug: string) => void;
  isInstalled: (slug: string) => boolean;
}

const InstalledAppsContext = createContext<InstalledAppsContextType | null>(null);

const STORAGE_KEY = 'tesle_installed_apps';
const DEFAULT_INSTALLED: string[] = [];

function loadInstalled(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_INSTALLED;
}

export function InstalledAppsProvider({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [installed, setInstalled] = useState<string[]>(() => {
    return isLoggedIn ? loadInstalled() : [];
  });

  useEffect(() => {
    if (isLoggedIn) {
      setInstalled(loadInstalled());
    } else {
      setInstalled([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(installed));
    }
  }, [installed, isLoggedIn]);

  const install = useCallback((slug: string) => {
    if (!isLoggedIn) {
      navigate('/create-account');
      return;
    }
    setInstalled((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, [isLoggedIn, navigate]);

  const uninstall = useCallback((slug: string) => {
    setInstalled((prev) => prev.filter((s) => s !== slug));
  }, []);

  const isInstalled = (slug: string) => installed.includes(slug);

  return (
    <InstalledAppsContext.Provider value={{ installed, install, uninstall, isInstalled }}>
      {children}
    </InstalledAppsContext.Provider>
  );
}

export function useInstalledApps() {
  const ctx = useContext(InstalledAppsContext);
  if (!ctx) throw new Error('useInstalledApps must be used within InstalledAppsProvider');
  return ctx;
}
