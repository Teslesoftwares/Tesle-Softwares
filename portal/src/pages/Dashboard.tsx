import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderOpen, Ticket, Receipt, Calendar, Bell, TrendingUp, Clock } from 'lucide-react';
import { api } from '../lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [recentTickets, setRecentTickets] = useState<Record<string, unknown>[]>([]);
  const [notifications, setNotifications] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    Promise.all([
      api.projects.list(),
      api.tickets.list(),
      api.invoices.list(),
      api.meetings.list(),
      api.notifications.list(),
    ]).then(([projects, tickets, invoices, meetings, notifs]) => {
      setStats({
        projects: (projects as unknown[]).length,
        tickets: (tickets as unknown[]).length,
        invoices: (invoices as unknown[]).length,
        meetings: (meetings as unknown[]).length,
      });
      setRecentTickets((tickets as Record<string, unknown>[]).slice(0, 5));
      setNotifications((notifs as Record<string, unknown>[]).slice(0, 5));
    }).catch(console.error);
  }, []);

  const cards = [
    { label: 'Active Projects', value: stats.projects || 0, icon: <FolderOpen size={22} />, color: 'text-blue-400', link: '/portal/projects' },
    { label: 'Support Tickets', value: stats.tickets || 0, icon: <Ticket size={22} />, color: 'text-purple-400', link: '/portal/tickets' },
    { label: 'Invoices', value: stats.invoices || 0, icon: <Receipt size={22} />, color: 'text-green-400', link: '/portal/invoices' },
    { label: 'Meetings', value: stats.meetings || 0, icon: <Calendar size={22} />, color: 'text-cyan-400', link: '/portal/meetings' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">Welcome to your client portal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link key={card.label} to={card.link}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4 hover:border-gray-700 transition-colors">
            <div className={`p-3 rounded-lg bg-gray-800 ${card.color}`}>{card.icon}</div>
            <div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-sm text-gray-400">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2"><Ticket size={16} className="text-gray-400" /> Recent Tickets</h2>
            <Link to="/portal/tickets" className="text-xs text-[#d4a853] hover:underline">View All</Link>
          </div>
          {recentTickets.length === 0 ? (
            <p className="text-sm text-gray-500">No tickets yet.</p>
          ) : (
            <div className="space-y-3">
              {recentTickets.map((t: any) => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                  <p className="text-sm font-medium">{t.subject}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    t.status === 'open' ? 'bg-green-900/30 text-green-400' :
                    t.status === 'in-progress' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-800 text-gray-400'
                  }`}>{t.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2"><Bell size={16} className="text-gray-400" /> Notifications</h2>
            <Link to="/portal/notifications" className="text-xs text-[#d4a853] hover:underline">View All</Link>
          </div>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications.</p>
          ) : (
            <div className="space-y-3">
              {notifications.map((n: any) => (
                <div key={n.id} className="flex items-start gap-3 py-2 border-b border-gray-800/50 last:border-0">
                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${n.read ? 'bg-gray-600' : 'bg-[#d4a853]'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-gray-400 truncate">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
