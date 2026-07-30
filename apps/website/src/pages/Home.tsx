import { SEO } from '@/components/layout/SEO';
import { StructuredData } from '@/components/layout/StructuredData';
import { organizationSchema, websiteSchema, localBusinessSchema } from '@/lib/structuredData';
import { Hero } from '@/components/sections/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Globe, Headphones, Code2, DollarSign,
  HeartPulse, GraduationCap, Building2, Factory, HardHat, Hotel,
  Truck, Church, CheckCircle2, Brain, Users, BarChart3, Sparkles,
  Mail, Phone, MapPin, Star, ChevronRight,
  Layers, Briefcase, Cpu, Target, Repeat, Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { products } from '@/data/products';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.6 },
};

const industries = [
  { name: 'Healthcare', icon: HeartPulse, slug: 'healthcare' },
  { name: 'Education', icon: GraduationCap, slug: 'education' },
  { name: 'Financial Services', icon: Building2, slug: 'financial-services' },
  { name: 'Manufacturing', icon: Factory, slug: 'manufacturing' },
  { name: 'Construction', icon: HardHat, slug: 'construction' },
  { name: 'Hospitality', icon: Hotel, slug: 'hospitality' },
  { name: 'Transportation', icon: Truck, slug: 'transportation' },
  { name: 'Churches', icon: Church, slug: 'churches' },
];

const testimonials = [
  { name: 'Kwame Asante', role: 'CFO, GhanaTextiles', text: 'Tesle ERP replaced 8 different tools. We saved $120K in the first year and our close process went from 5 days to 2 hours.', rating: 5 },
  { name: 'Amina Osei', role: 'CEO, FreshFarm Markets', text: 'The AI inventory predictions reduced our waste by 40%. For a perishable goods business, that is a game changer.', rating: 5 },
  { name: 'David Mwangi', role: 'CTO, SafeHealth', text: 'Hospital module transformed our patient flow. We handle 3x more patients with the same staff. The AI scheduling is brilliant.', rating: 5 },
];

export default function Home() {
  return (
    <main>
      <SEO />
      <StructuredData data={organizationSchema()} />
      <StructuredData data={websiteSchema()} />
      <StructuredData data={localBusinessSchema()} />

      {/* ====== HERO + TRUSTED BY (fills first screen) ====== */}
      <section id="home" className="relative h-[calc(100vh-3.5rem)]">
        {/* Hero fills entire section including behind trusted by */}
        <div className="absolute inset-0">
          <Hero />
        </div>
        {/* Signup banner pinned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 py-6 bg-accent border-t border-white/20">
          <div className="w-full px-4 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm sm:text-base text-white/80 text-center sm:text-left leading-relaxed">
              <span className="font-semibold text-white">Get the full Tesle experience.</span> Create a free account to explore all products and install apps.
            </p>
            <Link
              to="/create-account"
              className="shrink-0 px-6 py-2.5 rounded-lg bg-white text-accent-dark text-sm font-bold hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* ====== ABOUT / MANIFESTO ====== */}
      <section id="about" className="py-12 sm:py-16 bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              The Manifesto
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-4">
              Technology should remove <span className="text-gradient">complexity</span>, not create it
            </h2>
            <p className="text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Tesle exists because most organizations still rely on disconnected tools, manual processes, and outdated systems. We believe software should work together  one platform, one login, one workspace.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="text-base text-muted leading-relaxed mb-6">
                Most software solves individual problems. Tesle exists to solve the larger challenge of fragmentation. Organizations often purchase separate systems for HR, Finance, Procurement, Inventory, Customer Management, Payroll, and more  each storing information separately, requiring separate logins, and increasing operational costs.
              </p>
              <p className="text-base text-muted leading-relaxed mb-6">
                We believe software should work together. Instead of fragmented systems, organizations should have one connected platform where information flows seamlessly, departments collaborate effectively, and leaders gain real-time visibility into their operations.
              </p>
              <p className="text-base font-semibold text-text">
                That platform is Tesle.
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
              <div className="space-y-3">
                {[
                  'Technology should remove complexity, not create it.',
                  'AI should empower people, not replace them.',
                  'Software should be intuitive enough for anyone to use.',
                  'Security should be built into every layer.',
                  'Innovation should be continuous.',
                  'Excellence should be the standard.',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-text leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== WHAT WE DO ====== */}
      <section id="products" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Our Platform
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text mb-4">
              Everything your business needs,<br className="hidden sm:block" /> <span className="text-gradient">in one place</span>
            </h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Replace dozens of disconnected tools with one AI-native platform. From finance to HR, CRM to inventory  every module shares the same data, the same workflows, and the same intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4 mb-10">
            {products.map((product, i) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03, duration: 0.35 }}
                >
                  <Link
                    to="/create-account"
                    className="group flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12] hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: product.hex, boxShadow: `0 3px 12px ${product.hex}30` }}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-text group-hover:text-accent transition-colors leading-tight">
                      {product.name.replace('Tesle ', '')}
                    </h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div {...fadeUp} className="text-center">
            <Link to="/create-account">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Create Free Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== MID-PAGE SIGNUP BANNER ====== */}
      <section className="py-6 bg-accent/5 border-y border-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted mb-2">Want to see how Tesle works for your business?</p>
          <Link to="/create-account" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-bold hover:bg-accent/90 transition-colors">
            Sign up free — no credit card required <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ====== WHY TESLE / PHILOSOPHY ====== */}
      <section className="py-12 sm:py-16 bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              The Tesle Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-4">
              How we think, <span className="text-gradient">build, and grow</span>
            </h2>
            <p className="text-base text-muted max-w-2xl mx-auto">
              The mindset that shapes every product, decision, and innovation within Tesle.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: Layers, title: 'Platforms, Not Projects', desc: 'A project has a beginning and an end. A platform grows continuously. Every feature strengthens the ecosystem.' },
              { icon: Briefcase, title: 'Solve Business Problems', desc: 'Before building any feature, we ask: "What business problem are we solving?" Technology is the means, not the goal.' },
              { icon: Cpu, title: 'Intelligence Should Be Invisible', desc: 'The best AI does not interrupt work  it improves work. Tesle AI quietly assists, recommends, and automates.' },
              { icon: Target, title: 'Simplicity Is a Competitive Advantage', desc: 'Enterprise software is often powerful but difficult to use. We reject unnecessary complexity.' },
              { icon: Repeat, title: 'Integration Creates Value', desc: 'Every Tesle application is part of one connected ecosystem. Information entered once is available everywhere.' },
              { icon: Eye, title: 'Design Communicates Trust', desc: 'Professional design reflects professional engineering. Every interaction communicates confidence and quality.' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-accent/10 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text mb-1">{f.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== TESLE AI ====== */}
      <section id="ai" className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Artificial Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-4">
              Intelligence that scales <span className="text-gradient">with you</span>
            </h2>
            <p className="text-base text-muted max-w-2xl mx-auto leading-relaxed">
              Artificial Intelligence should not feel like a separate product. It should feel like a natural part of every workflow. The best AI does not interrupt work  it improves work.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="space-y-3 mb-8">
                {[
                  'AI agents that automate repetitive tasks across departments',
                  'Custom chatbots trained on your business knowledge',
                  'Predictive analytics for demand, revenue, and cash flow',
                  'Natural language queries  ask questions, get answers',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                    <span className="text-sm text-text leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Link to="/create-account">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Explore Tesle AI
                  </Button>
                </Link>
                <Link to="/create-account">
                  <Button variant="outline" size="lg">
                    Book a Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Brain, title: 'AI Agents', desc: 'Autonomous task execution across modules', color: '#d946ef' },
                  { icon: Sparkles, title: 'Smart Chatbots', desc: 'Customer & employee AI assistants', color: '#8b5cf6' },
                  { icon: BarChart3, title: 'Predictions', desc: 'Demand, revenue & cash flow forecasting', color: '#0ea5e9' },
                  { icon: Zap, title: 'Auto-Workflows', desc: 'Intelligent process orchestration', color: '#f59e0b' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}15` }}>
                      <item.icon className="w-5 h-5" style={{ color: item.color }} />
                    </div>
                    <h3 className="text-sm font-semibold text-text mb-1">{item.title}</h3>
                    <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/5 to-purple-500/5 rounded-3xl -z-10 blur-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== INDUSTRIES ====== */}
      <section id="solutions" className="py-12 sm:py-16 bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Industry Solutions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-4">
              Vertical solutions for <span className="text-gradient">every sector</span>
            </h2>
            <p className="text-base text-muted max-w-2xl mx-auto">
              Pre-configured workflows, compliance rules, and AI models tailored to the industries that power Africa's economy.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link
                    to="/create-account"
                    className="group flex flex-col items-center gap-3 p-6 sm:p-8 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-accent/20 hover:shadow-md transition-all text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-text group-hover:text-accent transition-colors">{ind.name}</span>
                    <ChevronRight className="w-4 h-4 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====== TESTIMONIALS ====== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Customer Stories
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
              Trusted by industry leaders
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="flex flex-col p-6 sm:p-7 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-accent/10 transition-all"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-text leading-relaxed flex-1 mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-glass">
                  <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="text-sm font-bold text-accent">{t.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ====== GALLERY ====== */}
      <section id="gallery" className="py-12 sm:py-16 bg-surface/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-4">
              See Tesle in <span className="text-gradient">action</span>
            </h2>
            <p className="text-base text-muted max-w-2xl mx-auto">
              Real results from real businesses. See how organisations across Africa are transforming with Tesle.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5 mb-10">
            {[
              { title: 'CS Services Ltd', desc: 'Professional services website', url: '/portfolio/cs-services-ltd', img: '/images/case-csservices.png' },
              { title: 'Building Dreams Construction Ltd', desc: 'Construction company site', url: '/portfolio/building-dreams-construction', img: '/images/case-buildingdreams.png' },
              { title: 'Lemak Enterprise', desc: 'Business enterprise platform', url: '/portfolio/lemak-enterprise', img: '/images/case-lemak.png' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to="/create-account"
                  className="group block glass rounded-2xl overflow-hidden border border-white/[0.06] hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm font-semibold text-text group-hover:text-accent transition-colors">{item.title}</h3>
                    <p className="text-xs text-muted mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center">
            <Link to="/create-account">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                Create Free Account
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ====== BRANDING ====== */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div {...fadeUp} className="text-center mb-10">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Branding
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text mb-4">
              Design that <span className="text-gradient">speaks volumes</span>
            </h2>
            <p className="text-base text-muted max-w-2xl mx-auto">
              From logos to flyers, we craft visual identities that leave a lasting impression.
            </p>
          </motion.div>

          {/* Flyers */}
          <motion.div {...fadeUp} className="mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-text mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-accent" />
              Flyers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { src: 'https://i.pinimg.com/564x/02/dc/84/02dc84d6d3b38ea4b3091a686f884fb0.jpg', alt: 'Corporate flyer design' },
                { src: 'https://i.pinimg.com/564x/81/78/a1/8178a163edbe0c1d765c5510c666d08f.jpg', alt: 'Modern corporate flyer' },
                { src: 'https://i.pinimg.com/564x/39/19/30/391930582ccb8007ac7429302d0682a3.jpg', alt: 'Corporate flyer template' },
                { src: 'https://i.pinimg.com/564x/28/58/15/28581563d6f9092ec2f52d3a5664ee96.jpg', alt: 'Business flyer design' },
                { src: 'https://i.pinimg.com/564x/0d/00/f5/0d00f5157cda8e4d9cc1a4b11ea8447e.jpg', alt: 'Flyer design' },
                { src: 'https://i.pinimg.com/564x/f2/44/15/f24415aa548a31fc7730ca8e9bc5d817.jpg', alt: 'Flyer examples' },
                { src: 'https://i.pinimg.com/564x/12/8b/1d/128b1d61eb15a61bdd0c1075684531f0.jpg', alt: 'Graphics flyer' },
                { src: 'https://i.pinimg.com/564x/13/dc/40/13dc40bc4698748bf02fedb9924f4d37.jpg', alt: 'Design typography' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden glass border border-white/[0.06] hover:border-accent/30 transition-all"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Company Logo Designs */}
          <motion.div {...fadeUp}>
            <h3 className="text-lg sm:text-xl font-bold text-text mb-5 flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-accent" />
              Company Logo Designs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {[
                { src: 'https://i.pinimg.com/564x/25/3b/d2/253bd26431e9dff0b4285367625857d5.jpg', alt: 'Logo & brand identity' },
                { src: 'https://i.pinimg.com/564x/79/09/88/7909880412fff841717ef426d77436fe.jpg', alt: 'Minimal architect logo' },
                { src: 'https://i.pinimg.com/564x/59/f7/25/59f7251feae60720cb559a2b01bba16e.jpg', alt: 'Logo design' },
                { src: 'https://i.pinimg.com/564x/5a/08/3c/5a083c99dbdd9d68ea15a3ecbb06fa21.jpg', alt: 'Zenith logo branding' },
                { src: 'https://i.pinimg.com/564x/33/23/7e/33237ebe88dc52a78cf4484ab897bef7.jpg', alt: 'Logo & identity' },
                { src: 'https://i.pinimg.com/564x/51/8e/d0/518ed0a1a523e0805dab26687dcb21ba.jpg', alt: 'Logo design inspiration' },
                { src: 'https://i.pinimg.com/564x/bd/3c/1d/bd3c1d609d3955fb85e93817ff3f1f77.jpg', alt: 'Business logo typography' },
                { src: 'https://i.pinimg.com/564x/25/3b/d2/253bd26431e9dff0b4285367625857d5.jpg', alt: 'Corporate logo design' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  className="group aspect-square rounded-xl overflow-hidden glass border border-white/[0.06] hover:border-accent/30 transition-all p-4 flex items-center justify-center bg-white"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== CTA + CONTACT ====== */}
      <section id="contact" className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            {...fadeUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent via-accent-dark to-accent p-10 sm:p-16 text-center"
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-purple-500/20 blur-3xl translate-y-1/3 -translate-x-1/4" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Ready to transform<br className="hidden sm:block" /> your business?
              </h2>
              <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto mb-8">
                Join 50,000+ users across 15+ African markets. Start free today  no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/create-account" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-accent-dark rounded-xl text-sm font-bold hover:bg-white/90 transition-colors">
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/create-account" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/15 text-white border border-white/25 rounded-xl text-sm font-semibold hover:bg-white/25 transition-colors">
                  Talk to Sales
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            {[
              { icon: Mail, label: 'hello@teslesoftwares.com', href: 'mailto:hello@teslesoftwares.com' },
              { icon: Phone, label: '+23353 838 7208', href: 'tel:+233538387208' },
              { icon: MapPin, label: 'Accra, Ghana', href: undefined },
            ].map((item) => {
              const Tag = item.href ? 'a' : 'div';
              return (
                <Tag
                  key={item.label}
                  {...(item.href ? { href: item.href } : {})}
                  className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-surface border border-glass hover:border-accent/20 transition-all text-center"
                >
                  <item.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-text">{item.label}</span>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
