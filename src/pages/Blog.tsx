import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X, Calendar, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { blogArticles, getFeaturedArticles, getArticleCategories } from '@/data/blog';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const ITEMS_PER_PAGE = 6;

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const featuredArticles = getFeaturedArticles();
  const categories = getArticleCategories();

  const totalArticles = blogArticles.length;
  const totalAuthors = new Set(blogArticles.map((a) => a.authorSlug)).size;
  const activeCategory = selectedCategory;
  const setActiveCategory = (v: string | null) => setSelectedCategory(v);

  const filtered = blogArticles.filter((a) => {
    const matchCategory = !activeCategory || a.category === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase()) || a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const paginated = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;
  const featured = featuredArticles;

  return (
    <main>
      <SEO title="Blog" description="Insights on software development, design, marketing, and digital transformation in Africa. Read the latest from the Tesle team." />
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Insights & Ideas
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Our <span className="text-gradient">Blog</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              Perspectives on technology, design, marketing, and business growth from the Tesle team.
              We share what we learn so you can build better.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div><div className="text-2xl sm:text-3xl font-bold text-gradient">{totalArticles}</div><p className="text-xs text-muted mt-1">Articles</p></div>
              <div className="w-px h-10 bg-white/[0.08] self-center" />
              <div><div className="text-2xl sm:text-3xl font-bold text-gradient">{categories.length}</div><p className="text-xs text-muted mt-1">Categories</p></div>
              <div className="w-px h-10 bg-white/[0.08] self-center" />
              <div><div className="text-2xl sm:text-3xl font-bold text-gradient">{totalAuthors}</div><p className="text-xs text-muted mt-1">Authors</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="relative -mt-4 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold">Featured Articles</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link to={`/blog/${article.slug}`} className="block h-full group">
                    <article className="glass rounded-2xl overflow-hidden h-full border border-white/[0.06] hover:border-accent/30 transition-all duration-500">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <img loading="lazy" decoding="async" src={article.image.url} alt={article.image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent/90 text-[10px] font-semibold text-black uppercase tracking-wider">
                          Featured
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[10px] text-white/90">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
                        <div className="flex items-center gap-3 text-xs text-muted">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.publishedDate}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search & Filters */}
      <section className="relative pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-8 text-sm bg-white/[0.04] border border-white/[0.08] rounded-full text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 ${
                  !activeCategory ? 'bg-accent text-black border-accent' : 'border-white/[0.12] text-muted hover:text-white hover:border-white/30'
                }`}
              >All</button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat ? 'bg-accent text-black border-accent' : 'border-white/[0.12] text-muted hover:text-white hover:border-white/30'
                  }`}
                >{cat}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {paginated.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No articles found</h3>
              <p className="text-sm text-muted max-w-md mx-auto">
                {searchQuery ? `No articles match "${searchQuery}". Try a different search term.` : 'No articles in this category yet.'}
              </p>
              {(activeCategory || searchQuery) && (
                <button onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
                  className="mt-6 px-5 py-2 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all"
                >Clear filters</button>
              )}
            </motion.div>
          ) : (
            <>
              <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {paginated.map((article, i) => (
                  <motion.div key={article.id} variants={itemVariants}>
                    <Link to={`/blog/${article.slug}`} className="block h-full group">
                      <article className="glass rounded-2xl overflow-hidden h-full border border-white/[0.06] hover:border-accent/20 transition-all duration-500">
                        <div className="relative aspect-[16/9] overflow-hidden bg-white/[0.02]">
                          <img loading="lazy" decoding="async" src={article.image.url} alt={article.image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm text-[10px] text-white/90">
                            {article.category}
                          </span>
                        </div>
                        <div className="p-4 sm:p-5">
                          <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted leading-relaxed line-clamp-2 mb-3">{article.excerpt}</p>
                          <div className="flex items-center gap-3 text-xs text-muted">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{article.publishedDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {hasMore && (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-center">
                  <button onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                    className="px-6 py-3 text-sm font-medium border border-white/20 text-white rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Load More Articles
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="glass rounded-3xl p-8 sm:p-12 text-center border border-white/[0.06]">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Newsletter
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Stay Ahead of the Curve
              </h2>
              <p className="text-sm sm:text-base text-muted max-w-lg mx-auto mb-8">
                Get the latest insights on technology, design, and business growth delivered to your inbox every two weeks.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 h-12 px-5 text-sm bg-white/[0.04] border border-white/[0.10] rounded-full text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
                  required
                />
                <button type="submit"
                  className="h-12 px-7 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all duration-300 flex items-center gap-2 justify-center flex-shrink-0"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
              <p className="mt-4 text-xs text-muted">No spam. Unsubscribe anytime.</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
