import { useWorkspace } from './WorkspaceContext';
import { notifications } from '@/data/workspace';
import { Brain, TrendingUp, Bell, FileText, ShoppingBag, Headphones, Settings, Star, Search, Download, ExternalLink, CheckCircle2, Clock, Zap, Users, Shield, CreditCard, Database, ChevronRight } from 'lucide-react';
import { MarketplacePage } from '@/components/marketplace/MarketplacePage';

export function WorkspaceAI() {
  const { currentOrg } = useWorkspace();
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">AI Assistant</h1>
        <p className="text-sm text-muted mt-1">Ask questions, generate reports, automate tasks across {currentOrg?.name}.</p>
      </div>
      <div className="rounded-2xl glass p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-violet-500/20 border border-white/[0.06] flex items-center justify-center">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text">Tesle AI</h3>
            <p className="text-[11px] text-muted">Powered by Tesle Intelligence</p>
          </div>
        </div>
        <div className="bg-black/40 rounded-xl p-4 mb-4 min-h-[120px] flex items-center justify-center">
          <p className="text-sm text-muted text-center">Start a conversation with Tesle AI. Ask about your data, generate reports, or automate workflows.</p>
        </div>
        <div className="flex gap-2">
          {['Analyze sales trends', 'Generate report', 'Schedule meeting'].map((hint) => (
            <button key={hint} className="px-3 py-1.5 text-xs text-muted hover:text-text bg-white/[0.04] hover:bg-white/[0.08] rounded-lg transition-colors">
              {hint}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WorkspaceAnalytics() {
  const metrics = [
    { label: 'Revenue (MTD)', value: '$284,500', change: '+12.5%', icon: TrendingUp },
    { label: 'Active Projects', value: '18', change: '+3', icon: Clock },
    { label: 'Customer Growth', value: '142', change: '+8.2%', icon: TrendingUp },
    { label: 'Avg Response Time', value: '2.4h', change: '-18%', icon: Zap },
  ];
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Analytics</h1>
        <p className="text-sm text-muted mt-1">Cross-app analytics and business intelligence.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="rounded-2xl glass p-4">
              <Icon className="w-4 h-4 text-accent/60 mb-2" />
              <div className="text-lg sm:text-xl font-bold text-text">{m.value}</div>
              <div className="text-xs text-muted mt-0.5">{m.label}</div>
              <span className={`text-[11px] font-medium ${m.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{m.change}</span>
            </div>
          );
        })}
      </div>
      <div className="rounded-2xl glass p-6 flex items-center justify-center min-h-[200px]">
        <p className="text-sm text-muted">Charts and visualizations will render here with data from connected apps.</p>
      </div>
    </div>
  );
}

export function WorkspaceNotificationsList() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Notifications</h1>
          <p className="text-sm text-muted mt-1">Stay updated on everything happening across your workspace.</p>
        </div>
        <button className="text-xs text-accent hover:underline">Mark all read</button>
      </div>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className={`rounded-xl border p-4 flex items-start gap-3 transition-colors ${
            n.read ? 'glass border-white/[0.04]' : 'bg-accent/[0.03] border-accent/10'
          }`}>
            <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
              n.type === 'success' ? 'bg-green-400' :
              n.type === 'warning' ? 'bg-yellow-400' :
              n.type === 'error' ? 'bg-red-400' : 'bg-accent'
            }`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-sm font-medium text-text">{n.title}</span>
                  {!n.read && <span className="ml-2 text-[9px] font-bold text-accent px-1.5 py-0.5 rounded-full bg-accent/10">New</span>}
                </div>
                <span className="text-[11px] text-muted shrink-0">{n.timestamp}</span>
              </div>
              <p className="text-xs text-muted mt-1">{n.message}</p>
              {n.app && <span className="text-[10px] text-accent/60 mt-1 inline-block">{n.app}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkspaceFiles() {
  const files = [
    { name: 'Q2_Financial_Report.xlsx', size: '2.4 MB', modified: '2 hrs ago', shared: true },
    { name: 'Employee_Onboarding_v3.pdf', size: '856 KB', modified: '5 hrs ago', shared: false },
    { name: 'Project_Proposal_Hospital.pptx', size: '4.1 MB', modified: '1 day ago', shared: true },
    { name: 'Annual_Budget_2026.xlsx', size: '1.8 MB', modified: '2 days ago', shared: false },
    { name: 'Marketing_Assets.zip', size: '12.5 MB', modified: '3 days ago', shared: true },
  ];
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text">Files</h1>
          <p className="text-sm text-muted mt-1">Upload, manage, and share files across your organization.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-accent text-black text-sm font-medium rounded-full hover:shadow-[0_0_20px_rgba(255,107,0,0.2)] transition-all">
          <Download className="w-4 h-4" /> Upload
        </button>
      </div>
      <div className="rounded-2xl glass overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/[0.06] text-[11px] font-semibold text-muted uppercase tracking-wider">
          <div className="col-span-5">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-3">Modified</div>
          <div className="col-span-2 text-right">Shared</div>
        </div>
        {files.map((f) => (
          <div key={f.name} className="grid sm:grid-cols-12 gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:glass transition-colors cursor-pointer items-center">
            <div className="col-span-5 flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-accent/60" />
              </div>
              <span className="text-sm text-text truncate">{f.name}</span>
            </div>
            <div className="col-span-2 text-xs text-muted hidden sm:block">{f.size}</div>
            <div className="col-span-3 text-xs text-muted hidden sm:block">{f.modified}</div>
            <div className="col-span-2 text-right hidden sm:block">
              {f.shared && <span className="text-[10px] font-medium text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Shared</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorkspaceMarketplace() {
  return <MarketplacePage />;
}

export function WorkspaceSupport() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Support</h1>
        <p className="text-sm text-muted mt-1">Get help, report issues, and explore resources.</p>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: Headphones, title: 'Contact Support', desc: 'Talk to our team via chat or email.', action: 'Open Chat' },
          { icon: FileText, title: 'Knowledge Base', desc: 'Guides, FAQs, and documentation.', action: 'Browse' },
          { icon: Settings, title: 'Report Issue', desc: 'Submit a bug or feature request.', action: 'Create Ticket' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-2xl glass p-5 text-center hover:border-accent/20 transition-all">
              <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-text mb-1">{item.title}</h3>
              <p className="text-xs text-muted mb-4">{item.desc}</p>
              <button className="text-xs font-medium text-accent hover:underline">{item.action} &rarr;</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function WorkspaceSettingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text">Settings</h1>
        <p className="text-sm text-muted mt-1">Manage your workspace configuration and preferences.</p>
      </div>
      <div className="space-y-4">
        {[
          { icon: Settings, label: 'General', desc: 'Workspace name, timezone, locale' },
          { icon: Users, label: 'Users & Roles', desc: 'Invite, manage, and set permissions' },
          { icon: Shield, label: 'Security', desc: 'SSO, 2FA, IP whitelist, audit logs' },
          { icon: Bell, label: 'Notifications', desc: 'Email, in-app, and webhook settings' },
          { icon: CreditCard, label: 'Billing', desc: 'Plan, invoices, payment methods' },
          { icon: Database, label: 'Data & Export', desc: 'Backup, export, data retention' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl glass p-4 hover:border-accent/20 transition-all cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-text">{item.label}</h3>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

