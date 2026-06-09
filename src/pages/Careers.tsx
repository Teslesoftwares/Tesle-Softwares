import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '@/lib/iconMap';
import { ArrowRight, ChevronDown, Send, X, MapPin, Briefcase, Clock } from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { positions, internships, teamMembers, cultureValues, benefits } from '@/data/jobs';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { JobPosition } from '@/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

function JobCard({ position, onApply }: { position: JobPosition; onApply: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div variants={itemVariants} className="glass rounded-2xl border border-white/[0.06] overflow-hidden hover:border-accent/20 transition-all duration-500">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent/10 text-accent border border-accent/20">
                {position.department}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/[0.04] border border-white/[0.08] text-muted">
                {position.type}
              </span>
              {position.featured && (
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Featured
                </span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">{position.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{position.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{position.type}</span>
              <span className="flex items-center gap-1">{position.salary}</span>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
              expanded ? 'bg-accent text-black' : 'bg-white/[0.06] text-muted hover:text-white'
            }`}
          >
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-5">
                <div>
                  <p className="text-sm text-muted leading-relaxed">{position.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Responsibilities</h4>
                  <ul className="space-y-1.5">
                    {position.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Requirements</h4>
                  <ul className="space-y-1.5">
                    {position.requirements.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple mt-1.5 flex-shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={onApply}
                    className="px-5 py-2.5 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all duration-300 inline-flex items-center gap-2"
                  >
                    Apply Now <Send className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-muted">{position.benefits}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      {!expanded && (
        <button
          onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
          className="w-full px-5 py-2.5 text-xs font-medium text-muted hover:text-white hover:bg-white/[0.02] transition-colors border-t border-white/[0.06] flex items-center justify-center gap-1"
        >
          View Details <ChevronDown className="w-3 h-3" />
        </button>
      )}
    </motion.div>
  );
}

export default function Careers() {
  const [applyModal, setApplyModal] = useState<JobPosition | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setApplyModal(null); setSubmitted(false); }, 2500);
  };

  const featuredPositions = positions.filter((p) => p.featured);
  const otherPositions = positions.filter((p) => !p.featured);

  return (
    <main>
      <SEO title="Careers" description="Join the Tesle team. Explore open positions, internships, and company culture at Ghana's leading digital agency." />
      {/* Hero */}
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
              Join Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Shape the Future{' '}
              <span className="text-gradient">With Us</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              We're building a team of passionate people who want to do the best work of their careers
              while transforming the digital landscape in Africa.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-8">
              <div><div className="text-2xl sm:text-3xl font-bold text-gradient">{positions.length}</div><p className="text-xs text-muted mt-1">Open Positions</p></div>
              <div className="w-px h-10 bg-white/[0.08] self-center" />
              <div><div className="text-2xl sm:text-3xl font-bold text-gradient">{teamMembers.length}+</div><p className="text-xs text-muted mt-1">Team Members</p></div>
              <div className="w-px h-10 bg-white/[0.08] self-center" />
              <div><div className="text-2xl sm:text-3xl font-bold text-gradient">{internships.length}</div><p className="text-xs text-muted mt-1">Internships</p></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Culture */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Our Culture
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Why Tesle?</h2>
              <p className="text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
                {data.culture.mission}
              </p>
            </div>
          </AnimatedSection>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
          >
            {cultureValues.map((value) => {
              const IconComponent = getIcon(value.icon);
              return (
                <motion.div key={value.title} variants={itemVariants}>
                  <GlassCard className="h-full !p-5 text-center">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{value.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">What We Offer</h2>
              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                We believe in taking care of our team. Here's what you can expect when you join Tesle.
              </p>
            </div>
          </AnimatedSection>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {benefits.map((benefit) => {
              const IconComponent = getIcon(benefit.icon);
              return (
                <motion.div key={benefit.title} variants={itemVariants}>
                  <GlassCard className="h-full !p-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-purple/20 border border-white/[0.06] flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{benefit.description}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Meet the People Behind Tesle</h2>
              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                A diverse team of makers, thinkers, and doers spread across Ghana and beyond.
              </p>
            </div>
          </AnimatedSection>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <GlassCard className="h-full !p-4 text-center" hover={false}>
                  <img loading="lazy" decoding="async" src={member.avatar} alt={member.name} className="w-20 h-20 rounded-2xl mx-auto mb-3 object-cover" />
                  <h3 className="text-sm font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-xs text-accent mb-2">{member.role}</p>
                  <p className="text-xs text-muted leading-relaxed line-clamp-3">{member.bio}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="relative pb-16 sm:pb-24" id="positions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Open Positions
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Join Our Team</h2>
              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                We're looking for talented people who share our values. Browse our open roles below.
              </p>
            </div>
          </AnimatedSection>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            className="space-y-3"
          >
            {featuredPositions.map((pos) => (
              <JobCard key={pos.id} position={pos} onApply={() => setApplyModal(pos)} />
            ))}
            {otherPositions.map((pos) => (
              <JobCard key={pos.id} position={pos} onApply={() => setApplyModal(pos)} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internships */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Internships
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Start Your Journey</h2>
              <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                Gain real-world experience working on meaningful projects. Our internships are designed to accelerate your growth.
              </p>
            </div>
          </AnimatedSection>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {internships.map((internship) => (
              <motion.div key={internship.id} variants={itemVariants}>
                <GlassCard className="h-full !p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-accent/10 text-accent border border-accent/20">
                      {internship.department}
                    </span>
                    <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-white/[0.04] border border-white/[0.08] text-muted">
                      Internship
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{internship.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-muted mb-3">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{internship.duration}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{internship.location}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-3">{internship.description}</p>
                  <div className="mb-3">
                    <h4 className="text-xs font-semibold text-white mb-1.5">Requirements:</h4>
                    <ul className="space-y-1">
                      {internship.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-muted">
                          <span className="w-1 h-1 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <span className="text-xs text-accent font-medium">{internship.stipend}</span>
                    <button
                      onClick={() => {
                        setApplyModal({
                          id: 0, slug: internship.title.toLowerCase().replace(/\s+/g, '-'),
                          title: internship.title, department: internship.department,
                          type: 'Internship', location: internship.location,
                          remote: true, featured: false,
                          description: internship.description,
                          responsibilities: [],
                          requirements: internship.requirements,
                          benefits: internship.stipend,
                          salary: internship.stipend,
                        });
                      }}
                      className="px-4 py-1.5 text-xs font-medium bg-accent text-black rounded-full hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
                    >
                      Apply
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.02] to-transparent" />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection delay={0.1}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Don't See Your Role?
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              We're Always Looking for{' '}
              <span className="text-gradient">Great Talent</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              If you're passionate about technology, design, or marketing and think you'd be a great fit at Tesle,
              we want to hear from you. Send us your CV and a note about yourself.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:careers@tesle.ai" className="px-9 py-4 text-lg font-medium bg-accent text-black rounded-full hover:shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                Send Your CV <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#positions" className="px-9 py-4 text-lg font-medium border border-white/20 text-white rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300 inline-flex items-center gap-2">
                View Openings
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Apply Modal */}
      <AnimatePresence>
        {applyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4"
            onClick={() => { if (!submitted) setApplyModal(null); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg glass rounded-3xl p-6 sm:p-8 border border-white/[0.06]"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">Apply for {applyModal.title}</h3>
                  <p className="text-sm text-muted">{applyModal.department} · {applyModal.type}</p>
                </div>
                <button onClick={() => { if (!submitted) setApplyModal(null); }}
                  className="w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-muted hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-purple/30 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-accent" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">Application Submitted!</h4>
                  <p className="text-sm text-muted">We'll review your application and get back to you within 5 business days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1.5">Full Name *</label>
                      <input type="text" required className="w-full h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.10] rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1.5">Email *</label>
                      <input type="email" required className="w-full h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.10] rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Phone</label>
                    <input type="tel" className="w-full h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.10] rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors" placeholder="+233 XX XXX XXXX" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Cover Letter / Why you? *</label>
                    <textarea required rows={4} className="w-full px-4 py-3 text-sm bg-white/[0.04] border border-white/[0.10] rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors resize-none" placeholder="Tell us about yourself and why you're interested in this role..." />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted mb-1.5">Portfolio / LinkedIn / CV Link</label>
                    <input type="url" className="w-full h-10 px-4 text-sm bg-white/[0.04] border border-white/[0.10] rounded-xl text-white placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors" placeholder="https://..." />
                  </div>
                  <button type="submit"
                    className="w-full h-12 text-sm font-medium bg-accent text-black rounded-full hover:shadow-[0_0_25px_rgba(0,229,255,0.3)] transition-all duration-300 inline-flex items-center justify-center gap-2"
                  >
                    Submit Application <Send className="w-4 h-4" />
                  </button>
                  <p className="text-center text-[10px] text-muted">We'll respond within 5 business days.</p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

const data = {
  culture: {
    mission: "At Tesle, we're on a mission to empower African businesses with world-class digital solutions. We believe in the power of technology to transform industries, create opportunities, and drive economic growth across the continent."
  }
};
