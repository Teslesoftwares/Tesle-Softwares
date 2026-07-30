import { motion } from 'framer-motion';
import {
  Shield, Cpu, Users, Gauge, Headphones, Bot, ArrowRight, CheckCircle2,
  Lock, Cloud, Server, Building2, Layers, FileSearch, Key, Globe,
  RefreshCw, TrendingUp, GraduationCap, Truck, Briefcase, Database,
  Workflow, HardDrive, Sliders, Eye, BookOpen,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionTitle } from '@/components/ui/SectionTitle';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const sectionBg = 'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent';

function DeploymentDiagram() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <svg viewBox="0 0 720 320" className="w-full h-auto" fill="none">
        <rect x="0" y="0" width="720" height="320" rx="16" fill="rgba(255,255,255,0.02)" />

        {/* Cloud */}
        <rect x="30" y="20" width="200" height="130" rx="12" fill="rgba(255,107,0,0.06)" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
        <Cloud className="absolute" style={{ display: 'none' }} />
        <text x="130" y="55" fill="#00e5ff" fontSize="14" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Tesle Cloud</text>
        <text x="130" y="78" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">SaaS  Managed by Tesle</text>
        <text x="130" y="98" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">Multi-region, auto-scaling</text>
        <text x="130" y="118" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">99.9% SLA, SOC 2</text>
        <rect x="60" y="130" width="140" height="14" rx="4" fill="#00e5ff" fillOpacity="0.15" />

        {/* Private Cloud */}
        <rect x="260" y="20" width="200" height="130" rx="12" fill="rgba(139,92,246,0.06)" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.3" />
        <text x="360" y="55" fill="#a78bfa" fontSize="14" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Private Cloud</text>
        <text x="360" y="78" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">Dedicated VPC / AWS / Azure / GCP</text>
        <text x="360" y="98" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">Customer-managed keys</text>
        <text x="360" y="118" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">Custom SLA, data residency</text>
        <rect x="290" y="130" width="140" height="14" rx="4" fill="#a78bfa" fillOpacity="0.15" />

        {/* On-Premise */}
        <rect x="490" y="20" width="200" height="130" rx="12" fill="rgba(52,211,153,0.06)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />
        <text x="590" y="55" fill="#34d399" fontSize="14" fontFamily="system-ui" fontWeight="600" textAnchor="middle">On-Premise</text>
        <text x="590" y="78" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">Your data centre</text>
        <text x="590" y="98" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">Air-gapped available</text>
        <text x="590" y="118" fill="#94a3b8" fontSize="11" fontFamily="system-ui" textAnchor="middle">Full infrastructure control</text>
        <rect x="520" y="130" width="140" height="14" rx="4" fill="#34d399" fillOpacity="0.15" />

        {/* Shared bottom services */}
        <rect x="80" y="180" width="560" height="110" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        <text x="360" y="205" fill="#94a3b8" fontSize="11" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Shared Enterprise Services (same across all deployments)</text>

        {[
          { label: 'Auth & SSO', x: 130 },
          { label: 'AI Engine', x: 260 },
          { label: 'Audit Logs', x: 390 },
          { label: 'DR & Backup', x: 520 },
        ].map((s) => (
          <g key={s.label}>
            <rect x={s.x - 50} y="215" width="100" height="28" rx="6" fill="rgba(255,107,0,0.06)" stroke="rgba(255,107,0,0.2)" strokeWidth="1" />
            <text x={s.x} y="233" fill="#00e5ff" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">{s.label}</text>
          </g>
        ))}

        {[
          { label: 'Data Encryption', x: 170 },
          { label: 'RBAC', x: 300 },
          { label: 'Compliance', x: 430 },
          { label: 'Monitoring', x: 560 },
        ].map((s) => (
          <g key={s.label}>
            <rect x={s.x - 45} y="253" width="90" height="26" rx="6" fill="rgba(167,139,250,0.06)" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
            <text x={s.x} y="270" fill="#a78bfa" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">{s.label}</text>
          </g>
        ))}

        {/* Connecting lines */}
        <line x1="130" y1="150" x2="130" y2="178" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="360" y1="150" x2="360" y2="178" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="590" y1="150" x2="590" y2="178" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </div>
  );
}

function SSODiagram() {
  return (
    <svg viewBox="0 0 500 120" className="w-full h-auto" fill="none">
      <rect x="0" y="0" width="500" height="120" rx="12" fill="rgba(255,255,255,0.02)" />
      {/* Identity Providers */}
      <rect x="15" y="20" width="90" height="40" rx="8" fill="rgba(255,107,0,0.08)" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
      <text x="60" y="45" fill="#00e5ff" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Okta</text>
      <rect x="15" y="68" width="90" height="40" rx="8" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />
      <text x="60" y="93" fill="#34d399" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Azure AD</text>
      <rect x="115" y="44" width="90" height="40" rx="8" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.3" />
      <text x="160" y="69" fill="#a78bfa" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Google</text>
      {/* SSO Engine */}
      <rect x="230" y="36" width="100" height="50" rx="10" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.5" />
      <text x="280" y="61" fill="#fbbf24" fontSize="12" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Tesle SSO</text>
      <text x="280" y="77" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">SAML / OIDC / SCIM</text>
      {/* Modules */}
      <rect x="360" y="20" width="55" height="36" rx="6" fill="rgba(248,113,113,0.08)" stroke="#f87171" strokeWidth="1" strokeOpacity="0.3" />
      <text x="387" y="43" fill="#f87171" fontSize="10" fontFamily="system-ui" fontWeight="500" textAnchor="middle">ERP</text>
      <rect x="422" y="20" width="55" height="36" rx="6" fill="rgba(96,165,250,0.08)" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.3" />
      <text x="449" y="43" fill="#60a5fa" fontSize="10" fontFamily="system-ui" fontWeight="500" textAnchor="middle">CRM</text>
      <rect x="360" y="64" width="55" height="36" rx="6" fill="rgba(192,132,252,0.08)" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.3" />
      <text x="387" y="87" fill="#c084fc" fontSize="10" fontFamily="system-ui" fontWeight="500" textAnchor="middle">HR</text>
      <rect x="422" y="64" width="55" height="36" rx="6" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />
      <text x="449" y="87" fill="#34d399" fontSize="10" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Fin</text>
      {/* Arrows */}
      <line x1="105" y1="40" x2="113" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="105" y1="88" x2="113" y2="72" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="205" y1="64" x2="228" y2="65" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="330" y1="60" x2="358" y2="38" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="330" y1="65" x2="358" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
    </svg>
  );
}

function DRTimeline() {
  return (
    <svg viewBox="0 0 600 100" className="w-full h-auto" fill="none">
      <rect x="0" y="0" width="600" height="100" rx="12" fill="rgba(255,255,255,0.02)" />
      {/* Timeline line */}
      <line x1="50" y1="50" x2="570" y2="50" stroke="rgba(255,107,0,0.2)" strokeWidth="2" />

      {[
        { label: 'Primary Region', desc: 'Live traffic', x: 80 },
        { label: 'Failover Trigger', desc: 'Automated 30s', x: 210 },
        { label: 'DR Region', desc: 'Traffic routed', x: 340 },
        { label: 'Recovery', desc: 'Full operations', x: 470 },
      ].map((node, i) => (
        <g key={i}>
          <circle cx={node.x} cy={50} r="7" fill={i < 2 ? '#00e5ff' : '#34d399'} fillOpacity="0.3" stroke={i < 2 ? '#00e5ff' : '#34d399'} strokeWidth="2" />
          <text x={node.x} y={32} fill={i < 2 ? '#00e5ff' : '#34d399'} fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">
            {node.label}
          </text>
          <text x={node.x} y={72} fill="#94a3b8" fontSize="10" fontFamily="system-ui" textAnchor="middle">
            {node.desc}
          </text>
        </g>
      ))}
    </svg>
  );
}

const deploymentModels = [
  {
    icon: Cloud,
    title: 'Tesle Cloud',
    subtitle: 'Fully managed SaaS',
    features: ['Multi-region AWS/GCP/Azure', 'Auto-scaling infrastructure', '99.9% uptime SLA', 'SOC 2 Type II certified', 'Automated upgrades & patches', '24/7 infrastructure monitoring'],
    color: '#00e5ff',
  },
  {
    icon: Server,
    title: 'Private Cloud',
    subtitle: 'Dedicated single-tenant',
    features: ['Dedicated VPC or account', 'Customer-managed encryption keys', 'Custom backup & DR policies', 'Advanced network controls', 'Compliance-ready isolation', 'Dedicated capacity provisioning'],
    color: '#a78bfa',
  },
  {
    icon: HardDrive,
    title: 'On-Premise',
    subtitle: 'Deployed in your data centre',
    features: ['Kubernetes-based deployment', 'Air-gapped option available', 'Full infrastructure control', 'Offline operation supported', 'Your hardware, your security', 'On-site installation support'],
    color: '#34d399',
  },
];

const securityFeatures = [
  { icon: Shield, title: 'Role-Based Access', desc: 'Granular RBAC with role hierarchies, segregation of duties, and time-bound access policies. Every user action is governed by their role across all modules.' },
  { icon: FileSearch, title: 'Immutable Audit Logs', desc: 'Every create, update, delete, and view action is logged with user ID, timestamp, IP, and before/after values. Logs are immutable and exportable for SIEM integration.' },
  { icon: Key, title: 'Single Sign-On', desc: 'SAML 2.0, OAuth 2.0, and OpenID Connect. Integrate with Okta, Azure AD, Google Workspace, and any SAML-compliant identity provider.' },
  { icon: Users, title: 'Identity Management', desc: 'Automated user provisioning via SCIM, directory sync (LDAP/AD), lifecycle management, and deprovisioning workflows.' },
];

const complianceItems = [
  { icon: Lock, title: 'SOC 2 Type II', desc: 'Annual audit by licensed CPA firm for security, availability, processing integrity, confidentiality, and privacy.' },
  { icon: Globe, title: 'Data Residency', desc: 'Choose data centres in Africa, Europe, or North America. Data never leaves your chosen jurisdiction without explicit authorisation.' },
  { icon: Eye, title: 'Encryption', desc: 'AES-256 encryption at rest. TLS 1.3 in transit. Customer-managed key (BYOK) option for Private Cloud and On-Premise deployments.' },
  { icon: Briefcase, title: 'Regulatory Compliance', desc: 'Pre-configured for GDPR, NDPR (Nigeria), POPIA (South Africa), and data protection acts across 15+ African markets.' },
];

const supportPlans = [
  {
    name: 'Standard',
    price: 'Included',
    response: '4-hour business response',
    features: ['Email & chat support', 'Knowledge base access', 'Community forum', 'Business hours coverage', 'Standard SLA'],
    popular: false,
  },
  {
    name: 'Premium',
    price: '$99/user/yr',
    response: '1-hour response',
    features: ['24/7 phone, email & chat', 'Dedicated account manager', 'Quarterly business reviews', 'Priority ticket routing', '99.9% uptime SLA guarantee'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    response: '15-min critical response',
    features: ['Named support engineer', '24/7 direct line to engineering', 'Monthly business reviews', 'On-site visits included', 'Custom SLA negotiated'],
    popular: false,
  },
];

export default function Enterprise() {
  return (
    <main className="overflow-hidden">
      <SEO title="Enterprise" description="Enterprise-grade infrastructure, security, deployment flexibility, and premium support for organisations that demand the highest standards." />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Tesle Enterprise
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]">
                Enterprise-grade platform.{' '}
                <span className="text-gradient">Your terms.</span>
              </h1>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                Deploy Tesle the way that works for your organisation  cloud, private cloud, or
                on-premise. Enterprise security, compliance, and support included.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Talk to Sales
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: '99.9%', label: 'Uptime SLA' },
                { value: '15+', label: 'African Markets' },
                { value: '200+', label: 'Enterprise Clients' },
                { value: 'SOC 2', label: 'Type II Certified' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-6 text-center border border-white/[0.04]">
                  <div className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</div>
                  <p className="text-xs sm:text-sm text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ DEPLOYMENT OVERVIEW ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Enterprise Deployment
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Deploy your way.{' '}
                <span className="text-gradient">Run anywhere.</span>
              </h2>
              <p className="mt-4 text-muted text-base sm:text-lg">
                Choose the deployment model that meets your security, compliance, and operational
                requirements. Same platform, same capabilities  your infrastructure, your rules.
              </p>
            </div>

            <motion.div {...fadeUp} className="mt-16 sm:mt-20">
              <DeploymentDiagram />
            </motion.div>

            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {deploymentModels.map((model, i) => {
                const ModelIcon = model.icon;
                return (
                  <motion.div
                    key={model.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <GlassCard className="h-full !p-6">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: `${model.color}15`, border: `1px solid ${model.color}30` }}
                      >
                        <ModelIcon className="w-6 h-6" style={{ color: model.color }} />
                      </div>
                      <h3 className="text-lg font-semibold text-text">{model.title}</h3>
                      <p className="text-xs text-accent font-medium mt-0.5 mb-3">{model.subtitle}</p>
                      <ul className="space-y-2">
                        {model.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm text-muted">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ MULTI-TENANCY + SCALABILITY ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeUp}>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                  Multi-Tenancy
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Isolated tenants.{' '}
                  <span className="text-gradient">Unified platform.</span>
                </h2>
                <p className="mt-4 text-muted text-base leading-relaxed">
                  Tesle's multi-tenant architecture gives each business unit, subsidiary, or client
                  their own logically isolated environment  with their own data, users, and
                  configuration  while you manage everything from a single administrative console.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Per-tenant data isolation with encryption boundary',
                    'Cross-tenant consolidation for group reporting',
                    'Tenant-specific branding, modules, and pricing',
                    'Self-service tenant onboarding and provisioning',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fadeUp}>
                <div className="glass rounded-2xl p-6 sm:p-8 border border-accent/10">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-semibold text-text">Horizontal Scalability</h3>
                  </div>
                  <p className="text-sm text-muted mb-6 leading-relaxed">
                    Tesle's microservices architecture scales horizontally. Add compute capacity on
                    demand  no downtime, no migrations, no re-architecture. From 10 users to
                    100,000+ users, the platform performs identically.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Concurrent Users', value: '100K+' },
                      { label: 'API Throughput', value: '50K req/s' },
                      { label: 'DB Replication', value: 'Sub-50ms' },
                      { label: 'Auto-Scale Trigger', value: '30 seconds' },
                    ].map((s) => (
                      <div key={s.label} className="text-center p-3 rounded-xl glass">
                        <div className="text-sm font-bold text-accent">{s.value}</div>
                        <p className="text-xs text-muted mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ SECURITY ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                Security
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Enterprise security,{' '}
                <span className="text-gradient">built into every layer</span>
              </h2>
              <p className="mt-4 text-muted text-base">
                Defence in depth. From infrastructure to application, every layer of Tesle is
                designed with security as a fundamental requirement, not an afterthought.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div {...fadeUp} className="space-y-6">
                {securityFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-text">{feature.title}</h3>
                        <p className="text-xs text-muted mt-1 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
              <motion.div {...fadeUp}>
                <SSODiagram />
              </motion.div>
            </div>

            {/* Role-based Security diagram */}
            <motion.div {...fadeUp} className="mt-12">
              <div className="glass rounded-2xl p-6 sm:p-8 border border-white/[0.04]">
                <h3 className="text-lg font-semibold text-text mb-4">Role Hierarchy & Segregation of Duties</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { role: 'Super Admin', level: 'Level 4', access: 'Full platform access', users: 'IT / Security' },
                    { role: 'Finance Admin', level: 'Level 3', access: 'All financial modules', users: 'CFO, Finance team' },
                    { role: 'HR Manager', level: 'Level 2', access: 'HR, payroll, recruitment', users: 'HR team' },
                    { role: 'Employee', level: 'Level 1', access: 'Self-service only', users: 'All staff' },
                  ].map((r) => (
                    <div key={r.role} className="glass rounded-xl p-4 border border-white/[0.04]">
                      <p className="text-sm font-semibold text-accent">{r.role}</p>
                      <p className="text-xs text-muted mt-1">{r.level}</p>
                      <p className="text-xs text-muted mt-2">{r.access}</p>
                      <p className="text-xs text-muted mt-1">{r.users}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ COMPLIANCE ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Compliance"
              title="Certified compliance. Global standards."
              subtitle="Tesle undergoes rigorous third-party audits and maintains certifications that meet the strictest regulatory requirements."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {complianceItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} {...stagger} transition={{ delay: i * 0.06, duration: 0.5 }}>
                    <GlassCard className="h-full !p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-base font-semibold text-text mb-2">{item.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            <motion.div {...fadeUp} className="mt-12 p-6 rounded-2xl glass border border-accent/10 text-center max-w-3xl mx-auto">
              <p className="text-sm text-muted">
                Tesle undergoes annual SOC 2 Type II audits, quarterly penetration testing, and
                continuous vulnerability scanning.
                <br />
                <span className="text-accent font-medium">
                  Download our security whitepaper or request a compliance report.
                </span>
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ DISASTER RECOVERY ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeUp}>
                <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
                  Disaster Recovery
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Recovery you can{' '}
                  <span className="text-gradient">rely on.</span>
                </h2>
                <p className="mt-4 text-muted text-base leading-relaxed">
                  Multi-region active-active architecture with automated failover. In the event of a
                  region outage, traffic is routed to your secondary region automatically  typically
                  within 30 seconds. No data loss, no manual intervention.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Recovery Point Objective (RPO)', value: '< 5 minutes' },
                    { label: 'Recovery Time Objective (RTO)', value: '< 15 minutes' },
                    { label: 'Replication', value: 'Synchronous within region' },
                    { label: 'Failover', value: 'Fully automated' },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-4 border border-white/[0.04]">
                      <p className="text-xs text-muted">{s.label}</p>
                      <p className="text-sm font-semibold text-accent mt-1">{s.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeUp}>
                <div className="glass rounded-2xl p-6 border border-accent/10">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-6">Recovery Flow</p>
                  <DRTimeline />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ SUPPORT PLANS ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Support"
              title="Support that matches your ambition"
              subtitle="From standard email support to dedicated engineering teams  choose the level of support your organisation needs."
            />

            <div className="mt-16 sm:mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {supportPlans.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`relative rounded-2xl p-6 transition-all duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-b border-2 border-accent/20 bg-accent/[0.03]'
                      : 'glass'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-black text-xs font-semibold">
                      Recommended
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-text">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-2xl font-bold text-text">{plan.price}</span>
                  </div>
                  <p className="text-xs text-accent mt-1">{plan.response}</p>
                  <ul className="mt-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link to="/contact">
                      <Button variant={plan.popular ? 'primary' : 'outline'} className="w-full">
                        {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ TRAINING + MIGRATION + PROFESSIONAL SERVICES ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Services"
              title="Your success is our priority"
              subtitle="Comprehensive training, migration, and professional services to ensure your Tesle deployment delivers maximum value from day one."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: 'Training',
                  items: ['Admin training (3-day certification)', 'End-user adoption workshops', 'Train-the-trainer programme', 'On-demand e-learning library', 'Quarterly feature update sessions'],
                },
                {
                  icon: Truck,
                  title: 'Migration',
                  items: ['Data migration from legacy systems', 'Validation & reconciliation', 'Phased cutover planning', 'Parallel run support', 'Post-migration audit & sign-off'],
                },
                {
                  icon: Briefcase,
                  title: 'Professional Services',
                  items: ['Solution architecture consulting', 'Custom integration development', 'Workflow automation design', 'AI model training & tuning', 'Ongoing optimisation reviews'],
                },
              ].map((service, i) => {
                const ServiceIcon = service.icon;
                return (
                  <motion.div key={service.title} {...stagger} transition={{ delay: i * 0.06, duration: 0.5 }}>
                    <GlassCard className="h-full !p-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-4">
                        <ServiceIcon className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-text mb-4">{service.title}</h3>
                      <ul className="space-y-2">
                        {service.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted">
                            <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            <motion.div {...fadeUp} className="mt-12 glass rounded-2xl p-6 border border-accent/10 max-w-3xl mx-auto text-center">
              <p className="text-sm text-muted">
                Every Enterprise plan includes a dedicated implementation manager, a tailored
                deployment plan, and access to our entire training and certification programme.
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ CTA ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Ready for enterprise-grade{' '}
                <span className="text-gradient">operations?</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                Talk to our enterprise team about dedicated infrastructure, custom deployment,
                AI models, and premium support for your organisation.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Contact Sales
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="mt-6 text-xs text-muted">
                No commitment required &middot; Custom POC available &middot; SOC 2 compliant &middot; Global data centres
              </p>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
