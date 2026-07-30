import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Users, Briefcase, Landmark, Kanban, BarChart3,
  Headphones, Truck, Receipt, Package, MessageSquare, Blocks,
  Check, ArrowRight,
} from 'lucide-react';

const tabs = [
  { id: 'all', label: 'All Modules' },
  { id: 'erp', label: 'ERP & Finance' },
  { id: 'people', label: 'Sales & People' },
  { id: 'ops', label: 'Supply Chain' },
  { id: 'dev', label: 'Platform & AI' },
];

const modules = [
  { tab: 'erp', icon: LayoutDashboard, title: 'Enterprise ERP', description: 'Finance, operations, HR, and supply chain in one AI-powered system.', color: 'from-accent/20 to-blue-500/10' },
  { tab: 'erp', icon: Landmark, title: 'Financial Management', description: 'Accounting, multi-entity consolidation, treasury, and Africa-ready compliance.', color: 'from-accent/20 to-emerald-500/10' },
  { tab: 'erp', icon: Receipt, title: 'Payroll & Compliance', description: 'Automated payroll with statutory compliance across 15+ African markets.', color: 'from-accent/20 to-amber-500/10' },
  { tab: 'people', icon: Users, title: 'Customer CRM', description: 'AI-powered CRM with lead scoring, forecasting, and 360° customer views.', color: 'from-accent/20 to-purple-500/10' },
  { tab: 'people', icon: Briefcase, title: 'Human Resources', description: 'End-to-end HRM covering recruitment, onboarding, performance, and leave.', color: 'from-accent/20 to-pink-500/10' },
  { tab: 'people', icon: Headphones, title: 'Customer Support', description: 'Omnichannel service desk with WhatsApp, AI agents, and SLA management.', color: 'from-accent/20 to-sky-500/10' },
  { tab: 'ops', icon: Truck, title: 'Supply Chain', description: 'End-to-end procurement, warehouse, fleet tracking, and AI demand planning.', color: 'from-accent/20 to-teal-500/10' },
  { tab: 'ops', icon: Package, title: 'Inventory Management', description: 'Real-time multi-warehouse inventory with AI reorder optimization.', color: 'from-accent/20 to-green-500/10' },
  { tab: 'ops', icon: Kanban, title: 'Project & Portfolio', description: 'Agile boards, Gantt charts, resource planning, and AI timeline forecasting.', color: 'from-accent/20 to-orange-500/10' },
  { tab: 'dev', icon: Blocks, title: 'Platform & API', description: 'Low-code builder, visual workflows, API gateway with 100+ connectors.', color: 'from-accent/20 to-cyan-500/10' },
  { tab: 'dev', icon: BarChart3, title: 'Business Intelligence', description: 'AI analytics, natural language queries, and real-time dashboards.', color: 'from-accent/20 to-indigo-500/10' },
  { tab: 'dev', icon: MessageSquare, title: 'Team Collaboration', description: 'Messaging, video, document co-editing integrated with every module.', color: 'from-accent/20 to-rose-500/10' },
];

const replaces = [
  { name: 'SAP', slug: 'sap' },
  { name: 'Oracle', slug: 'oracle' },
  { name: 'Zoho', slug: 'zoho' },
  { name: 'Salesforce', slug: 'salesforce' },
  { name: 'Microsoft', slug: 'microsoft' },
  { name: 'QuickBooks', slug: 'quickbooks' },
  { name: 'Slack', slug: 'slack' },
  { name: 'Jira', slug: 'jira' },
  { name: 'Monday', slug: 'monday' },
  { name: 'Asana', slug: 'asana' },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all' ? modules : modules.filter(m => m.tab === activeTab);

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.015] to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(102,71,240,0.08) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-accent mb-4 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
            Platform Modules
          </span>
          <h2 className="heading text-3xl sm:text-4xl md:text-5xl text-text leading-tight">
            One platform.{' '}
            <span className="text-gradient">Every business function.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto">
            Replace 10+ disconnected tools with one integrated system. ERP, CRM, HR, financials, analytics, and collaboration  all sharing the same data.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-2"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-muted hover:text-text border border-glass hover:border-accent/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-10 sm:mt-12"
        >
          <div className="text-center mb-6">
            <span className="text-[11px] font-semibold tracking-widest uppercase text-muted/80">REPLACES</span>
            <div className="mt-3 flex flex-wrap justify-center gap-2.5">
              {replaces.map((r) => (
                <span
                  key={r.name}
                  className="px-3 py-1.5 rounded-lg bg-surface border border-glass text-xs font-medium text-muted"
                >
                  {r.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
          >
            {filtered.map((mod, i) => {
              const Icon = mod.icon;
              return (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  className="group relative p-4 sm:p-5 rounded-2xl card hover:card-hover transition-all cursor-default"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} border border-glass flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-sm font-bold text-text mb-1.5">{mod.title}</h3>
                  <p className="text-xs text-muted leading-relaxed">{mod.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
