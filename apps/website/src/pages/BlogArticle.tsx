import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ChevronRight, Home, ArrowRight, Tag } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { StructuredData } from '@/components/layout/StructuredData';
import { breadcrumbSchema, articleSchema } from '@/lib/structuredData';
import { blogArticles, getAuthorBySlug, getRelatedArticles } from '@/data/blog';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { BlogContentBlock } from '@/types';

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);
  const author = article ? getAuthorBySlug(article.authorSlug) : undefined;
  const related = article ? getRelatedArticles(article, 3) : [];

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-24 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted mb-8">The article you're looking for doesn't exist.</p>
          <Link to="/blog"><Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>Back to Blog</Button></Link>
        </div>
      </main>
    );
  }

  function renderContent(block: BlogContentBlock, i: number) {
    switch (block.type) {
      case 'paragraph':
        return (
          <p key={i} className="text-base sm:text-lg text-muted leading-relaxed mb-6">
            {block.text}
          </p>
        );
      case 'heading':
        return (
          <h2 key={i} className={`text-xl sm:text-2xl font-bold text-text mb-4 mt-10 ${block.level === 2 ? '' : ''}`}>
            {block.text}
          </h2>
        );
      case 'quote':
        return (
          <div key={i} className="relative my-8 pl-6 sm:pl-8 border-l-2 border-accent">
            <p className="text-lg sm:text-xl text-text/90 italic leading-relaxed mb-3">
              &ldquo;{block.text}&rdquo;
            </p>
            {block.author && <p className="text-sm text-muted"> {block.author}</p>}
          </div>
        );
      case 'list':
        const ListTag = block.style === 'numbered' ? 'ol' : 'ul';
        return (
          <ListTag key={i} className={`mb-6 space-y-2 ${block.style === 'numbered' ? 'list-decimal' : 'list-disc'} pl-5`}>
            {block.items?.map((item, j) => (
              <li key={j} className="text-base sm:text-lg text-muted leading-relaxed pl-2 marker:text-accent">
                {item}
              </li>
            ))}
          </ListTag>
        );
      case 'image':
        return (
          <figure key={i} className="my-8">
            <img decoding="async" src={block.url} alt={block.alt || ''} className="w-full rounded-xl" />
            {block.caption && (
              <figcaption className="mt-3 text-sm text-muted text-center">{block.caption}</figcaption>
            )}
          </figure>
        );
      default:
        return null;
    }
  }

  return (
    <main>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-4">
        <motion.ol initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-muted flex-wrap"
        >
          <li><Link to="/" className="hover:text-text transition-colors"><Home className="w-3.5 h-3.5" /></Link></li>
          <li className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /><Link to="/blog" className="hover:text-text transition-colors">Blog</Link></li>
          <li className="flex items-center gap-1.5"><ChevronRight className="w-3 h-3" /><span className="text-text">{article.title}</span></li>
        </motion.ol>
      </nav>

      {/* Hero */}
      <section className="relative pb-8 sm:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />Back to Blog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/10 text-accent border border-accent/20">
                {article.category}
              </span>
              {article.featured && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-8">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{article.publishedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="relative pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <img decoding="async" src={article.image.url} alt={article.image.alt} className="w-full rounded-2xl aspect-[21/9] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Article content */}
            <article className="lg:col-span-2">
              {article.content.map((block, i) => renderContent(block, i))}

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-white/[0.06]">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-muted" />
                  {article.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-xs rounded-full bg-white/[0.04] border border-white/[0.08] text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Author */}
              {author && (
                <AnimatedSection delay={0.1}>
                  <div className="glass rounded-2xl p-6 border border-white/[0.06] text-center">
                    <img decoding="async" src={author.avatar} alt={author.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
                    <h3 className="text-base font-semibold text-text">{author.name}</h3>
                    <p className="text-sm text-muted mb-3">{author.role}</p>
                    <p className="text-sm text-muted leading-relaxed">{author.bio}</p>
                    <div className="mt-4 flex justify-center gap-3">
                      {author.social.twitter && (
                        <a href={author.social.twitter} className="text-muted hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                      )}
                      {author.social.linkedin && (
                        <a href={author.social.linkedin} className="text-muted hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </a>
                      )}
                      {author.social.website && (
                        <a href={author.social.website} className="text-muted hover:text-white transition-colors">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Related Articles */}
              {related.length > 0 && (
                <AnimatedSection delay={0.2}>
                  <div className="glass rounded-2xl p-6 border border-white/[0.06]">
                    <h3 className="text-sm font-semibold tracking-widest uppercase text-muted mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {related.map((ra) => (
                        <Link key={ra.id} to={`/blog/${ra.slug}`} className="group flex gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white/[0.04]">
                            <img decoding="async" src={ra.image.url} alt={ra.image.alt} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-sm font-medium text-text group-hover:text-accent transition-colors line-clamp-2">
                              {ra.title}
                            </h4>
                            <p className="text-xs text-muted mt-1">{ra.publishedDate}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Newsletter mini */}
              <AnimatedSection delay={0.3}>
                <div className="glass rounded-2xl p-6 border border-white/[0.06] text-center">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-accent mb-3">Newsletter</h3>
                  <p className="text-sm text-muted mb-4">Get insights delivered to your inbox.</p>
                  <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2">
                    <input type="email" placeholder="Your email" className="h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.10] rounded-full text-text placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors" required />
                    <button type="submit" className="h-10 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(255,107,0,0.3)] transition-all">
                      Subscribe
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles Grid */}
      {related.length > 0 && (
        <section className="relative pb-16 sm:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">More in {article.category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((ra, i) => (
                  <motion.div key={ra.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }}>
                    <Link to={`/blog/${ra.slug}`} className="block h-full group">
                      <article className="glass rounded-2xl overflow-hidden h-full border border-white/[0.06] hover:border-accent/20 transition-all duration-500">
                        <div className="relative aspect-[16/9] overflow-hidden glass">
                          <img decoding="async" src={ra.image.url} alt={ra.image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[10px] text-text">{ra.category}</span>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="text-base font-semibold text-text mb-2 group-hover:text-accent transition-colors line-clamp-2">{ra.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-muted">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ra.publishedDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{ra.readTime}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection delay={0.1}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Work With Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Ready to Bring Your{' '}
              <span className="text-gradient">Ideas to Life?</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Whether you need a digital product, a brand identity, or a growth strategy  let's build something exceptional together.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#cta" className="px-9 py-4 text-lg font-medium bg-accent text-black rounded-full hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                Start a Project <ArrowRight className="w-5 h-5" />
              </a>
              <Link to="/blog" className="px-9 py-4 text-lg font-medium border border-gray-300 text-text rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 inline-flex items-center gap-2">
                More Articles
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
