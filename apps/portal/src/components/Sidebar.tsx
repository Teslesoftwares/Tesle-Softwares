import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, Ticket, FileText, Receipt,
  Calendar, Bot, Bell, LogOut, X, Menu,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

const links = [
  { to: '/portal', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/portal/projects', label: 'Projects', icon: FolderOpen },
  { to: '/portal/tickets', label: 'Support', icon: Ticket },
  { to: '/portal/files', label: 'Files', icon: FileText },
  { to: '/portal/invoices', label: 'Invoices', icon: Receipt },
  { to: '/portal/meetings', label: 'Meetings', icon: Calendar },
  { to: '/portal/ai', label: 'AI Assistant', icon: Bot },
  { to: '/portal/notifications', label: 'Notifications', icon: Bell },
];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { user, logout } = useAuth();
  const { connected } = useSocket();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-200 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div>
            <h1 className="text-lg font-bold text-[#d4a853]">Client Portal</h1>
            <p className="text-xs text-gray-200 flex items-center gap-1">
              {user?.name}
              <span className={`inline-block w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-600'}`} />
            </p>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-200 hover:text-white"><X size={20} /></button>
        </div>
        <nav className="p-3 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-[#d4a853]/10 text-[#d4a853]' : 'text-gray-200 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <link.icon size={18} />
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800">
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-200 hover:text-red-400 hover:bg-gray-800 w-full transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth();
  const { connected } = useSocket();

  return (
    <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-4 py-3 flex items-center justify-between lg:hidden">
      <button onClick={onMenuClick} className="text-gray-200 hover:text-white"><Menu size={22} /></button>
      <div className="flex items-center gap-2 text-sm">
        <span className="text-gray-200">{user?.name}</span>
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-600'}`} />
      </div>
    </header>
  );
}
