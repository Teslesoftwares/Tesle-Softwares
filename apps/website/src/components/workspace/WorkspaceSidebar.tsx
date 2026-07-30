import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useWorkspace } from './WorkspaceContext';
import { sidebarItems } from '@/data/workspace';

export function WorkspaceSidebar() {
  const { activeView, setActiveView, activeApp, setActiveApp, can, sidebarCollapsed, setSidebarCollapsed } = useWorkspace();

  return (
    <aside
      className={`h-screen flex flex-col bg-surface border-r border-glass transition-all duration-300 shrink-0 ${
        sidebarCollapsed ? 'w-[68px]' : 'w-[240px]'
      }`}
    >
      {/* Logo area */}
      <div className="flex items-center h-16 px-4 border-b border-glass shrink-0">
        <div className="flex items-center min-w-0">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            <img src="/images/tesle-logo.png" alt="Tesle" className="w-full h-full object-contain" />
          </div>
        </div>
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="ml-auto p-1.5 rounded-lg text-muted hover:text-text hover:bg-glass-hover transition-colors shrink-0"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5 scrollbar-thin">
        {sidebarItems.map((item) => {
          if (!can(item.minRole)) return null;
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); setActiveApp(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted hover:text-text hover:bg-glass-hover'
              }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent ${
                  sidebarCollapsed ? 'absolute -top-0.5 -right-0.5' : ''
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-glass">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted hover:text-red-400 hover:bg-red-500/5 transition-all"
          title={sidebarCollapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!sidebarCollapsed && <span className="truncate">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
