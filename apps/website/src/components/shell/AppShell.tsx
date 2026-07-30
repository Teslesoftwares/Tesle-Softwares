import { type ReactNode, useState, useEffect } from 'react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { PublicHeader } from './PublicHeader';
import { PublicFooter } from './PublicFooter';
import { BottomNav } from './BottomNav';
import { CommandPalette } from './CommandPalette';
import { NotificationsPanel } from './NotificationsPanel';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '@/hooks/useAuth';
import ComingSoon from '@/pages/ComingSoon';

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

export function AppShell({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  const isMobile = useIsMobile();

  if (isMobile && !isLoggedIn) {
    return <ComingSoon />;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col flex-1 bg-bg">
        <PublicHeader />
        <main className="flex-1">
          {children}
          <PublicFooter />
        </main>
        <CommandPalette />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      {/* Desktop sidebar */}
      <AppSidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader />
        <main className="flex-1 min-h-0 overflow-y-auto pb-20 lg:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav />

      {/* Overlays */}
      <CommandPalette />
      <NotificationsPanel />
      <MobileMenu />
    </div>
  );
}
