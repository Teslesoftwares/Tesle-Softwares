import { lazy, Suspense, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { TopBar } from '@/components/layout/TopBar';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { MusicPlayer } from '@/components/ui/MusicPlayer';

const LeadCapture = lazy(() => import('@/components/ui/LeadCapture').then(m => ({ default: m.LeadCapture })));

const AmbientBackground = lazy(() => import('@/components/layout/AmbientBackground'));

const Home = lazy(() => import('@/pages/Home'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetail = lazy(() => import('@/pages/ServiceDetail'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'));
const Media = lazy(() => import('@/pages/Media'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogArticle = lazy(() => import('@/pages/BlogArticle'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-purple animate-pulse" />
        <p className="text-sm text-muted">Loading...</p>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/services/:slug" element={<PageTransition><ServiceDetail /></PageTransition>} />
          <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
          <Route path="/portfolio/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
          <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug" element={<PageTransition><BlogArticle /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function MainSite() {
  const [musicOpen, setMusicOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <ThemeProvider>
      <AmbientBackground />
      <div className="relative z-10 min-h-screen text-white overflow-x-hidden">
        <Navbar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />
        <TopBar
          musicOpen={musicOpen}
          onMusicOpenChange={setMusicOpen}
          mobileMenuOpen={mobileOpen}
          onMobileMenuOpenChange={setMobileOpen}
          isPlaying={isPlaying}
        />
        <AnimatedRoutes />
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
        <MusicPlayer open={musicOpen} onOpenChange={setMusicOpen} onPlayingChange={setIsPlaying} />
        <Suspense fallback={null}><LeadCapture delay={10000} exitIntent /></Suspense>
      </div>
    </ThemeProvider>
  );
}
