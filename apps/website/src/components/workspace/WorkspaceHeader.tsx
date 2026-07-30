import { useState } from 'react';
import { ChevronDown, Search, Bell, User } from 'lucide-react';
import { useWorkspace } from './WorkspaceContext';
import { notifications } from '@/data/workspace';
import { AIButton } from '@/components/ai/AIButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function WorkspaceHeader() {
  const { currentOrg, organizations, setCurrentOrg, user } = useWorkspace();
  const [orgOpen, setOrgOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <header className="h-16 border-b border-glass flex items-center gap-4 px-4 sm:px-6 bg-surface/85 backdrop-blur-xl shrink-0">
      {/* Org Switcher */}
      <div className="relative">
        <button
          onClick={() => setOrgOpen(!orgOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-glass border border-glass hover:bg-glass-hover transition-colors text-sm font-medium text-text"
        >
          <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">
            {currentOrg?.name.charAt(0)}
          </div>
          <span className="max-w-[140px] truncate hidden sm:inline">{currentOrg?.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted" />
        </button>
        {orgOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOrgOpen(false)} />
            <div className="absolute top-full mt-2 left-0 w-64 bg-card border border-glass-hover rounded-xl shadow-2xl z-40 py-2">
              <div className="px-3 py-2 text-[11px] font-semibold text-muted uppercase tracking-wider">Organizations</div>
              {organizations.map((org) => {
                const isActive = org.id === currentOrg?.id;
                return (
                  <button
                    key={org.id}
                    onClick={() => { setCurrentOrg(org); setOrgOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                      isActive ? 'bg-accent/10 text-accent' : 'text-text hover:bg-glass-hover'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-glass border border-glass flex items-center justify-center text-[10px] font-bold shrink-0">
                      {org.name.charAt(0)}
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-sm font-medium truncate">{org.name}</div>
                      <div className="text-[11px] text-muted capitalize">{org.plan}</div>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-accent ml-auto" />}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search apps, files, people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-glass border border-glass rounded-xl text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* AI Assistant */}
        <AIButton />

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2.5 rounded-xl text-muted hover:text-text hover:bg-glass-hover transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-accent text-[9px] font-bold text-black flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
              <div className="absolute top-full mt-2 right-0 w-80 bg-card border border-glass-hover rounded-xl shadow-2xl z-40 py-3">
                <div className="px-4 pb-2 border-b border-glass flex items-center justify-between">
                  <span className="text-sm font-semibold text-text">Notifications</span>
                  <span className="text-[11px] text-accent cursor-pointer hover:underline">Mark all read</span>
                </div>
                <div className="max-h-[320px] overflow-y-auto">
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-glass-hover transition-colors ${!n.read ? 'bg-accent/[0.03]' : ''}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        n.type === 'success' ? 'bg-green-400' :
                        n.type === 'warning' ? 'bg-yellow-400' :
                        n.type === 'error' ? 'bg-red-400' : 'bg-accent'
                      }`} />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-text">{n.title}</div>
                        <div className="text-xs text-muted mt-0.5">{n.message}</div>
                        <div className="text-[10px] text-muted mt-1">{n.timestamp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-glass-hover transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/30 to-violet-500/30 flex items-center justify-center">
              <User className="w-4 h-4 text-accent" />
            </div>
            <span className="text-sm font-medium text-text hidden sm:inline">{user.name.split(' ')[0]}</span>
          </button>
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
              <div className="absolute top-full mt-2 right-0 w-56 bg-card border border-glass-hover rounded-xl shadow-2xl z-40 py-2">
                <div className="px-4 py-2 border-b border-glass">
                  <div className="text-sm font-medium text-text">{user.name}</div>
                  <div className="text-[11px] text-muted">{user.email}</div>
                  <div className="text-[10px] text-accent mt-0.5 capitalize">{user.role.replace('_', ' ')}</div>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm text-muted hover:text-text hover:bg-glass-hover transition-colors">Profile</button>
                <button className="w-full text-left px-4 py-2 text-sm text-muted hover:text-text hover:bg-glass-hover transition-colors">Preferences</button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/5 transition-colors border-t border-glass">Sign Out</button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
