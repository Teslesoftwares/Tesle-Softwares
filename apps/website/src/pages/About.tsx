import { motion } from 'framer-motion';
import { Users, Layers, BarChart3, Globe, ArrowRight, Lightbulb, Target, Rocket, Shield, Zap, Heart, Repeat, BookOpen, Briefcase, Eye, Compass, Cpu, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { getIcon } from '@/lib/iconMap';
import { teamMembers, cultureValues } from '@/data/jobs';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stats = [
  { value: '50K+', label: 'Active Users', icon: Users },
  { value: '12', label: 'Enterprise Modules', icon: Layers },
  { value: '99.9%', label: 'Uptime SLA', icon: BarChart3 },
  { value: '15+', label: 'Countries Deployed', icon: Globe },
];

const coreValues = [
  { icon: Star, title: 'Excellence', desc: 'We pursue excellence in every product, every interaction, and every decision. Good enough is never the standard.' },
  { icon: Shield, title: 'Integrity', desc: 'Trust is earned through honesty, transparency, accountability, and ethical behavior. We protect our customers\' trust above all else.' },
  { icon: Lightbulb, title: 'Innovation', desc: 'We embrace curiosity, experimentation, and continuous improvement. Innovation is not an event  it is our daily responsibility.' },
  { icon: Heart, title: 'Customer Success', desc: 'Our success is measured by the success of our customers. We build long-term partnerships, not short-term transactions.' },
  { icon: Zap, title: 'Simplicity', desc: 'Complex technology should feel simple. Every product should reduce friction rather than create it.' },
  { icon: Shield, title: 'Security', desc: 'Every organization entrusts us with valuable information. Protecting that trust is a responsibility we never compromise.' },
  { icon: Users, title: 'Collaboration', desc: 'The best solutions are built together. We value teamwork across departments, customers, partners, and communities.' },
  { icon: BookOpen, title: 'Continuous Learning', desc: 'Technology evolves every day. We commit ourselves to lifelong learning, adaptation, and improvement.' },
  { icon: Globe, title: 'Responsibility', desc: 'Our technology affects people, organizations, and communities. We design responsibly and build with long-term impact in mind.' },
];

const philosophyHighlights = [
  { icon: Layers, title: 'Platforms, Not Projects', desc: 'A project has a beginning and an end. A platform grows continuously. Every feature strengthens the ecosystem.' },
  { icon: Briefcase, title: 'Solve Business Problems', desc: 'Before building any feature, we ask: "What business problem are we solving?" Technology is the means, not the goal.' },
  { icon: Cpu, title: 'Intelligence Should Be Invisible', desc: 'The best AI does not interrupt work  it improves work. Tesle AI quietly assists, recommends, and automates.' },
  { icon: Target, title: 'Simplicity Is a Competitive Advantage', desc: 'Enterprise software is often powerful but difficult to use. We reject unnecessary complexity.' },
  { icon: Repeat, title: 'Integration Creates Value', desc: 'Every Tesle application is part of one connected ecosystem. Information entered once is available everywhere.' },
  { icon: Eye, title: 'Design Communicates Trust', desc: 'Professional design reflects professional engineering. Every interaction should communicate confidence, reliability, and quality.' },
];

const principles = [
  { num: '01', title: 'Platform Before Product' },
  { num: '02', title: 'One Login' },
  { num: '03', title: 'One Workspace' },
  { num: '04', title: 'AI by Default' },
  { num: '05', title: 'Shared Design Language' },
  { num: '06', title: 'Multi-Tenant Architecture' },
  { num: '07', title: 'Role-Based Security' },
  { num: '08', title: 'API First' },
  { num: '09', title: 'Integration by Design' },
  { num: '10', title: 'Data Is an Asset' },
  { num: '11', title: 'Security Before Features' },
  { num: '12', title: 'Performance Matters' },
  { num: '13', title: 'Accessibility for Everyone' },
  { num: '14', title: 'Mobile Ready' },
  { num: '15', title: 'Modular Architecture' },
  { num: '16', title: 'Extensibility' },
  { num: '17', title: 'Continuous Improvement' },
  { num: '18', title: 'Customer Success' },
  { num: '19', title: 'Global Standards, African Understanding' },
  { num: '20', title: 'Build for the Future' },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
  transition: { duration: 0.6 },
};

export default function About() {
  return (
    <main>
      <SEO
        title="About"
        description="Tesle is building the operating system for African businesses  a unified AI-native enterprise platform with ERP, CRM, HRM, Financials, and Analytics modules."
      />

      {/* Hero */}
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
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              About Tesle
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Building the OS for{' '}
              <span className="text-gradient">African Business</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Technology should not be a privilege reserved for a few. It should be the foundation upon which every organization can build, innovate, and grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Tesle Exists */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                The Manifesto
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Why <span className="text-gradient">Tesle Exists</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed">
                <p>
                  Most software solves individual problems. Tesle exists to solve the larger challenge of fragmentation. Organizations often purchase separate systems for HR, Finance, Procurement, Inventory, Customer Management, Payroll, and more  each storing information separately, requiring separate logins, and increasing operational costs.
                </p>
                <p>
                  We believe software should work together. Instead of fragmented systems, organizations should have one connected platform where information flows seamlessly, departments collaborate effectively, and leaders gain real-time visibility into their operations.
                </p>
                <p className="font-semibold text-text">
                  That platform is Tesle.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {[
                { icon: Lightbulb, text: 'Technology should remove complexity, not create it.' },
                { icon: Cpu, text: 'Artificial Intelligence should empower people, not replace them.' },
                { icon: Zap, text: 'Software should be intuitive enough for anyone to use.' },
                { icon: Shield, text: 'Organizations should own and understand their data.' },
                { icon: Rocket, text: 'Security should be built into every layer, not added as an afterthought.' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-start gap-3 glass rounded-xl p-4 border border-white/[0.06]">
                    <Icon className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-text leading-relaxed">{item.text}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Our Promise
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              What we commit to every customer
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-10">
            {['Reliable', 'Secure', 'Scalable', 'Intelligent', 'Accessible', 'Beautifully Designed', 'Easy to Use', 'Built for Collaboration', 'Ready for the Future'].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="glass rounded-xl px-3 py-4 border border-white/[0.06]"
              >
                <span className="text-sm font-medium text-text">{item}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-muted mt-6 max-w-xl mx-auto leading-relaxed">
            If a product does not meet these standards, it is not ready.
          </p>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="glass rounded-2xl p-4 sm:p-6 text-center border border-white/[0.06]"
                >
                  <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <div className="text-2xl sm:text-3xl font-bold text-text tabular-nums">{s.value}</div>
                  <div className="text-xs sm:text-sm text-muted mt-1">{s.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]"
            >
              <Eye className="w-8 h-8 text-accent mb-4" />
              <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">Our Vision</span>
              <h3 className="text-xl sm:text-2xl font-bold text-text mb-4">To build Africa's most trusted AI-native enterprise platform</h3>
              <p className="text-sm text-muted leading-relaxed">
                Empowering organizations of every size to operate smarter, innovate faster, and grow without limits. We envision a future where every organization can access enterprise-grade technology without barriers of complexity, cost, or geography.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06]"
            >
              <Target className="w-8 h-8 text-accent mb-4" />
              <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">Our Mission</span>
              <h3 className="text-xl sm:text-2xl font-bold text-text mb-4">Design and deliver intelligent, secure, interconnected software</h3>
              <p className="text-sm text-muted leading-relaxed">
                Solutions that simplify operations, enable better decisions, and accelerate sustainable growth for organizations across every industry  through exceptional software, remarkable customer experiences, and connected products.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.06] mt-6 text-center"
          >
            <Compass className="w-8 h-8 text-accent mx-auto mb-3" />
            <span className="text-xs font-semibold tracking-widest uppercase text-accent mb-2 block">Our North Star</span>
            <p className="text-lg sm:text-xl font-semibold text-text">
              Empowering every organization to operate smarter through intelligent, connected technology.
            </p>
            <p className="text-sm text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
              Every product, service, partnership, and innovation contributes directly to this objective.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              What drives us
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              The principles that guide every line of code, every product decision, and every customer relationship.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coreValues.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <GlassCard className="h-full !p-5 group border border-white/[0.06] hover:border-accent/20 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="text-base font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      {value.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              The Tesle Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              How we think, build, and grow
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              The mindset that shapes every product, service, employee, and innovation within Tesle.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {philosophyHighlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <GlassCard className="h-full !p-5 border border-white/[0.06] hover:border-accent/20 transition-all duration-300">
                    <Icon className="w-6 h-6 text-accent mb-3" />
                    <h4 className="text-base font-semibold text-text mb-2">{item.title}</h4>
                    <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Principles */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Product Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              The 20 rules that govern every Tesle product
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              No Tesle product, module, service, or feature should be released unless it complies with these principles.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="glass rounded-xl px-3 py-3 border border-white/[0.06] text-center hover:border-accent/30 transition-all"
              >
                <span className="text-[10px] font-mono text-accent/60 block mb-0.5">{p.num}</span>
                <span className="text-xs font-medium text-text leading-tight block">{p.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Meet the people behind Tesle
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              A team of engineers, product builders, and customer success specialists building the operating system for African business.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <GlassCard className="h-full !p-3 sm:!p-6 flex flex-row items-start gap-3 sm:flex-col sm:items-center sm:text-center group">
                  <div className="w-36 h-36 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl flex-shrink-0 overflow-hidden border-2 border-white/[0.08] group-hover:border-accent/30 transition-all duration-500">
                    {member.avatar ? (
                      <img
                        loading="lazy"
                        decoding="async"
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl font-bold text-accent">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-xl font-semibold text-text mb-0.5 sm:mb-1">{member.name}</h3>
                    <p className="text-xs sm:text-sm text-accent mb-2 sm:mb-3">{member.role}</p>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{member.bio}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              Ready to run your business on Tesle?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-muted max-w-xl mx-auto leading-relaxed">
              Book a demo and discover how Tesle can transform your operations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Book a Demo
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
