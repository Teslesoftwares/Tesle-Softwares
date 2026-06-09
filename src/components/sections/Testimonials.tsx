import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'Nexus Retail',
    quote:
      "They redesigned our entire e-commerce platform and the results were immediate — 40% faster load times and a 25% increase in conversion rate within the first month.",
    avatar: 'SC',
  },
  {
    name: 'Marcus Williams',
    role: 'Founder',
    company: 'HealthSync',
    quote:
      "The mobile app they built for us is exceptional. The team understood our vision from day one and delivered a product that exceeded every expectation.",
    avatar: 'MW',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Marketing Director',
    company: 'Pinnacle Brands',
    quote:
      "Their branding and digital marketing work transformed our identity. We've seen a 3x increase in engagement and a completely new level of brand recognition.",
    avatar: 'ER',
  },
  {
    name: 'James Park',
    role: 'CTO',
    company: 'CloudBase',
    quote:
      "Professional, responsive, and technically brilliant. The software automation they implemented saved us hundreds of hours per month in manual workflows.",
    avatar: 'JP',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    setCurrent(index);
    containerRef.current?.children[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle
          label="Testimonials"
          title="Loved by innovators"
          subtitle="Hear from the teams already shaping the future with Tesle."
        />

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden mt-12">
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => (
              <div key={t.name} className="snap-center shrink-0 w-[85vw]">
                <TestimonialCard {...t} index={i} />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-accent w-6'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => scrollTo(Math.max(0, current - 1))}
              disabled={current === 0}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() =>
                scrollTo(Math.min(testimonials.length - 1, current + 1))
              }
              disabled={current === testimonials.length - 1}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-white disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  name,
  role,
  company,
  quote,
  avatar,
  index,
}: {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <GlassCard className="h-full flex flex-col">
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-sm sm:text-base text-muted leading-relaxed flex-1">
          &ldquo;{quote}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/[0.06]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-purple/30 flex items-center justify-center text-xs font-semibold text-white">
            {avatar}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{name}</p>
            <p className="text-xs text-muted">
              {role}, {company}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
