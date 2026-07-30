import { motion } from 'framer-motion';
import { Newspaper, Bookmark, BookOpen, HelpCircle, MessageSquare, GraduationCap, Heart, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const resourceGroups = [
  {
    title: 'Learn',
    items: [
      { icon: Newspaper, title: 'Blog', desc: 'Articles, guides, and perspectives from the Tesle team.', href: '/blog' },
      { icon: Bookmark, title: 'Case Studies', desc: 'See how organisations use Tesle to transform their operations.', href: '/portfolio' },
      { icon: BookOpen, title: 'Documentation', desc: 'Comprehensive guides for getting started and going deep.', href: '/developers' },
      { icon: HelpCircle, title: 'Help Center', desc: 'FAQs, troubleshooting, and best practices.', href: '/contact' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { icon: MessageSquare, title: 'Community Forum', desc: 'Connect with other Tesle users and share insights.', href: '#', external: true },
      { icon: GraduationCap, title: 'Webinars', desc: 'Live and on-demand sessions covering platform features.', href: '#', external: true },
      { icon: Heart, title: 'Partner Program', desc: 'Become a Tesle implementation partner.', href: '#', external: true },
      { icon: BookOpen, title: 'API Reference', desc: 'Technical documentation for developers.', href: '/developers' },
    ],
  },
];

export default function Resources() {
  return (
    <main>
      <SEO title="Resources" description="Explore Tesle resources  blog, case studies, documentation, help center, and community." />
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }} animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">Resources</span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Everything you need to{' '}
              <span className="text-gradient">succeed</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              From getting started guides to deep technical documentation  we've got you covered.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {resourceGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-2xl font-bold text-text mb-6">{group.title}</h2>
                <div className="space-y-4">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isExternal = 'external' in item && item.external;
                    const Content = (
                      <GlassCard className="!p-5 group hover:border-accent/20 transition-all cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 text-accent" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-base font-semibold text-text group-hover:text-accent transition-colors">{item.title}</h3>
                              {isExternal && <ExternalLink className="w-3 h-3 text-muted/80" />}
                            </div>
                            <p className="text-sm text-muted mt-1">{item.desc}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted/80 group-hover:text-accent transition-colors flex-shrink-0 mt-2" />
                        </div>
                      </GlassCard>
                    );
                    if (isExternal) {
                      return <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer">{Content}</a>;
                    }
                    return <Link key={item.title} to={item.href}>{Content}</Link>;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection>
        <section className="relative pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Can't find what you're looking for?</h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-8">Our support team is here to help. Get in touch and we'll get back to you within 24 hours.</p>
            <Link to="/contact"><Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>Contact Support</Button></Link>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
