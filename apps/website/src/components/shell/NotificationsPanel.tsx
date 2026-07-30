import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Check } from 'lucide-react';
import { useShell } from './ShellContext';

const mockNotifications = [
  { id: 1, title: 'New feature released', message: 'Tesle AI now supports custom model training', type: 'info', time: '2m ago', read: false },
  { id: 2, title: 'System update', message: 'Scheduled maintenance on Saturday 2am-4am UTC', type: 'warning', time: '1h ago', read: false },
  { id: 3, title: 'Welcome to Tesle', message: 'Get started with our quick setup guide', type: 'success', time: '3h ago', read: true },
  { id: 4, title: 'Pricing updated', message: 'New Starter plan now available for free', type: 'info', time: '1d ago', read: true },
  { id: 5, title: 'New integrations', message: 'Slack and Microsoft Teams integrations now live', type: 'success', time: '2d ago', read: true },
];

export function NotificationsPanel() {
  const { notificationsOpen, setNotificationsOpen } = useShell();
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setNotificationsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed top-14 right-4 w-80 sm:w-96 bg-card border border-glass-hover rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-glass">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-text">Notifications</span>
                {unread > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-accent/20 text-accent">
                    {unread}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="text-[11px] text-accent hover:text-accent/80 transition-colors font-medium">
                  Mark all read
                </button>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 rounded-lg text-muted hover:text-text hover:bg-glass-hover transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-4 py-3 hover:bg-glass-hover transition-colors cursor-pointer ${
                    !n.read ? 'bg-accent/[0.03]' : ''
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    n.type === 'success' ? 'bg-green-400' :
                    n.type === 'warning' ? 'bg-yellow-400' :
                    n.type === 'error' ? 'bg-red-400' : 'bg-accent'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-text">{n.title}</span>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                    </div>
                    <p className="text-xs text-muted mt-0.5 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-muted mt-1 block">{n.time}</span>
                  </div>
                  {n.read && <Check className="w-3.5 h-3.5 text-muted shrink-0 mt-0.5" />}
                </div>
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-glass text-center">
              <button className="text-xs font-medium text-accent hover:text-accent/80 transition-colors">
                View all notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
