import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '@/lib/iconMap';
import { SEO } from '@/components/layout/SEO';
import { mediaCategories, getTotalMediaCount } from '@/data/media';
import { MediaCard } from '@/components/ui/MediaCard';
import { Lightbox } from '@/components/ui/Lightbox';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { MediaImageItem, MediaVideoItem, MediaComparisonItem } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const tabVariants = {
  inactive: { opacity: 0.5, scale: 0.95 },
  active: { opacity: 1, scale: 1 },
};

export default function Media() {
  const [activeTab, setActiveTab] = useState(mediaCategories[0]?.slug || '');
  const category = mediaCategories.find((c) => c.slug === activeTab);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<MediaImageItem[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string } | null>(null);

  const totalCount = getTotalMediaCount();

  const openLightbox = (items: MediaImageItem[], index: number) => {
    setLightboxImages(items);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openVideo = (item: MediaVideoItem) => {
    setCurrentVideo({ url: item.videoUrl, title: item.title });
    setVideoOpen(true);
  };

  return (
    <main>
      <SEO title="Media" description="Explore our media showcase  photography, videography, brand imagery, events, and behind-the-scenes from the Tesle team across Ghana." />
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
            }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-1/4 right-1/4 w-40 h-40 rounded-full opacity-20"
            style={{
              background:
                'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)',
            }}
            animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-56 h-56 rounded-full opacity-10"
            style={{
              background:
                'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
            }}
            animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Media Showcase
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Our <span className="text-gradient">Visual World</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              A cinematic journey through our creative lens  from stunning photography and compelling videos
              to breathtaking aerial footage and dramatic transformations.
            </p>

            {/* Hero stats */}
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{totalCount}</div>
                <p className="text-xs text-muted mt-1">Total Media</p>
              </div>
              <div className="w-px h-10 bg-white/[0.08] self-center" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gradient">{mediaCategories.length}</div>
                <p className="text-xs text-muted mt-1">Categories</p>
              </div>
              <div className="w-px h-10 bg-white/[0.08] self-center" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gradient">
                  {mediaCategories.filter((c) => c.type === 'video').reduce((s, c) => s + c.items.length, 0)}
                </div>
                <p className="text-xs text-muted mt-1">Videos</p>
              </div>
              <div className="w-px h-10 bg-white/[0.08] self-center" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gradient">
                  {mediaCategories.filter((c) => c.type === 'image').reduce((s, c) => s + c.items.length, 0)}
                </div>
                <p className="text-xs text-muted mt-1">Photos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="relative -mt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            {mediaCategories.map((cat, i) => {
              const IconComponent = getIcon(cat.icon);
              const isActive = cat.slug === activeTab;
              return (
                <motion.button
                  key={cat.id}
                  variants={tabVariants}
                  initial="inactive"
                  animate={isActive ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(cat.slug)}
                  className={`flex items-center gap-2.5 flex-shrink-0 px-4 py-2.5 rounded-full border transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg`
                      : 'border-white/[0.10] text-muted hover:text-white hover:border-white/25 glass'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium whitespace-nowrap">{cat.title}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-muted'
                  }`}>
                    {cat.items.length}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatePresence mode="wait">
            {category && (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                {/* Category description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm sm:text-base text-muted mb-8 max-w-3xl"
                >
                  {category.description}
                </motion.p>

                {/* Image grid */}
                {category.type === 'image' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="columns-1 sm:columns-2 lg:columns-3 gap-4"
                  >
                    {(category.items as MediaImageItem[]).map((item, i) => (
                      <div key={item.id} className="break-inside-avoid mb-4">
                        <MediaCard
                          item={item}
                          type="image"
                          index={i}
                          onClick={() => openLightbox(category.items as MediaImageItem[], i)}
                        />
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Video grid */}
                {category.type === 'video' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  >
                    {(category.items as MediaVideoItem[]).map((item, i) => (
                      <MediaCard
                        key={item.id}
                        item={item}
                        type="video"
                        index={i}
                        onClick={() => openVideo(item)}
                      />
                    ))}
                  </motion.div>
                )}

                {/* Comparison items */}
                {category.type === 'comparison' && (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid sm:grid-cols-2 gap-6"
                  >
                    {(category.items as MediaComparisonItem[]).map((item, i) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                      >
                        <div className="glass rounded-2xl overflow-hidden border border-white/[0.06]">
                          <BeforeAfterSlider
                            before={item.before}
                            after={item.after}
                            className="rounded-none"
                          />
                          <div className="p-4 sm:p-5">
                            <h3 className="text-base font-semibold text-text mb-1">{item.title}</h3>
                            <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                            {item.tags.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-1.5">
                                {item.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 text-[10px] rounded-full bg-white/[0.04] border border-white/[0.08] text-muted"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)',
            }}
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
              Let's Create Something{' '}
              <span className="text-gradient">Visually Stunning</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Whether you need photography, video production, or creative direction 
              our team is ready to bring your vision to life.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#cta"
                className="px-9 py-4 text-lg font-medium bg-accent text-black rounded-full hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
              >
                Start a Project
              </a>
              <a
                href="/portfolio"
                className="px-9 py-4 text-lg font-medium border border-gray-300 text-text rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 inline-flex items-center gap-2"
              >
                View Our Portfolio
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages.map((item) => ({ url: item.image.url, alt: item.image.alt || item.title, width: item.image.width || 1200, height: item.image.height || 800 }))}
        currentIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onIndexChange={setLightboxIndex}
      />

      {/* Video Player */}
      {currentVideo && (
        <VideoPlayer
          videoUrl={currentVideo.url}
          title={currentVideo.title}
          open={videoOpen}
          onClose={() => setVideoOpen(false)}
        />
      )}
    </main>
  );
}
