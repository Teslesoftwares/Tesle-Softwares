import { Clock, ArrowUpRight, FileText, TrendingUp } from 'lucide-react';
import { useWorkspace } from './WorkspaceContext';
import { homeWidgets, recentActivities, recentFiles } from '@/data/workspace';

export function WorkspaceHome() {
  const { user, currentOrg } = useWorkspace();

  const kpiIcons = [TrendingUp, ArrowUpRight, Clock, FileText];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-text">Welcome back, {user.name.split(' ')[0]}</h1>
        <p className="text-sm text-muted mt-1">{currentOrg?.name} &middot; {currentOrg?.plan} plan</p>
      </div>

      {/* KPI widgets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {homeWidgets.map((w, i) => {
          const Icon = kpiIcons[i];
          return (
            <div key={w.id} className="rounded-2xl glass p-4 sm:p-5 hover:border-accent/20 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted font-medium">{w.title}</span>
                <Icon className="w-4 h-4 text-accent/60" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-text">{w.data.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <span className={`text-xs font-medium ${String(w.data.change).startsWith('+') ? 'text-green-400' : String(w.data.change).startsWith('-') ? 'text-red-400' : 'text-muted'}`}>
                  {w.data.change}
                </span>
                <span className="text-[11px] text-muted">{w.data.period}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity + Files */}
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Activity */}
        <div className="rounded-2xl glass p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-text mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 pb-3 border-b border-white/[0.04] last:border-0 last:pb-0">
                <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center text-[10px] font-bold text-accent shrink-0">
                  {a.app.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-text">
                    <span className="font-medium">{a.action}</span>{' '}
                    <span className="text-muted">{a.target}</span>
                  </div>
                  <div className="text-[11px] text-muted mt-0.5">{a.user} &middot; {a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Files */}
        <div className="rounded-2xl glass p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-text mb-4">Recent Files</h2>
          <div className="space-y-3">
            {recentFiles.map((f) => (
              <div key={f.id} className="flex items-center gap-3 pb-3 border-b border-white/[0.04] last:border-0 last:pb-0 group cursor-pointer">
                <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-accent/30 transition-colors">
                  <FileText className="w-4 h-4 text-accent/60" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-text truncate group-hover:text-accent transition-colors">{f.name}</div>
                  <div className="text-[11px] text-muted">{f.size} &middot; {f.modified}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
