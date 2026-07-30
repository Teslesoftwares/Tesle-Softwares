import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { AuthProvider } from '@/hooks/useAuth';
import { ShellProvider, useShell } from '@/components/shell/ShellContext';
import { InstalledAppsProvider } from '@/hooks/useInstalledApps';
import { AppShell } from '@/components/shell/AppShell';
import { PageTransition } from '@/components/layout/PageTransition';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { WelcomeAudio } from '@/components/ui/WelcomeAudio';
import { SalesContactButton } from '@/components/ui/SalesContactButton';

const AmbientBackground = lazy(() => import('@/components/layout/AmbientBackground'));

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogArticle = lazy(() => import('@/pages/BlogArticle'));
const Contact = lazy(() => import('@/pages/Contact'));
const Careers = lazy(() => import('@/pages/Careers'));
const PlatformPage = lazy(() => import('@/pages/Platform'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetail'));
const PricingPage = lazy(() => import('@/pages/Pricing'));
const EnterprisePage = lazy(() => import('@/pages/Enterprise'));
const DevelopersPage = lazy(() => import('@/pages/Developers'));
const SolutionsPage = lazy(() => import('@/pages/Solutions'));
const IndustriesPage = lazy(() => import('@/pages/Industries'));
const IndustryDetailPage = lazy(() => import('@/pages/IndustryDetail'));
const ResourcesPage = lazy(() => import('@/pages/Resources'));
const WorkspacePage = lazy(() => import('@/pages/Workspace'));
const TesleAI = lazy(() => import('@/pages/TesleAI'));
const CreateAccount = lazy(() => import('@/pages/CreateAccount'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark animate-pulse" />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );
}

function KeyboardShortcuts() {
  const { setCommandPaletteOpen, toggleSidebar, setNotificationsOpen } = useShell();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K = Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      // Cmd/Ctrl + B = Toggle Sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
      }
      // Cmd/Ctrl + . = Notifications
      if ((e.metaKey || e.ctrlKey) && e.key === '.') {
        e.preventDefault();
        setNotificationsOpen(true);
      }
      // G then H = Go Home
      // (simple: just use single shortcuts for now)
      // 1-5 = Quick nav (with no modifiers)
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
        switch (e.key) {
          case 'g': // wait for next key
            break;
        }
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [setCommandPaletteOpen, toggleSidebar, setNotificationsOpen, navigate]);

  return null;
}

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Small delay to wait for section to render
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/portfolio/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogArticle /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/platform" element={<PageTransition><PlatformPage /></PageTransition>} />
          <Route path="/products" element={<PageTransition><ProductsPage /></PageTransition>} />
          <Route path="/create-account" element={<PageTransition><CreateAccount /></PageTransition>} />
          <Route path="/products/ai" element={<PageTransition><TesleAI /></PageTransition>} />
          <Route path="/products/:slug" element={<PageTransition><ProductDetailPage /></PageTransition>} />
          <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
          <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
          <Route path="/enterprise" element={<PageTransition><EnterprisePage /></PageTransition>} />
          <Route path="/developers" element={<PageTransition><DevelopersPage /></PageTransition>} />
          <Route path="/solutions" element={<PageTransition><SolutionsPage /></PageTransition>} />
          <Route path="/industries" element={<PageTransition><IndustriesPage /></PageTransition>} />
          <Route path="/industries/:slug" element={<PageTransition><IndustryDetailPage /></PageTransition>} />
          <Route path="/resources" element={<PageTransition><ResourcesPage /></PageTransition>} />
          <Route path="/workspace" element={<PageTransition><WorkspacePage /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function MainSite() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ShellProvider>
          <InstalledAppsProvider>
            <ScrollToHash />
            <KeyboardShortcuts />
            <AmbientBackground />
            <AppShell>
              <AnimatedRoutes />
            </AppShell>
            <SalesContactButton />
            <WhatsAppButton />
            <ScrollToTop />
            <WelcomeAudio />
          </InstalledAppsProvider>
        </ShellProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
