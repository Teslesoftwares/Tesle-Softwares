import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { IndustryPage } from '@/components/layout/IndustryPage';
import { getIndustryBySlug } from '@/data/industries';

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const industry = getIndustryBySlug(slug || '');

  if (!industry) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Industry Not Found</h1>
          <p className="text-muted mb-8">The industry page you're looking for doesn't exist.</p>
          <Link to="/industries" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            View all industries
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO title={industry.name} description={industry.description} />
      <IndustryPage industry={industry} />
    </>
  );
}
