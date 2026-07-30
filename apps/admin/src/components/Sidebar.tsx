import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Code, Image, FileText, MessageSquare, Briefcase, Users,
  LogOut, X, Package, CreditCard, Building2, Shield, Key, ShoppingBag,
  Brain, Terminal, Headphones, Award, Flag, ClipboardList, BarChart3,
  HeartPulse, TicketCheck, ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface NavSection {
  label: string;
  links: { to: string; label: string; icon: React.ComponentType<{ size?: number }> }[];
}

const sections: NavSection[] = [
  {
    label: 'Overview',
    links: [{ to: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Content',
    links: [
      { to: '/admin/services', label: 'Services', icon: Code },
      { to: '/admin/portfolio', label: 'Portfolio', icon: Image },
      { to: '/admin/blog', label: 'Blog Posts', icon: FileText },
      { to: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
      { to: '/admin/careers', label: 'Careers', icon: Briefcase },
      { to: '/admin/leads', label: 'Leads', icon: Users },
    ],
  },
  {
    label: 'Products',
    links: [
      { to: '/admin/products', label: 'Product Management', icon: Package },
      { to: '/admin/subscriptions', label: 'Subscription Plans', icon: CreditCard },
      { to: '/admin/licensing', label: 'Licensing', icon: Award },
      { to: '/admin/feature-flags', label: 'Feature Flags', icon: Flag },
    ],
  },
  {
    label: 'Organizations',
    links: [
      { to: '/admin/organizations', label: 'Organizations', icon: Building2 },
      { to: '/admin/users', label: 'Users', icon: Users },
      { to: '/admin/roles', label: 'Roles', icon: Shield },
      { to: '/admin/permissions', label: 'Permissions', icon: Key },
    ],
  },
  {
    label: 'Platform',
    links: [
      { to: '/admin/marketplace', label: 'Marketplace', icon: ShoppingBag },
      { to: '/admin/ai-config', label: 'AI Configuration', icon: Brain },
      { to: '/admin/api-keys', label: 'API Keys', icon: Key },
      { to: '/admin/developers', label: 'Developers', icon: Terminal },
    ],
  },
  {
    label: 'Operations',
    links: [
      { to: '/admin/tickets', label: 'Support Tickets', icon: TicketCheck },
      { to: '/admin/invoices', label: 'Invoices', icon: FileText },
      { to: '/admin/audit-logs', label: 'Audit Logs', icon: ClipboardList },
    ],
  },
  {
    label: 'Insights',
    links: [
      { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      { to: '/admin/system-health', label: 'System Health', icon: HeartPulse },
    ],
  },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-200 lg:translate-x-0 flex flex-col ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
          <div>
            <h1 className="text-lg font-bold text-[#d4a853]">Tesle Admin</h1>
            <p className="text-xs text-gray-200">{user?.name}</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-200 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
          {sections.map((section) => (
            <div key={section.label}>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-300 px-3 mb-1">{section.label}</div>
              <div className="space-y-0.5">
                {section.links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/admin'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive ? 'bg-[#d4a853]/10 text-[#d4a853]' : 'text-gray-200 hover:text-white hover:bg-gray-800'
                      }`
                    }
                  >
                    <link.icon size={16} />
                    <span className="truncate">{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 p-3 border-t border-gray-800">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:text-red-400 hover:bg-gray-800 w-full transition-colors">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
