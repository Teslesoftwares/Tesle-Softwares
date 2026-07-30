import { useParams, Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { ProductPage } from '@/components/layout/ProductPage';
import { products, getProductBySlug } from '@/data/products';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            View all products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO title={product.name} description={product.description} />
      <ProductPage product={product} />
    </>
  );
}
