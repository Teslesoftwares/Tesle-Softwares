import { lazy, Suspense } from 'react';
import { SEO } from '@/components/layout/SEO';
import { StructuredData } from '@/components/layout/StructuredData';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/structuredData';

const CinematicIntro = lazy(() => import('@/components/cinematic/CinematicIntro'));
const TrustedClients = lazy(() => import('@/components/sections/TrustedClients'));
const About = lazy(() => import('@/components/sections/About'));
const Features = lazy(() => import('@/components/sections/Features'));
const WhyChooseUs = lazy(() => import('@/components/sections/WhyChooseUs'));
const ProductShowcase = lazy(() => import('@/components/sections/ProductShowcase'));
const Stats = lazy(() => import('@/components/sections/Stats'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const BlogPosts = lazy(() => import('@/components/sections/BlogPosts'));
const FinalCTA = lazy(() => import('@/components/sections/FinalCTA'));

export default function Home() {
  return (
    <main>
      <SEO />
      <StructuredData data={organizationSchema()} />
      <StructuredData data={websiteSchema()} />
      <StructuredData data={localBusinessSchema()} />
      <Suspense fallback={null}>
        <CinematicIntro />
      </Suspense>
      <Suspense fallback={null}>
        <TrustedClients />
      </Suspense>
      <Suspense fallback={null}>
        <About />
      </Suspense>
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <WhyChooseUs />
      </Suspense>
      <Suspense fallback={null}>
        <ProductShowcase />
      </Suspense>
      <Suspense fallback={null}>
        <Stats />
      </Suspense>
      <Suspense fallback={null}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={null}>
        <BlogPosts />
      </Suspense>
      <Suspense fallback={null}>
        <FinalCTA />
      </Suspense>
    </main>
  );
}
