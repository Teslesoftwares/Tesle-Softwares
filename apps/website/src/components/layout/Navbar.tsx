import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Briefcase, Landmark, Kanban, BarChart3, Headphones,
  Truck, Receipt, Package, MessageSquare, Blocks, ChevronDown, Shield,
  Code2, BookOpen, GraduationCap, Building2, ShoppingBag, HeartPulse,
  Hotel, Globe, Cpu, Gauge, Layers, Rocket, Sparkles,
  Bookmark, Newspaper, HelpCircle, Bot, ExternalLink, Home,
  Lightbulb, Target, Heart, ArrowRight, Brain,
  ShoppingCart, CreditCard, Church,
  Factory, HardHat, HeartHandshake, Menu, X, Settings,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const productCategories = [
  {
    name: 'Core Business',
    items: [
      { label: 'Tesle ERP', slug: 'erp', icon: LayoutDashboard, desc: 'Finance, operations, and supply chain' },
      { label: 'Tesle Projects', slug: 'projects', icon: Kanban, desc: 'Project delivery and resource planning' },
    ],
  },
  {
    name: 'Sales & People',
    items: [
      { label: 'Tesle CRM', slug: 'crm', icon: Users, desc: 'Sales and customer relationships' },
      { label: 'Tesle HR', slug: 'hr', icon: Briefcase, desc: 'End-to-end HR management' },
      { label: 'Tesle Payroll', slug: 'payroll', icon: Receipt, desc: 'Multi-country payroll and compliance' },
    ],
  },
  {
    name: 'Finance & Supply Chain',
    items: [
      { label: 'Tesle Accounting', slug: 'accounting', icon: Landmark, desc: 'GL, AP/AR, and financial reporting' },
      { label: 'Tesle Procurement', slug: 'procurement', icon: ShoppingCart, desc: 'Sourcing and purchase management' },
      { label: 'Tesle Inventory', slug: 'inventory', icon: Package, desc: 'Multi-warehouse inventory control' },
      { label: 'Tesle Logistics', slug: 'logistics', icon: Truck, desc: 'Fleet, route, and delivery tracking' },
    ],
  },
  {
    name: 'Vertical Solutions',
    items: [
      { label: 'Tesle POS', slug: 'pos', icon: CreditCard, desc: 'Point of sale and payments' },
      { label: 'Tesle School', slug: 'school', icon: GraduationCap, desc: 'K-12 and tertiary institution mgmt' },
      { label: 'Tesle Hospital', slug: 'hospital', icon: HeartPulse, desc: 'Healthcare and EHR management' },
      { label: 'Tesle Hotel', slug: 'hotel', icon: Hotel, desc: 'Hospitality PMS and reservations' },
      { label: 'Tesle Church', slug: 'church', icon: Church, desc: 'Ministry and congregation management' },
      { label: 'Tesle AI', slug: 'ai', icon: Brain, desc: 'Cross-product intelligence engine' },
    ],
  },
];

const industries = [
  { label: 'Financial Services', slug: 'financial-services', icon: Building2 },
  { label: 'Healthcare', slug: 'healthcare', icon: HeartPulse },
  { label: 'Education', slug: 'education', icon: GraduationCap },
  { label: 'Retail', slug: 'retail', icon: ShoppingBag },
  { label: 'Manufacturing', slug: 'manufacturing', icon: Factory },
  { label: 'Construction', slug: 'construction', icon: HardHat },
  { label: 'Government', slug: 'government', icon: Landmark },
  { label: 'Hospitality', slug: 'hospitality', icon: Hotel },
  { label: 'Transportation', slug: 'transportation', icon: Truck },
  { label: 'Real Estate', slug: 'real-estate', icon: Home },
  { label: 'NGOs', slug: 'ngos', icon: HeartHandshake },
  { label: 'Churches', slug: 'churches', icon: Church },
];

const navItems = [
  { label: 'Tesle AI', href: '/create-account', mega: 'ai' as const },
  { label: 'Products', href: '/create-account', mega: 'products' as const },
  { label: 'Solutions', href: '/create-account', mega: 'solutions' as const },
  { label: 'Enterprise', href: '/create-account', mega: 'enterprise' as const },
  { label: 'Resources', href: '/create-account', mega: 'resources' as const },
  { label: 'Pricing', href: '/create-account', mega: 'pricing' as const },
];

function MegaAI() {
  return (
    <div className="w-[640px] p-5">
      <div className="flex items-start gap-5">
        <div className="flex-1">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted/80 mb-2">AI Capabilities</p>
          <div className="space-y-0.5">
            {[
              { label: 'AI Assistant', icon: Brain, desc: 'Cross-product intelligence engine' },
              { label: 'Smart Automation', icon: Bot, desc: 'Automate workflows across modules' },
              { label: 'Predictive Analytics', icon: BarChart3, desc: 'Forecast trends and anomalies' },
              { label: 'AI Chat', icon: MessageSquare, desc: 'Natural language querying' },
              { label: 'Document Intelligence', icon: BookOpen, desc: 'Auto-classify and extract data' },
              { label: 'Smart Recommendations', icon: Sparkles, desc: 'Personalized insights' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  to="/products/ai"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-text hover:bg-accent/5 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-accent/8 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div>
                    <span className="font-medium text-text">{item.label}</span>
                    <p className="text-[12px] text-muted/90">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-44 shrink-0 pt-7">
          <div className="rounded-xl bg-gradient-to-br from-accent/[0.06] to-accent-blue/[0.04] border border-accent/10 p-4">
            <Brain className="w-6 h-6 text-accent mb-2" />
            <p className="text-sm font-semibold text-text">AI Agents</p>
            <p className="text-xs text-muted/90 mt-1 mb-3 leading-relaxed">Deploy autonomous AI agents across your entire business.</p>
            <Link
              to="/products/ai"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
            >
              Learn more <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function MegaProducts() {
  return (
    <div className="w-[680px] p-5">
      <div className="grid grid-cols-4 gap-5">
        {productCategories.map((cat) => (
          <div key={cat.name}>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-muted/80 mb-2">{cat.name}</p>
            <div className="space-y-0.5">
              {cat.items.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.label}
                    to={`/products/${p.slug}`}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-text hover:bg-accent/5 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-md bg-accent/8 flex items-center justify-center shrink-0">
                      <Icon className="w-3 h-3 text-accent" />
                    </div>
                    <span>{p.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-border/50">
        <Link to="/products" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          Browse all products →
        </Link>
      </div>
    </div>
  );
}

function MegaSolutions() {
  return (
    <div className="w-[580px] p-5">
      <div className="grid grid-cols-2 gap-5">
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted/80 mb-2">By Industry</p>
          <div className="grid grid-cols-2 gap-0.5">
            {industries.slice(0, 8).map((ind) => {
              const Icon = ind.icon;
              return (
                <Link
                  key={ind.label}
                  to={`/industries/${ind.slug}`}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-text hover:bg-accent/5 transition-colors"
                >
                  <Icon className="w-4 h-4 text-accent/60" />
                  <span>{ind.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-muted/80 mb-2">By Department</p>
          <div className="space-y-0.5">
            {[
              { label: 'Finance & Accounting', icon: Landmark },
              { label: 'Human Resources', icon: Briefcase },
              { label: 'Sales & Marketing', icon: Users },
              { label: 'Operations & Supply Chain', icon: Truck },
              { label: 'IT & Engineering', icon: Code2 },
            ].map((dept) => {
              const Icon = dept.icon;
              return (
                <Link key={dept.label} to="/solutions" className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-text hover:bg-accent/5 transition-colors">
                  <Icon className="w-4 h-4 text-accent/60" />
                  <span>{dept.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-border/50">
        <Link to="/solutions" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          View all solutions →
        </Link>
      </div>
    </div>
  );
}

function MegaEnterprise() {
  return (
    <div className="w-[420px] p-5">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted/80 mb-2">Enterprise-Grade Platform</p>
      <div className="grid grid-cols-2 gap-0.5">
        {[
          { label: 'Security & Compliance', icon: Shield },
          { label: 'Dedicated Infrastructure', icon: Cpu },
          { label: 'SSO & Identity', icon: Users },
          { label: '99.9% Uptime SLA', icon: Gauge },
          { label: 'Premium Support', icon: Headphones },
          { label: 'Custom AI Models', icon: Bot },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to="/enterprise"
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-text hover:bg-accent/5 transition-colors"
            >
              <Icon className="w-4 h-4 text-accent" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 pt-3 border-t border-border/50">
        <Link to="/enterprise" className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
          Learn about Enterprise →
        </Link>
      </div>
    </div>
  );
}

function MegaResources() {
  return (
    <div className="w-[520px] p-5">
      <div className="grid grid-cols-3 gap-5">
        {[
          {
            title: 'Developers',
            items: [
              { label: 'API Reference', icon: Code2, href: '/developers' },
              { label: 'SDKs & Libraries', icon: Package, href: '/developers' },
              { label: 'Webhooks', icon: Settings, href: '/developers' },
            ],
          },
          {
            title: 'Learn',
            items: [
              { label: 'Blog', icon: Newspaper, href: '/blog' },
              { label: 'Case Studies', icon: Bookmark, href: '/portfolio' },
              { label: 'Help Center', icon: HelpCircle, href: '/contact' },
            ],
          },
          {
            title: 'Company',
            items: [
              { label: 'About Us', icon: Users, href: '/about' },
              { label: 'Careers', icon: Briefcase, href: '/careers' },
              { label: 'Contact', icon: MessageSquare, href: '/contact' },
            ],
          },
        ].map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-muted/80 mb-2">{col.title}</p>
            <div className="space-y-0.5">
              {col.items.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.label} to={item.href} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm text-muted hover:text-text hover:bg-accent/5 transition-colors">
                    <Icon className="w-4 h-4 text-accent/60" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MegaPricing() {
  return (
    <div className="w-[260px] p-5">
      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted/80 mb-2">Transparent Pricing</p>
      <div className="space-y-0.5">
        {[
          { title: 'Starter', price: 'Free', href: '/pricing#starter' },
          { title: 'Business', price: '$19/mo', href: '/pricing#business' },
          { title: 'Enterprise', price: 'Custom', href: '/enterprise' },
        ].map((p) => (
          <Link
            key={p.title}
            to={p.href}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-accent/5 transition-colors"
          >
            <span className="text-text font-medium">{p.title}</span>
            <span className="text-accent font-semibold">{p.price}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MegaMenu({ type }: { type: string }) {
  switch (type) {
    case 'products': return <MegaProducts />;
    case 'ai': return <MegaAI />;
    case 'solutions': return <MegaSolutions />;
    case 'enterprise': return <MegaEnterprise />;
    case 'resources': return <MegaResources />;
    case 'pricing': return <MegaPricing />;
    default: return null;
  }
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-xl border-b border-black/5 bg-white/80' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center shrink-0">
            <img src="/images/tesle-logo.png" alt="Tesle" className="h-10 w-auto object-contain" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveMega(item.mega!)}
                onMouseLeave={() => setActiveMega(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-all ${
                    activeMega === item.mega
                      ? scrolled ? 'text-accent bg-accent/8' : 'text-white bg-white/15'
                      : scrolled ? 'text-text/70 hover:text-text hover:bg-accent/5' : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  onClick={(e) => {
                    if (item.mega) {
                      e.preventDefault();
                      navigate(item.href);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.mega && (
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${activeMega === item.mega ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                <AnimatePresence>
                  {item.mega && activeMega === item.mega && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.12, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-xl border border-black/8 bg-white shadow-xl shadow-black/8 overflow-hidden"
                    >
                      <MegaMenu type={item.mega} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/create-account"
              className={`hidden sm:inline-flex px-3 py-1.5 text-sm transition-colors ${scrolled ? 'text-text/70 hover:text-text' : 'text-white/80 hover:text-white'}`}
            >
              Sign In
            </Link>
            <Link
              to="/create-account"
              className="px-4 py-1.5 text-sm font-semibold bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
            >
              Get Started
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-md text-text/60 hover:text-text hover:bg-black/5 transition-colors"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-bg/95 backdrop-blur-2xl" />
            <div className="relative h-full overflow-y-auto px-6 pt-16 pb-8">
              <div className="space-y-0.5">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-text/80 hover:text-text transition-colors rounded-xl hover:bg-accent/5"
                  >
                    <span className="text-base font-medium">{item.label}</span>
                  </Link>
                ))}
                <Link
                  to="/create-account"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-text/80 hover:text-text transition-colors rounded-xl hover:bg-accent/5"
                >
                  <span className="text-base font-medium">Sign In</span>
                </Link>
              </div>

              <div className="mt-6 px-4">
                <Link
                  to="/create-account"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-center text-sm font-semibold bg-accent text-white rounded-xl"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
