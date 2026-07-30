import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, BookOpen, Key, Globe, Webhook, GitGraph, Beaker, LayoutDashboard,
  Activity, MessageSquare, Terminal, Package, Shield,
  CheckCircle2, BookMarked, Copy, ExternalLink, Grid3X3,
  ChevronRight,
} from 'lucide-react';
import { SEO } from '@/components/layout/SEO';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import {
  quickStartSteps, restEndpoints, sdkList, codeExamples, statusMetrics,
  communityLinks, authMethods, graphQLIntro, webhookEvents, baseConfig,
} from '@/data/developer';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        {language && <span className="text-[10px] uppercase tracking-wider text-muted font-mono">{language}</span>}
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
        </button>
      </div>
      <pre className="bg-black/50 rounded-xl p-4 pt-10 overflow-x-auto text-sm leading-relaxed">
        <code className="text-green-300/90 font-mono">{code}</code>
      </pre>
    </div>
  );
}

function SectionHeader({ title, subtitle, badge }: { title: string; subtitle?: string; badge?: string }) {
  return (
    <div className="text-center mb-12 sm:mb-16">
      {badge && (
        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">{title}</h2>
      {subtitle && <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: 'text-green-400 bg-green-400/10',
    POST: 'text-blue-400 bg-blue-400/10',
    PUT: 'text-yellow-400 bg-yellow-400/10',
    PATCH: 'text-orange-400 bg-orange-400/10',
    DELETE: 'text-red-400 bg-red-400/10',
  };
  return (
    <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded ${colors[method] || 'text-muted bg-white/5'}`}>
      {method}
    </span>
  );
}

export default function Developers() {
  const [activeExample, setActiveExample] = useState(0);

  return (
    <main>
      <SEO title="Developers" description="Build on Tesle with our API, SDKs, and developer tools. Integrate, extend, and customise the Tesle platform." />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
          <motion.div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,107,0,0.06) 0%, rgba(139,92,246,0.04) 30%, transparent 60%)' }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-6 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5">
              Developer Portal
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Build on{' '}
              <span className="text-gradient">Tesle</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Everything you need to integrate, extend, and customise the Tesle platform  APIs, SDKs, webhooks, and tools.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" icon={<Terminal className="w-5 h-5" />}>Quick Start</Button>
              <Button variant="outline" size="lg" icon={<BookMarked className="w-5 h-5" />} href={baseConfig.docsBaseUrl}>Read the Docs</Button>
              <Button variant="outline" size="lg" icon={<Key className="w-5 h-5" />}>Get API Keys</Button>
            </div>
          </motion.div>

          {/* Hero stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'API Uptime', value: '99.99%' },
              { label: 'Avg Response', value: '145ms' },
              { label: 'SDK Languages', value: '6' },
              { label: 'API Endpoints', value: '200+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl glass">
                <div className="text-2xl font-bold text-text">{stat.value}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Quick nav */}
          <div className="mt-10 max-w-3xl mx-auto">
            <div className="glass rounded-2xl p-2 flex flex-wrap justify-center gap-1">
              {[
                { label: 'Docs', icon: BookOpen },
                { label: 'API Ref', icon: Code2 },
                { label: 'SDKs', icon: Package },
                { label: 'Auth', icon: Key },
                { label: 'REST', icon: Globe },
                { label: 'Webhooks', icon: Webhook },
                { label: 'GraphQL', icon: GitGraph },
                { label: 'Examples', icon: Terminal },
                { label: 'Sandbox', icon: Beaker },
                { label: 'Status', icon: Activity },
              ].map(({ label, icon: Icon }) => (
                <a key={label} href={`#${label.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Icon className="w-3 h-3" /> {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK START ===== */}
      <AnimatedSection>
        <section id="quick-start" className="relative pb-24 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="Quick Start" title="Go from zero to integrated in 5 minutes" subtitle="Follow these steps to start building with the Tesle platform." />

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-accent/10 to-transparent" />

              <div className="space-y-8 sm:space-y-12">
                {quickStartSteps.map((step) => (
                  <motion.div key={step.step} {...stagger} transition={{ delay: step.step * 0.1, duration: 0.5 }}
                    className="relative pl-14 sm:pl-16"
                  >
                    <div className="absolute left-3 sm:left-4 top-1 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-accent">{step.step}</span>
                    </div>
                    <GlassCard className="!p-5 sm:!p-6">
                      <h3 className="text-lg font-semibold text-text mb-1.5">{step.title}</h3>
                      <p className="text-sm text-muted mb-3">{step.description}</p>
                      {step.code && <CodeBlock code={step.code} language={step.step === 1 ? 'bash' : 'javascript'} />}
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== DOCUMENTATION ===== */}
      <AnimatedSection>
        <section id="docs" className={`relative pb-24 sm:pb-32 ${'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="Documentation" title="Comprehensive platform documentation" subtitle="Everything you need to know about Tesle's APIs, integrations, and platform." />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { icon: BookOpen, title: 'Getting Started', desc: 'Platform overview, authentication, and making your first API call.', color: 'from-cyan-500/20', links: ['Quickstart Guide', 'Authentication', 'API Basics'] },
                { icon: Globe, title: 'REST API', desc: 'Complete reference for all REST endpoints with request/response examples.', color: 'from-blue-500/20', links: ['Companies', 'Contacts', 'Invoices', 'Products', 'Webhooks'] },
                { icon: GitGraph, title: 'GraphQL API', desc: 'Flexible GraphQL API with queries, mutations, and subscriptions.', color: 'from-emerald-500/20', links: ['Schema Reference', 'Queries', 'Mutations', 'Subscriptions'] },
                { icon: Package, title: 'SDK Reference', desc: 'Language-specific guides for JavaScript, Python, PHP, Go, Ruby, .NET.', color: 'from-violet-500/20', links: ['JavaScript SDK', 'Python SDK', 'PHP SDK', 'Go SDK', '.NET SDK'] },
                { icon: Webhook, title: 'Webhooks', desc: 'Real-time event notifications with retry logic and signing.', color: 'from-amber-500/20', links: ['Event Types', 'Verification', 'Retry Policy', 'Best Practices'] },
                { icon: Shield, title: 'Security & Compliance', desc: 'Data encryption, authentication flows, and compliance certifications.', color: 'from-red-500/20', links: ['API Security', 'Data Encryption', 'Compliance', 'Audit Logs'] },
              ].map((doc) => {
                const Icon = doc.icon;
                return (
                  <motion.div key={doc.title} {...stagger} transition={{ duration: 0.5 }}>
                    <GlassCard className="h-full !p-6 group">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${doc.color} to-transparent border border-white/[0.06] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5.5 h-5.5 text-accent" />
                      </div>
                      <h3 className="text-lg font-semibold text-text mb-2">{doc.title}</h3>
                      <p className="text-sm text-muted mb-4 leading-relaxed">{doc.desc}</p>
                      <ul className="space-y-1.5">
                        {doc.links.map((link) => (
                          <li key={link}>
                            <a href="#" className="flex items-center gap-1.5 text-xs text-accent/80 hover:text-accent transition-colors">
                              <ChevronRight className="w-3 h-3" /> {link}
                            </a>
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

      {/* ===== AUTHENTICATION ===== */}
      <AnimatedSection>
        <section id="auth" className="relative pb-24 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="Authentication" title="Secure your API integrations" subtitle="Three ways to authenticate with the Tesle platform." />

            <div className="grid md:grid-cols-3 gap-5">
              {authMethods.map((method) => (
                <motion.div key={method.title} {...stagger} transition={{ duration: 0.5 }}>
                  <GlassCard className="h-full !p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-3">
                      <Key className="w-5 h-5 text-accent" />
                      <h3 className="text-base font-semibold text-text">{method.title}</h3>
                    </div>
                    <p className="text-sm text-muted mb-4 flex-1">{method.description}</p>
                    <CodeBlock code={method.code} language="bash" />
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== REST API ===== */}
      <AnimatedSection>
        <section id="rest" className={`relative pb-24 sm:pb-32 ${'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="REST API" title="Resource-oriented RESTful API" subtitle={`Base URL: ${baseConfig.apiBaseUrl}/${baseConfig.version}`} />

            <GlassCard className="!p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Method</th>
                      <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted uppercase tracking-wider">Endpoint</th>
                      <th className="text-left py-3.5 px-5 text-xs font-semibold text-muted uppercase tracking-wider hidden sm:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restEndpoints.map((ep) => (
                      <tr key={ep.path} className="border-b border-white/[0.03] hover:glass transition-colors">
                        <td className="py-2.5 px-5"><MethodBadge method={ep.method} /></td>
                        <td className="py-2.5 px-5 font-mono text-xs text-muted whitespace-nowrap">{ep.path}</td>
                        <td className="py-2.5 px-5 text-muted text-xs hidden sm:table-cell">{ep.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== GRAPHQL ===== */}
      <AnimatedSection>
        <section id="graphql" className="relative pb-24 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="GraphQL" title="Flexible data queries with GraphQL" subtitle={graphQLIntro.description} />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {graphQLIntro.features.map((feature) => (
                <motion.div key={feature} {...stagger} transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl glass"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-muted">{feature}</span>
                </motion.div>
              ))}
            </div>

            <GlassCard className="!p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GitGraph className="w-5 h-5 text-accent" />
                  <span className="text-sm font-semibold text-text">Example Query</span>
                </div>
                <span className="text-[11px] font-mono text-muted bg-white/5 px-2 py-1 rounded">{graphQLIntro.endpoint}</span>
              </div>
              <CodeBlock code={codeExamples.find(c => c.language === 'graphql')?.code || ''} language="graphql" />
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== WEBHOOKS ===== */}
      <AnimatedSection>
        <section id="webhooks" className={`relative pb-24 sm:pb-32 ${'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="Webhooks" title="Real-time event notifications" subtitle="Receive instant notifications when events happen in your Tesle account. Webhooks are delivered with retry logic, HMAC signing, and delivery receipts." />

            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {webhookEvents.map((ev) => (
                <motion.div key={ev.event} {...stagger} transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 p-3 rounded-xl glass"
                >
                  <Webhook className="w-4 h-4 text-accent shrink-0" />
                  <div>
                    <span className="text-xs font-mono text-muted">{ev.event}</span>
                    <p className="text-[11px] text-muted">{ev.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <GlassCard className="!p-6">
              <h3 className="text-base font-semibold text-text mb-3">Webhook payload verification</h3>
              <CodeBlock code={codeExamples.find(c => c.title.includes('Webhook'))?.code || ''} language="javascript" />
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== SDKs ===== */}
      <AnimatedSection>
        <section id="sdks" className="relative pb-24 sm:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="SDKs & Libraries" title="Native SDKs for every language" subtitle="Install the Tesle SDK in your preferred language and start building in minutes." />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sdkList.map((sdk) => (
                <motion.div key={sdk.language} {...stagger} transition={{ duration: 0.4 }}>
                  <GlassCard className="h-full !p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-text">{sdk.language}</h3>
                        <p className="text-[11px] font-mono text-accent mt-0.5">{sdk.package}</p>
                      </div>
                      <a href={sdk.repo} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    </div>
                    <CodeBlock code={sdk.install} language="bash" />
                    <a href={sdk.docs} className="mt-3 inline-flex items-center gap-1 text-xs text-accent/80 hover:text-accent transition-colors">
                      View documentation <ExternalLink className="w-3 h-3" />
                    </a>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== EXAMPLES ===== */}
      <AnimatedSection>
        <section id="examples" className={`relative pb-24 sm:pb-32 ${'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="Code Examples" title="Ready-to-use code snippets" subtitle="Copy-paste examples to jumpstart your integration." />

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {codeExamples.filter(c => c.language !== 'graphql').map((ex, i) => {
                const isActive = activeExample === i;
                const idx = i;
                return (
                  <button
                    key={ex.title}
                    onClick={() => setActiveExample(idx)}
                    className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                      isActive ? 'bg-accent text-black' : 'bg-white/5 text-muted hover:text-white'
                    }`}
                  >
                    {ex.title}
                  </button>
                );
              })}
            </div>

            <motion.div key={activeExample} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <GlassCard className="!p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-semibold text-text">{codeExamples.filter(c => c.language !== 'graphql')[activeExample]?.title}</h3>
                    <p className="text-xs text-muted mt-0.5">{codeExamples.filter(c => c.language !== 'graphql')[activeExample]?.description}</p>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-muted bg-white/5 px-2 py-1 rounded">
                    {codeExamples.filter(c => c.language !== 'graphql')[activeExample]?.language}
                  </span>
                </div>
                <CodeBlock code={codeExamples.filter(c => c.language !== 'graphql')[activeExample]?.code || ''} language={codeExamples.filter(c => c.language !== 'graphql')[activeExample]?.language} />
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== SANDBOX ===== */}
      <AnimatedSection>
        <section id="sandbox" className="relative pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <GlassCard className="!p-8 sm:!p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.04] via-transparent to-violet-500/10" />
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
                  <Beaker className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-text mb-4">Tesle Sandbox</h3>
                <p className="text-sm sm:text-base text-muted max-w-2xl mx-auto mb-8 leading-relaxed">
                  Test your integrations in a simulated environment with fake data. The sandbox mirrors all production
                  API endpoints so you can build and test with zero risk.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mb-8 text-left max-w-lg mx-auto">
                  {[
                    { label: 'Fake data', desc: 'Pre-populated test data' },
                    { label: 'Rate limits', desc: 'Higher limits for testing' },
                    { label: 'Webhook sim', desc: 'Simulate event delivery' },
                  ].map((f) => (
                    <div key={f.label} className="flex items-start gap-2 p-3 rounded-xl glass">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-medium text-text">{f.label}</div>
                        <div className="text-[11px] text-muted">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" size="lg" icon={<Beaker className="w-5 h-5" />}>Launch Sandbox</Button>
                  <Button variant="outline" size="lg" href={baseConfig.docsBaseUrl}>Sandbox Docs</Button>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== DEVELOPER DASHBOARD ===== */}
      <AnimatedSection>
        <section id="developer-dashboard" className={`relative pb-24 sm:pb-32 ${'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="Developer Dashboard" title="Manage your integrations from one place" subtitle="API keys, usage analytics, webhook monitoring, and team management." />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Key, label: 'API Key Management', desc: 'Generate, rotate, and revoke keys with scoped permissions.' },
                { icon: Activity, label: 'Usage Analytics', desc: 'Monitor API calls, error rates, and latency in real-time.' },
                { icon: Webhook, label: 'Webhook Monitor', desc: 'Delivery logs, retry history, and endpoint health.' },
                { icon: Shield, label: 'Team management', desc: 'Invite team members with role-based access control.' },
              ].map((f) => {
                const Icon = f.icon;
                return (
                  <motion.div key={f.label} {...stagger} transition={{ duration: 0.4 }}>
                    <GlassCard className="h-full !p-5 text-center">
                      <Icon className="w-6 h-6 text-accent mx-auto mb-3" />
                      <h3 className="text-sm font-semibold text-text mb-1">{f.label}</h3>
                      <p className="text-xs text-muted">{f.desc}</p>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <Button variant="primary" size="lg" icon={<LayoutDashboard className="w-5 h-5" />}>Open Dashboard</Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== STATUS PAGE ===== */}
      <AnimatedSection>
        <section id="status" className="relative pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="System Status" title="Platform reliability at a glance" subtitle="Real-time status of Tesle APIs, webhooks, and infrastructure." />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statusMetrics.map((metric) => (
                <motion.div key={metric.label} {...stagger} transition={{ duration: 0.4 }}>
                  <GlassCard className="!p-5 text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-3 ${
                      metric.status === 'operational' ? 'bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.4)]' :
                      metric.status === 'degraded' ? 'bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.4)]' :
                      'bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.4)]'
                    }`} />
                    <div className="text-lg font-bold text-text">{metric.value}</div>
                    <div className="text-xs text-muted mt-1">{metric.label}</div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" icon={<Activity className="w-5 h-5" />} href={baseConfig.statusUrl}>
                Visit Status Page
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== DEVELOPER COMMUNITY ===== */}
      <AnimatedSection>
        <section id="community" className={`relative pb-24 sm:pb-32 ${'bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent'}`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <SectionHeader badge="Community" title="Join the Tesle developer community" subtitle="Connect with fellow developers, get help, and stay up to date." />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {communityLinks.map((link) => {
                const Icon = link.icon === 'github' ? GithubIcon :
                  link.icon === 'message-square' ? MessageSquare :
                  link.icon === 'layers' ? Grid3X3 : BookOpen;
                return (
                  <motion.a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" {...stagger} transition={{ duration: 0.4 }}>
                    <GlassCard className="h-full !p-5 group text-center">
                      <Icon className="w-8 h-8 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                      <h3 className="text-base font-semibold text-text mb-1">{link.name}</h3>
                      <p className="text-xs text-muted">{link.description}</p>
                    </GlassCard>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ===== FINAL CTA ===== */}
      <AnimatedSection>
        <section className="relative pb-24 sm:pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Ready to start building?</h2>
            <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-8">
              Get your API keys and join thousands of developers building on the Tesle platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" icon={<Key className="w-5 h-5" />}>Get API Keys</Button>
              <Button variant="outline" size="lg" icon={<BookOpen className="w-5 h-5" />} href={baseConfig.docsBaseUrl}>Read Documentation</Button>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </main>
  );
}
