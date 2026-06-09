import { motion } from 'framer-motion';
import {
  Code2, Globe, Smartphone, Palette, Camera, Video,
  PenTool, TrendingUp, Search, Bot, Music4, Share2,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { SectionTitle } from '@/components/ui/SectionTitle';

const services = [
  { icon: Code2, title: 'Software Development', description: 'Custom software solutions built with modern architectures — from enterprise platforms to scalable microservices.', gradient: 'from-accent/20 to-transparent' },
  { icon: Globe, title: 'Website Development', description: 'High-performance websites and web applications with stunning design, blazing speed, and seamless UX.', gradient: 'from-purple/20 to-transparent' },
  { icon: Smartphone, title: 'Mobile App Development', description: 'Native and cross-platform mobile apps that deliver exceptional experiences on iOS and Android.', gradient: 'from-accent/20 to-transparent' },
  { icon: Palette, title: 'Graphics & Branding', description: 'Complete brand identity design including logos, typography, color systems, and visual guidelines.', gradient: 'from-purple/20 to-transparent' },
  { icon: Camera, title: 'Photography', description: 'Professional photography services for products, events, corporate headshots, and commercial campaigns.', gradient: 'from-accent/20 to-transparent' },
  { icon: Video, title: 'Videography', description: 'Cinematic video production from concept to final cut — commercials, promos, tutorials, and brand stories.', gradient: 'from-purple/20 to-transparent' },
  { icon: PenTool, title: 'Content Creation', description: 'Strategic content that captivates — copywriting, social media content, blog posts, and multimedia storytelling.', gradient: 'from-accent/20 to-transparent' },
  { icon: TrendingUp, title: 'Digital Marketing', description: 'Data-driven marketing campaigns across all channels to grow your reach, engagement, and conversions.', gradient: 'from-purple/20 to-transparent' },
  { icon: Search, title: 'SEO', description: 'Search engine optimization that drives organic traffic with technical SEO, content strategy, and link building.', gradient: 'from-accent/20 to-transparent' },
  { icon: Bot, title: 'Business Automation', description: 'Automate workflows, streamline operations, and eliminate repetitive tasks with intelligent automation solutions.', gradient: 'from-purple/20 to-transparent' },
  { icon: Music4, title: 'Music Production', description: 'Professional music production from composition to final master — beats, scoring, mixing, and full-track production.', gradient: 'from-accent/20 to-transparent' },
  { icon: Share2, title: 'Digital Distribution & Promotion', description: 'Get your music on Spotify, Apple Music, and all major platforms with strategic promotion and playlist pitching.', gradient: 'from-purple/20 to-transparent' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function Features() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Services"
          title="What we deliver"
          subtitle="From code to creative — a full-spectrum digital agency built to bring your vision to life."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <GlassCard className="h-full group !p-5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.gradient} border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
