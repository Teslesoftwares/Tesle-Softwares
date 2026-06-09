import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

const posts = [
  {
    title: 'The Future of Web Development: Trends Shaping 2026',
    excerpt:
      'From AI-powered interfaces to edge computing, explore the technologies redefining how we build for the web.',
    category: 'Technology',
    date: 'Jun 2, 2026',
    readTime: '5 min read',
    gradient: 'from-accent/20 via-purple/10 to-transparent',
  },
  {
    title: 'How to Choose the Right Tech Stack for Your Startup',
    excerpt:
      'A practical guide to evaluating frameworks, languages, and infrastructure for your next venture.',
    category: 'Engineering',
    date: 'May 28, 2026',
    readTime: '8 min read',
    gradient: 'from-purple/20 via-accent/10 to-transparent',
  },
  {
    title: 'Branding in the Age of AI: Staying Human-Centered',
    excerpt:
      'Why authentic brand identity matters more than ever as AI-generated content becomes ubiquitous.',
    category: 'Design',
    date: 'May 20, 2026',
    readTime: '6 min read',
    gradient: 'from-accent/15 via-purple/15 to-transparent',
  },
];

export default function BlogPosts() {
  return (
    <section id="blog" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Latest Insights"
          title="Thoughts on tech & design"
          subtitle="Articles, guides, and perspectives from the Tesle team."
        />

        <div className="mt-16 sm:mt-20 grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <GlassCard className="group h-full !p-0 overflow-hidden flex flex-col">
                {/* Gradient header area */}
                <div className={`h-32 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass text-[10px] font-semibold text-accent border-accent/20">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-white leading-snug mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-5 pt-4 border-t border-white/[0.06] text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Button variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
            View All Articles
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
