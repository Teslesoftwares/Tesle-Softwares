import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Kwame Adjei',
    role: 'Group CEO',
    company: 'Transcorp Africa',
    quote: 'Tesle replaced 11 different systems across our group. We went from monthly reconciliations taking two weeks to real-time consolidated financials in one click. ROI was realised in under four months.',
    initials: 'KA',
  },
  {
    name: 'Chioma Obi',
    role: 'CTO',
    company: 'Pivot Financial Services',
    quote: 'We evaluated Oracle NetSuite, SAP Business One, and Zoho before choosing Tesle. The AI-native architecture, Africa-specific compliance, and responsiveness of the team sealed it. Year one, our operational costs dropped 32%.',
    initials: 'CO',
  },
  {
    name: 'David Mwangi',
    role: 'COO',
    company: 'East Africa Logistics',
    quote: 'Our supply chain runs on Tesle. End-to-end visibility from procurement to last-mile delivery. AI demand forecasting reduced stockouts by 67% and inventory carrying costs by 23%.',
    initials: 'DM',
  },
  {
    name: 'Amina Diallo',
    role: 'Director of HR',
    company: 'West African Banking Corp',
    quote: 'HR was our biggest pain point  five different systems for payroll, recruitment, performance, leave, and compliance. Tesle unified everything across 3,000 employees in 5 countries. Payroll errors dropped to zero.',
    initials: 'AD',
  },
  {
    name: 'Tunde Bakare',
    role: 'CEO',
    company: 'Titan Healthcare',
    quote: 'Implementing Tesle was the best technology decision we made. The platform is intuitive enough that our teams adopted it organically  we barely needed training.',
    initials: 'TB',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    setCurrent(index);
    containerRef.current?.children[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.01] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            Client Success Stories
          </span>
          <h2 className="heading text-3xl sm:text-4xl md:text-5xl text-text leading-tight">
            Trusted by{' '}
            <span className="text-gradient">200+ organisations</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            Hear from the CEOs, CTOs, and operators who run their organisations on Tesle.
          </p>
        </motion.div>

        <div className="hidden md:grid md:grid-cols-3 gap-4 mt-12 sm:mt-16">
          {testimonials.slice(0, 3).map((t, i) => (
            <TestimonialCard key={t.name} {...t} index={i} />
          ))}
        </div>

        <div className="md:hidden mt-12">
          <div
            ref={containerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-none px-[7.5vw]"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((t, i) => (
              <div key={t.name} className="snap-center shrink-0 w-[85vw]">
                <TestimonialCard {...t} index={i} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'bg-accent w-6' : 'bg-muted/30 hover:bg-muted/50'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => scrollTo(Math.max(0, current - 1))}
              disabled={current === 0}
              className="w-10 h-10 rounded-full card flex items-center justify-center text-muted hover:text-text disabled:opacity-30 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo(Math.min(testimonials.length - 1, current + 1))}
              disabled={current === testimonials.length - 1}
              className="w-10 h-10 rounded-full card flex items-center justify-center text-muted hover:text-text disabled:opacity-30 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, company, quote, initials, index }: {
  name: string; role: string; company: string; quote: string; initials: string; index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="card rounded-2xl p-6 h-full flex flex-col hover:card-hover transition-all"
    >
      <Quote className="w-6 h-6 text-accent/30 mb-3" />
      <p className="text-sm text-muted leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-glass">
        <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-xs font-semibold text-accent">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-text">{name}</p>
          <p className="text-xs text-muted">{role}, {company}</p>
        </div>
      </div>
    </motion.div>
  );
}
