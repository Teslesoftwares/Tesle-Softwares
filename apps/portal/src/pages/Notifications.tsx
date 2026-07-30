import { useState, useEffect } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import { api } from '../lib/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifs = () => {
    setLoading(true);
    api.notifications.list()
      .then((data) => setNotifications(data as any[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchNotifs(); }, []);

  const markRead = async (id: number) => {
    await api.notifications.markRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = async () => {
    await api.notifications.markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unread = notifications.filter((n) => !n.read).length;

  if (loading) return <div className="flex justify-center py-12"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-gray-200 mt-1">{unread} unread notifications</p>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead}
            className="text-sm text-[#d4a853] hover:underline flex items-center gap-1">
            <CheckCheck size={16} /> Mark All Read
          </button>
        )}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-300">No notifications.</div>
        ) : (
          notifications.map((n) => (
            <div key={n.id}
              className={`flex items-start gap-4 px-5 py-4 border-b border-gray-800/50 last:border-0 cursor-pointer hover:bg-gray-800/30 transition-colors ${!n.read ? 'bg-[#d4a853]/[0.02]' : ''}`}
              onClick={() => !n.read && markRead(n.id)}>
              <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${n.read ? 'bg-gray-600' : 'bg-[#d4a853]'}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-gray-200 mt-0.5">{n.message}</p>
                <p className="text-xs text-gray-600 mt-1">{new Date(n.created_at).toLocaleString()}</p>
              </div>
              <Bell size={16} className={`flex-shrink-0 ${n.read ? 'text-gray-600' : 'text-[#d4a853]'}`} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
