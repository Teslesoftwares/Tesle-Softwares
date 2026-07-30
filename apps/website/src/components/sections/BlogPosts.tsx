import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

const posts = [
  {
    title: 'The Case for an African Operating System: Why One Platform Beats Ten Tools',
    excerpt: 'Fragmented software is costing African businesses millions in lost productivity. Here is why a unified operating system is the only way forward.',
    category: 'Enterprise Tech',
    date: 'Jun 15, 2026',
    readTime: '7 min read',
    gradient: 'from-accent/20 via-accent/5 to-transparent',
  },
  {
    title: 'AI in African Enterprise: Moving Beyond the Hype',
    excerpt: 'How forward-thinking African organisations are deploying AI across ERP, CRM, HR, and financial operations  and seeing measurable ROI.',
    category: 'Artificial Intelligence',
    date: 'Jun 8, 2026',
    readTime: '10 min read',
    gradient: 'from-accent/20 via-accent/10 to-transparent',
  },
  {
    title: 'Building a Multi-Country Payroll System That Actually Works',
    excerpt: 'The complexities of payroll compliance across 15+ African markets  and how Tesle solved them with an AI-native approach.',
    category: 'Product',
    date: 'Jun 1, 2026',
    readTime: '6 min read',
    gradient: 'from-accent/15 via-accent/5 to-transparent',
  },
];

export default function BlogPosts() {
  return (
    <section id="blog" className="relative py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Insights & Resources"
          title="Thought leadership for the AI era"
          subtitle="Articles, guides, and perspectives from the Tesle team on enterprise software, AI, and the future of African business."
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
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass text-[10px] font-semibold text-accent border-accent/20">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-text leading-snug mb-3 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 mt-5 pt-4 border-t border-glass text-xs text-muted">
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
