import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronRight, Home, Star, Quote } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { StructuredData } from '@/components/layout/StructuredData';
import { breadcrumbSchema } from '@/lib/structuredData';
import { portfolioProjects, getRelatedProjects } from '@/data/portfolio';
import { Lightbox } from '@/components/ui/Lightbox';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { Button } from '@/components/ui/Button';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const categoryColors: Record<string, string> = {
  'Software': 'from-cyan-500 to-blue-600',
  'Websites': 'from-emerald-500 to-teal-600',
  'Mobile Apps': 'from-violet-500 to-purple-600',
  'Branding': 'from-pink-500 to-rose-600',
  'Photography': 'from-amber-500 to-orange-600',
  'Videography': 'from-red-500 to-rose-600',
  'Marketing Campaigns': 'from-green-500 to-emerald-600',
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = portfolioProjects.find((p) => p.slug === slug);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center pt-24 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted mb-8">The project you're looking for doesn't exist.</p>
          <Link to="/portfolio">
            <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const related = getRelatedProjects(project, 3);
  const catColor = categoryColors[project.category] || 'from-accent to-purple';

  return (
    <main>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-4">
        <motion.ol
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-muted flex-wrap"
        >
          <li>
            <Link to="/" className="hover:text-white transition-colors">
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" />
            <Link to="/portfolio" className="hover:text-white transition-colors">
              Portfolio
            </Link>
          </li>
          <li className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{project.title}</span>
          </li>
        </motion.ol>
      </nav>

      {/* Hero */}
      <section className="relative pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r ${catColor} text-white`}>
                {project.category}
              </span>
              <span className="text-sm text-muted">{project.year}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-accent font-medium">
              {project.client.company}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="relative pb-12 sm:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                className={`group relative overflow-hidden rounded-xl bg-white/[0.02] ${
                  i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <img decoding="async"
                  src={img.url}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ minHeight: i === 0 ? '400px' : '200px' }}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-2xl sm:text-3xl font-bold mb-6">About This Project</h2>
                <p className="text-base sm:text-lg text-muted leading-relaxed">
                  {project.fullDescription}
                </p>
              </AnimatedSection>

              {/* Results */}
              {project.results.length > 0 && (
                <AnimatedSection delay={0.1}>
                  <div className="mt-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Key Results</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.results.map((result, i) => (
                        <motion.div
                          key={result}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.08 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${catColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <span className="text-sm sm:text-base text-muted">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Technologies */}
              <AnimatedSection delay={0.15}>
                <div className="glass rounded-2xl p-6 border border-white/[0.06]">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-muted mb-4">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-white/[0.04] border border-white/[0.08] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Client */}
              <AnimatedSection delay={0.2}>
                <div className="glass rounded-2xl p-6 border border-white/[0.06]">
                  <h3 className="text-sm font-semibold tracking-widest uppercase text-muted mb-4">
                    Client
                  </h3>
                  <p className="text-white font-medium">{project.client.name}</p>
                  <p className="text-sm text-muted">{project.client.company}</p>
                </div>
              </AnimatedSection>

              {/* Testimonial */}
              {project.testimonial && (
                <AnimatedSection delay={0.25}>
                  <div className="glass rounded-2xl p-6 border border-white/[0.06]">
                    <Quote className="w-6 h-6 text-accent mb-3" />
                    <p className="text-sm text-muted leading-relaxed mb-4 italic">
                      &ldquo;{project.testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${catColor} flex items-center justify-center text-xs font-bold text-white`}>
                        {project.testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{project.testimonial.author}</p>
                        <p className="text-xs text-muted">{project.testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="relative pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <h2 className="text-2xl sm:text-3xl font-bold mb-10">Related Projects</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rp, i) => (
                  <motion.div
                    key={rp.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <ProjectCard project={rp} />
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
            style={{
              background:
                'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection delay={0.1}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Start Your Project
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Have a Similar{' '}
              <span className="text-gradient">Project in Mind?</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Let's create something exceptional together. Book a free consultation
              and we'll provide a tailored proposal within 48 hours.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Book a Free Consultation
              </Button>
              <Link to="/portfolio">
                <Button variant="outline" size="lg">
                  View All Projects
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={project.images}
        currentIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />
    </main>
  );
}
