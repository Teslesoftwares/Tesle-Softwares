import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { portfolioProjects, getProjectCategories } from '@/data/portfolio';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function Portfolio() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getProjectCategories();
  const activeCategory = selectedCategory;
  const setActiveCategory = (v: string | null) => setSelectedCategory(v);

  const filtered = portfolioProjects.filter((p) => {
    const matchCategory = !activeCategory || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main>
      <SEO title="Portfolio" description="Explore our work across 7 categories  software, web, mobile, branding, photography, videography, and marketing. See how we help African businesses grow." />
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              A selection of projects we've delivered across software, web, mobile, branding,
              photography, videography, and marketing  each crafted with precision and purpose.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="relative -mt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-8 text-sm bg-white border border-gray-200 rounded-full text-text placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              <button
                onClick={() => setActiveCategory(null)}
                className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 ${
                  !activeCategory
                    ? 'bg-accent text-black border-accent'
                    : 'border-white/[0.12] text-muted hover:text-white hover:border-white/30'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                  className={`flex-shrink-0 px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-accent text-black border-accent'
                      : 'border-white/[0.12] text-muted hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">No projects found</h3>
              <p className="text-sm text-muted max-w-md mx-auto">
                {searchQuery
                  ? `No projects match "${searchQuery}". Try a different search term or clear the filter.`
                  : 'No projects in this category yet. Check back soon.'}
              </p>
              {(activeCategory || searchQuery) && (
                <button
                  onClick={() => { setActiveCategory(null); setSearchQuery(''); }}
                  className="mt-6 px-5 py-2 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(255,107,0,0.3)] transition-all"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="columns-1 sm:columns-2 lg:columns-3 gap-4"
            >
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="break-inside-avoid mb-4"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats bar */}
      <AnimatedSection>
        <section className="relative pb-24 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="glass rounded-3xl p-8 sm:p-12 border border-white/[0.06]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-gradient">{portfolioProjects.length}</div>
                  <p className="mt-1 text-sm text-muted">Projects Delivered</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-gradient">{categories.length}</div>
                  <p className="mt-1 text-sm text-muted">Service Categories</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-gradient">{portfolioProjects.filter((p) => p.testimonial).length}</div>
                  <p className="mt-1 text-sm text-muted">Happy Clients</p>
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-bold text-gradient">
                    {new Set(portfolioProjects.flatMap((p) => p.technologies)).size}
                  </div>
                  <p className="mt-1 text-sm text-muted">Technologies Used</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
