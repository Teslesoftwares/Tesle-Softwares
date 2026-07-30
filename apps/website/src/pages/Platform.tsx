import { motion } from 'framer-motion';
import { ArrowRight, Shield, Key, Building2, Layout, Bell, BarChart3, CreditCard, Brain, Code2, Store, Cloud, CheckCircle2, Users, Globe, Lock, Server, Zap, Layers, RefreshCw, FileText, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/layout/SEO';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

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

const products = [
  { label: 'Enterprise ERP', color: '#00e5ff' },
  { label: 'Customer CRM', color: '#34d399' },
  { label: 'Human Resources', color: '#a78bfa' },
  { label: 'Financial Mgmt', color: '#f472b6' },
  { label: 'Project & Portfolio', color: '#fbbf24' },
  { label: 'Business Intel', color: '#f87171' },
  { label: 'Customer Support', color: '#38bdf8' },
  { label: 'Supply Chain', color: '#4ade80' },
  { label: 'Payroll & Compliance', color: '#60a5fa' },
  { label: 'Inventory Mgmt', color: '#c084fc' },
  { label: 'Collaboration', color: '#2dd4bf' },
  { label: 'Platform & API', color: '#22d3ee' },
];

function ArchitectureDiagram() {
  const rows = [
    { label: 'Experience Layer', items: ['Analytics', 'Workspace', 'Marketplace', 'Notifications'], color: '#00e5ff' },
    { label: 'Application Layer', items: products.slice(0, 6).map(p => p.label), color: '#a78bfa' },
    { label: 'Application Layer', items: products.slice(6).map(p => p.label), color: '#a78bfa' },
    { label: 'Platform Services', items: ['Authentication', 'AI Engine', 'Payments', 'Developer APIs'], color: '#34d399' },
    { label: 'Infrastructure', items: ['Cloud Computing', 'Data Storage', 'Networking', 'Security'], color: '#fbbf24' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <svg viewBox="0 0 800 500" className="w-full h-auto" fill="none">
        {/* Background */}
        <rect x="0" y="0" width="800" height="500" rx="16" fill="url(#archBg)" opacity="0.5" />

        {/* Connection lines */}
        {[0, 1, 2, 3, 4].map((rowIdx) => {
          const row = rows[rowIdx];
          const y = 60 + rowIdx * 88;
          const items = row.items;
          return items.map((_, itemIdx) => (
            <g key={`${rowIdx}-${itemIdx}-lines`}>
              {rowIdx < 4 && (
                <line
                  x1={110 + itemIdx * 130}
                  y1={y + 44}
                  x2={110 + itemIdx * 130}
                  y2={y + 88}
                  stroke="rgba(255,107,0,0.15)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
              )}
            </g>
          ));
        })}

        {/* Row backgrounds */}
        {rows.map((row, rowIdx) => {
          const y = 60 + rowIdx * 88;
          return (
            <g key={`bg-${rowIdx}`}>
              <rect x="30" y={y - 10} width="740" height={80} rx="10" fill={row.color} fillOpacity="0.04" />
            </g>
          );
        })}

        {/* Row labels */}
        {rows.map((row, rowIdx) => {
          const y = 60 + rowIdx * 88;
          return (
            <g key={`label-${rowIdx}`}>
              <rect x="35" y={y} width="14" height="14" rx="3" fill={row.color} fillOpacity="0.3" />
              <text x="58" y={y + 11} fill="#94a3b8" fontSize="10" fontFamily="system-ui" fontWeight="600">
                {row.label}
              </text>
            </g>
          );
        })}

        {/* Item boxes */}
        {rows.map((row, rowIdx) => {
          const y = 60 + rowIdx * 88;
          return row.items.map((item, itemIdx) => {
            const x = 40 + itemIdx * 130;
            return (
              <g key={`item-${rowIdx}-${itemIdx}`}>
                <rect
                  x={x}
                  y={y + 22}
                  width="116"
                  height="46"
                  rx="8"
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="1"
                />
                <text
                  x={x + 58}
                  y={y + 49}
                  fill={row.color}
                  fontSize="11"
                  fontFamily="system-ui"
                  fontWeight="500"
                  textAnchor="middle"
                >
                  {item}
                </text>
              </g>
            );
          });
        })}

        {/* Defs */}
        <defs>
          <radialGradient id="archBg" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(255,107,0,0.08)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.02)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function EcosystemDiagram() {
  const nodes = [
    { id: 'auth', x: 150, y: 60, label: 'Auth', icon: Key, color: '#00e5ff' },
    { id: 'org', x: 280, y: 60, label: 'Org Mgmt', icon: Building2, color: '#34d399' },
    { id: 'workspace', x: 410, y: 60, label: 'Workspace', icon: Layout, color: '#a78bfa' },
    { id: 'notif', x: 540, y: 60, label: 'Notifications', icon: Bell, color: '#f472b6' },
    { id: 'analytics', x: 90, y: 190, label: 'Analytics', icon: BarChart3, color: '#fbbf24' },
    { id: 'payments', x: 220, y: 190, label: 'Payments', icon: CreditCard, color: '#f87171' },
    { id: 'ai', x: 350, y: 190, label: 'AI Engine', icon: Brain, color: '#38bdf8' },
    { id: 'api', x: 480, y: 190, label: 'Dev APIs', icon: Code2, color: '#4ade80' },
    { id: 'marketplace', x: 610, y: 190, label: 'Marketplace', icon: Store, color: '#c084fc' },
    { id: 'infra', x: 350, y: 310, label: 'Cloud Infra', icon: Cloud, color: '#60a5fa' },
  ];

  const connections = [
    ['auth', 'org'], ['auth', 'workspace'], ['auth', 'api'],
    ['org', 'workspace'], ['org', 'analytics'],
    ['workspace', 'notif'],
    ['notif', 'analytics'], ['notif', 'api'],
    ['analytics', 'ai'], ['analytics', 'payments'],
    ['payments', 'marketplace'],
    ['ai', 'analytics'], ['ai', 'api'],
    ['api', 'marketplace'],
    ['infra', 'auth'], ['infra', 'ai'], ['infra', 'api'], ['infra', 'payments'], ['infra', 'analytics'],
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <svg viewBox="0 0 700 400" className="w-full h-auto">
        <defs>
          <radialGradient id="ecoBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,107,0,0.05)" />
            <stop offset="100%" stopColor="rgba(139,92,246,0.01)" />
          </radialGradient>
          {nodes.map(n => (
            <radialGradient key={n.id} id={`glow-${n.id}`} cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.2" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0" />
            </radialGradient>
          ))}
        </defs>

        <rect x="0" y="0" width="700" height="400" rx="16" fill="url(#ecoBg)" />

        {/* Glows */}
        {nodes.map(n => (
          <circle key={`glow-${n.id}`} cx={n.x} cy={n.y} r="50" fill={`url(#glow-${n.id})`} opacity="0.6" />
        ))}

        {/* Connections */}
        {connections.map(([from, to], i) => {
          const f = nodes.find(n => n.id === from)!;
          const t = nodes.find(n => n.id === to)!;
          return (
            <line
              key={`conn-${i}`}
              x1={f.x}
              y1={f.y}
              x2={t.x}
              y2={t.y}
              stroke="rgba(255,107,0,0.12)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const IconComponent = n.icon;
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r="28" fill="rgba(255,255,255,0.04)" stroke={n.color} strokeWidth="1.5" strokeOpacity="0.4" />
              <text x={n.x} y={n.y + 48} fill={n.color} fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function AuthFlowDiagram() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <svg viewBox="0 0 600 160" className="w-full h-auto" fill="none">
        <rect x="0" y="0" width="600" height="160" rx="12" fill="rgba(255,255,255,0.02)" />
        {/* User */}
        <rect x="20" y="55" width="90" height="50" rx="10" fill="rgba(255,107,0,0.08)" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
        <text x="65" y="85" fill="#00e5ff" fontSize="13" fontFamily="system-ui" fontWeight="500" textAnchor="middle">User</text>
        {/* Arrow */}
        <line x1="110" y1="80" x2="155" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <polygon points="153,74 163,80 153,86" fill="rgba(255,255,255,0.2)" />
        {/* SSO */}
        <rect x="165" y="55" width="100" height="50" rx="10" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />
        <text x="215" y="85" fill="#34d399" fontSize="13" fontFamily="system-ui" fontWeight="500" textAnchor="middle">SSO / SAML</text>
        {/* Arrow */}
        <line x1="265" y1="80" x2="310" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <polygon points="308,74 318,80 308,86" fill="rgba(255,255,255,0.2)" />
        {/* MFA */}
        <rect x="320" y="55" width="100" height="50" rx="10" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.3" />
        <text x="370" y="85" fill="#a78bfa" fontSize="13" fontFamily="system-ui" fontWeight="500" textAnchor="middle">MFA</text>
        {/* Arrow */}
        <line x1="420" y1="80" x2="465" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
        <polygon points="463,74 473,80 463,86" fill="rgba(255,255,255,0.2)" />
        {/* Platform */}
        <rect x="475" y="55" width="105" height="50" rx="10" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.3" />
        <text x="527" y="85" fill="#fbbf24" fontSize="13" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Tesle Platform</text>
      </svg>
    </div>
  );
}

export default function Platform() {
  return (
    <main className="overflow-hidden">
      <SEO
        title="Platform"
        description="The Tesle ecosystem  unified authentication, organization management, workspace, notifications, analytics, payments, AI engine, developer APIs, marketplace, and cloud infrastructure."
      />

      {/* ============ HERO ============ */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Platform
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              The <span className="text-gradient">Tesle Ecosystem</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              Every product, service, and capability in the Tesle platform is built on a shared foundation.
              Authentication, organisation management, workspace, notifications, analytics, payments, AI, APIs,
              and marketplace  all connected, all unified.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="relative pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ArchitectureDiagram />
          </motion.div>
        </div>
      </section>

      {/* ============ 1. UNIFIED AUTHENTICATION ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <SectionTitle
                  label="Unified Authentication"
                  title="One identity. Every module."
                  subtitle="Single sign-on, multi-factor authentication, and identity federation across all Tesle products. Users authenticate once  every module trusts the same identity layer."
                  align="left"
                />
                <div className="mt-8 space-y-3">
                  {['SAML 2.0, OAuth 2.0, OpenID Connect', 'Multi-factor authentication (TOTP, SMS, biometric)', 'Directory sync via SCIM (Azure AD, Okta, Google)', 'Role-based access control across all modules'].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div {...fadeUp}>
                <AuthFlowDiagram />
              </motion.div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Shield, title: 'SSO', desc: 'One login for every Tesle module. Integrates with any SAML/OIDC identity provider.' },
                { icon: Lock, title: 'MFA', desc: 'TOTP, SMS, email, and hardware key support with risk-based authentication policies.' },
                { icon: Users, title: 'Directory Sync', desc: 'Auto-provision users, groups, and permissions from your corporate directory via SCIM.' },
                { icon: Key, title: 'Session Mgmt', desc: 'Centralised session control with concurrent login limits and forced logout on policy change.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                    <GlassCard className="!p-5 h-full">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="text-sm font-semibold text-text mb-1.5">{item.title}</h3>
                      <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 2. ORGANIZATION MANAGEMENT ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Organization Management"
              title="Multi-org. Multi-team. Multi-currency."
              subtitle="Organise your entire company hierarchy within Tesle. From holding groups to departments, every module respects your org structure."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Building2, title: 'Multi-Entity', desc: 'Manage holding companies, subsidiaries, and divisions under one platform with consolidated reporting.' },
                { icon: Users, title: 'Team Hierarchy', desc: 'Organise users into departments, teams, and projects. Permissions cascade naturally through the tree.' },
                { icon: Globe, title: 'Multi-Currency', desc: 'Set currency per entity. Tesle handles FX conversion, cross-entity billing, and consolidated P&L automatically.' },
                { icon: Shield, title: 'Role Templates', desc: 'Define reusable role templates  finance admin, HR manager, project viewer  and apply across any entity.' },
              ].map((item, i) => {
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
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 3. WORKSPACE ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Workspace"
              title="Your command centre"
              subtitle="Every user gets a personalised workspace that aggregates tasks, notifications, reports, and quick actions from every module they use."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Layout, title: 'Custom Dashboards', desc: 'Drag-and-drop widgets from any module. Pin KPIs, charts, and tables to build the exact view your role needs.' },
                { icon: Eye, title: 'Unified Inbox', desc: 'A single feed of approvals, alerts, mentions, and system notifications from every Tesle module.' },
                { icon: Zap, title: 'Quick Actions', desc: 'Create an invoice, approve leave, generate a report  all from your workspace without navigating away.' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} {...stagger} transition={{ delay: i * 0.08, duration: 0.5 }}>
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
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 4. NOTIFICATIONS ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeUp}>
                {/* Notification flow diagram */}
                <div className="w-full max-w-md mx-auto">
                  <svg viewBox="0 0 480 260" className="w-full h-auto" fill="none">
                    <rect x="0" y="0" width="480" height="260" rx="12" fill="rgba(255,255,255,0.02)" />
                    {/* Event sources */}
                    <rect x="20" y="20" width="126" height="44" rx="8" fill="rgba(255,107,0,0.08)" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="83" y="47" fill="#00e5ff" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Module Events</text>
                    <rect x="20" y="76" width="126" height="44" rx="8" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="83" y="103" fill="#34d399" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Webhooks</text>
                    <rect x="20" y="132" width="126" height="44" rx="8" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="83" y="159" fill="#a78bfa" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">System Alerts</text>
                    {/* Notification engine */}
                    <rect x="190" y="60" width="116" height="90" rx="12" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth="1.5" strokeOpacity="0.5" />
                    <text x="248" y="107" fill="#fbbf24" fontSize="13" fontFamily="system-ui" fontWeight="600" textAnchor="middle">Notification Engine</text>
                    {/* Channels */}
                    <rect x="360" y="20" width="100" height="44" rx="8" fill="rgba(248,113,113,0.08)" stroke="#f87171" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="410" y="47" fill="#f87171" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">In-App</text>
                    <rect x="360" y="76" width="100" height="44" rx="8" fill="rgba(96,165,250,0.08)" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="410" y="103" fill="#60a5fa" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Email / SMS</text>
                    <rect x="360" y="132" width="100" height="44" rx="8" fill="rgba(192,132,252,0.08)" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="410" y="159" fill="#c084fc" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Slack / Teams</text>
                    {/* Arrows */}
                    <line x1="146" y1="42" x2="188" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="146" y1="98" x2="188" y2="100" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="146" y1="154" x2="188" y2="120" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="306" y1="80" x2="358" y2="42" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="306" y1="100" x2="358" y2="98" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    <line x1="306" y1="120" x2="358" y2="154" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  </svg>
                </div>
              </motion.div>

              <div>
                <SectionTitle
                  label="Notifications"
                  title="Real-time intelligence across every module"
                  subtitle="A unified notification engine that aggregates events from every Tesle module and delivers them through the right channel at the right time."
                  align="left"
                />
                <div className="mt-8 space-y-4">
                  {[
                    { icon: Bell, title: 'Event-Driven Architecture', desc: 'Every action across modules  invoice approval, leave request, stock alert  triggers events that flow through the notification engine.' },
                    { icon: RefreshCw, title: 'Multi-Channel Delivery', desc: 'In-app notifications, email digests, SMS, WhatsApp, Slack, Microsoft Teams. Configure channel per event type per user.' },
                    { icon: Bell, title: 'Smart Routing', desc: 'Rule-based routing: urgent alerts go to SMS and push, daily summaries go to email, low-priority items stay in your notification tray.' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                          <p className="text-xs text-muted mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 5. ANALYTICS ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Analytics"
              title="Cross-module intelligence"
              subtitle="Break down silos. Analytics in Tesle pulls data from every module  ERP, CRM, HR, finance, inventory  into one unified reporting layer."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: BarChart3, title: 'Unified Reporting', desc: 'Combine financial data with CRM pipelines, HR headcount, and inventory turns in a single report. No more exporting to Excel.' },
                { icon: Eye, title: 'Custom Dashboards', desc: 'Build role-specific dashboards with widgets from any module. CEO gets a strategic view, ops gets operational metrics.' },
                { icon: FileText, title: 'Automated Schedules', desc: 'Schedule PDF/CSV reports daily, weekly, or monthly. Auto-deliver to stakeholders via email or Slack.' },
                { icon: Zap, title: 'Natural Language Queries', desc: 'Ask "What was our revenue last quarter by region?" and get an instant answer. No SQL, no BI team required.' },
              ].map((item, i) => {
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
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 6. PAYMENTS ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionTitle
                  label="Payments"
                  title="Billing, invoicing, and payment processing"
                  subtitle="The payments layer powers subscription billing, one-time invoicing, and payment gateway integrations across every module that touches transactions."
                  align="left"
                />
                <div className="mt-8 space-y-3">
                  {['Subscription billing with usage-based pricing', 'Multi-currency invoicing with African tax compliance', 'Stripe, Paystack, Flutterwave, and Interswitch gateways', 'Automated dunning, receipts, and reconciliation'].map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted">
                      <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <motion.div {...fadeUp}>
                <div className="w-full max-w-md mx-auto">
                  <svg viewBox="0 0 460 200" className="w-full h-auto" fill="none">
                    <rect x="0" y="0" width="460" height="200" rx="12" fill="rgba(255,255,255,0.02)" />
                    {/* Invoice */}
                    <rect x="20" y="30" width="110" height="60" rx="10" fill="rgba(255,107,0,0.08)" stroke="#00e5ff" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="75" y="58" fill="#00e5ff" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Invoicing</text>
                    <text x="75" y="76" fill="#94a3b8" fontSize="10" fontFamily="system-ui" textAnchor="middle">CRM / ERP / Projects</text>
                    {/* Payments */}
                    <rect x="175" y="30" width="110" height="60" rx="10" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="230" y="58" fill="#34d399" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Payment Engine</text>
                    <text x="230" y="76" fill="#94a3b8" fontSize="10" fontFamily="system-ui" textAnchor="middle">Subscriptions + One-time</text>
                    {/* Gateways */}
                    <rect x="330" y="30" width="110" height="60" rx="10" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="385" y="58" fill="#a78bfa" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Gateways</text>
                    <text x="385" y="76" fill="#94a3b8" fontSize="10" fontFamily="system-ui" textAnchor="middle">Stripe / Paystack / Flutterwave</text>
                    {/* Arrows */}
                    <line x1="130" y1="60" x2="173" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <polygon points="171,54 181,60 171,66" fill="rgba(255,255,255,0.2)" />
                    <line x1="285" y1="60" x2="328" y2="60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                    <polygon points="326,54 336,60 326,66" fill="rgba(255,255,255,0.2)" />
                    {/* Bottom: Reconciliation */}
                    <rect x="135" y="130" width="190" height="40" rx="10" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="230" y="155" fill="#fbbf24" fontSize="12" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Auto-Reconciliation → ERP</text>
                    <line x1="230" y1="90" x2="230" y2="128" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 3" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 7. AI ENGINE ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="AI Engine"
              title="Intelligence that powers every module"
              subtitle="A shared AI/ML layer that all Tesle modules call into. Predictions, classifications, NLP, and automation  accessible via a single API."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Brain, title: 'Predictive Models', desc: 'Demand forecasting, cash flow prediction, churn scoring, and sales forecasting. Every module uses the same ML pipeline.' },
                { icon: Zap, title: 'Natural Language', desc: 'Ask questions in plain English. The AI understands context across modules  "Show me Q3 sales by region" works in any report.' },
                { icon: RefreshCw, title: 'Intelligent Automation', desc: 'Auto-categorise expenses, match invoices to POs, route support tickets, and flag compliance risks without rules.' },
                { icon: Eye, title: 'Anomaly Detection', desc: 'Unusual patterns in financials, HR attrition signals, inventory discrepancies  surfaced proactively across every module.' },
                { icon: Code2, title: 'Custom Models', desc: 'Train proprietary AI on your data. Private, isolated, and deployed in your dedicated infrastructure environment.' },
                { icon: BarChart3, title: 'AI Analytics', desc: 'Automated insights delivered to dashboards. "Revenue dropped 12% this week due to X"  no manual analysis needed.' },
              ].map((item, i) => {
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
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 8. DEVELOPER APIs ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <motion.div {...fadeUp}>
                <div className="w-full max-w-md mx-auto">
                  <svg viewBox="0 0 480 200" className="w-full h-auto" fill="none">
                    <rect x="0" y="0" width="480" height="200" rx="12" fill="rgba(255,255,255,0.02)" />
                    {/* API Gateway */}
                    <rect x="170" y="20" width="140" height="50" rx="12" fill="rgba(255,107,0,0.08)" stroke="#00e5ff" strokeWidth="1.5" strokeOpacity="0.5" />
                    <text x="240" y="50" fill="#00e5ff" fontSize="13" fontFamily="system-ui" fontWeight="600" textAnchor="middle">API Gateway</text>
                    {/* Protocols */}
                    <rect x="20" y="100" width="110" height="40" rx="8" fill="rgba(52,211,153,0.08)" stroke="#34d399" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="75" y="125" fill="#34d399" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">REST</text>
                    <rect x="145" y="100" width="110" height="40" rx="8" fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="200" y="125" fill="#a78bfa" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">GraphQL</text>
                    <rect x="270" y="100" width="110" height="40" rx="8" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="325" y="125" fill="#fbbf24" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Webhooks</text>
                    <rect x="20" y="150" width="110" height="40" rx="8" fill="rgba(248,113,113,0.08)" stroke="#f87171" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="75" y="175" fill="#f87171" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">SDKs</text>
                    <rect x="145" y="150" width="110" height="40" rx="8" fill="rgba(96,165,250,0.08)" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="200" y="175" fill="#60a5fa" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">CLI</text>
                    <rect x="270" y="150" width="110" height="40" rx="8" fill="rgba(192,132,252,0.08)" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.3" />
                    <text x="325" y="175" fill="#c084fc" fontSize="11" fontFamily="system-ui" fontWeight="500" textAnchor="middle">Webhooks</text>
                    {/* Lines up */}
                    <line x1="75" y1="100" x2="200" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="200" y1="100" x2="230" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="325" y1="100" x2="260" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="75" y1="150" x2="190" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="200" y1="150" x2="235" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <line x1="325" y1="150" x2="270" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  </svg>
                </div>
              </motion.div>

              <div>
                <SectionTitle
                  label="Developer APIs"
                  title="Every module is an API"
                  subtitle="REST, GraphQL, webhooks, SDKs, and CLI tools for every Tesle module. Build integrations, automate workflows, and extend the platform."
                  align="left"
                />
                <div className="mt-8 space-y-4">
                  {[
                    { icon: Code2, title: 'OpenAPI Spec', desc: 'Every endpoint is documented with OpenAPI 3.0. Interactive playground to test requests against your live data.' },
                    { icon: Server, title: 'Rate-Limited & Secure', desc: 'OAuth 2.0 client credentials, per-endpoint rate limiting, and IP whitelisting. Enterprise-grade API security.' },
                    { icon: RefreshCw, title: 'Real-Time Events', desc: 'Subscribe to any platform event via webhooks. Changes in any module fire events your systems can consume.' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-text">{item.title}</h3>
                          <p className="text-xs text-muted mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 9. MARKETPLACE ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Marketplace"
              title="Extend with one click"
              subtitle="Hundreds of pre-built integrations, plugins, templates, and add-ons built by Tesle and our partner ecosystem."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Store, title: 'Integration Hub', desc: 'Connect Tesle with 200+ third-party services  accounting, payroll, banking, logistics, payment gateways, and more.' },
                { icon: Layers, title: 'Industry Templates', desc: 'Pre-configured modules for financial services, healthcare, education, retail, logistics, and government.' },
                { icon: Code2, title: 'Plugin SDK', desc: 'Build and publish your own plugins. Full access to the platform API with review and publishing pipeline.' },
                { icon: Zap, title: 'Automation Recipes', desc: 'Pre-built workflow templates: "Send invoice reminder after 7 days", "Create support ticket from email", and hundreds more.' },
              ].map((item, i) => {
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
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 10. CLOUD INFRASTRUCTURE ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Cloud Infrastructure"
              title="Enterprise infrastructure. Global scale."
              subtitle="Multi-region, multi-cloud, auto-scaling infrastructure that powers every Tesle module for thousands of organisations across Africa."
            />

            <div className="mt-16 sm:mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Cloud, title: 'Multi-Cloud', desc: 'Deploy on AWS, Azure, or GCP. Choose your provider  Tesle runs identically across all major clouds with zero vendor lock-in.' },
                { icon: Globe, title: 'African Data Centres', desc: 'Data residency in Lagos, Johannesburg, Nairobi, and Accra. Low-latency access for African users with local compliance.' },
                { icon: Server, title: 'Auto-Scaling', desc: 'Kubernetes-based infrastructure that scales from 10 to 10,000 concurrent users without any manual intervention or downtime.' },
                { icon: Shield, title: 'Disaster Recovery', desc: 'Automated multi-region failover with RPO of 5 minutes and RTO under 15 minutes. Financially backed SLA guarantees.' },
              ].map((item, i) => {
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
          </div>
        </section>
      </AnimatedSection>

      {/* ============ 11. FULL ECOSYSTEM DIAGRAM ============ */}
      <AnimatedSection>
        <section className={`relative py-24 sm:py-32 ${sectionBg}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle
              label="Platform Architecture"
              title="How everything connects"
              subtitle="The Tesle ecosystem is a fully integrated network of services. Every component communicates through shared protocols, data layers, and authentication."
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 sm:mt-20"
            >
              <EcosystemDiagram />
            </motion.div>

            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Shared Identity', desc: 'Authenticate once. Every module, API, and service uses the same identity token with consistent RBAC permissions.' },
                { title: 'Unified Data Layer', desc: 'All modules read from and write to a shared data fabric. CRM opportunities sync with ERP orders. HR data feeds payroll.' },
                { title: 'Event Bus', desc: 'Every action publishes an event. Services subscribe to what they need. Loose coupling, real-time propagation across the ecosystem.' },
              ].map((item) => (
                <div key={item.title} className="glass rounded-2xl p-5 border border-white/[0.04]">
                  <h3 className="text-sm font-semibold text-text mb-1.5">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ============ CTA ============ */}
      <AnimatedSection>
        <section className="relative py-24 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Explore the platform{' '}
                <span className="text-gradient">firsthand</span>
              </h2>
              <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
                Book a personalised walkthrough of the Tesle ecosystem. See how every module,
                service, and capability connects together in one unified platform.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                    Book a Demo
                  </Button>
                </Link>
                <Link to="/services">
                  <Button variant="outline" size="lg">
                    View All Modules
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
