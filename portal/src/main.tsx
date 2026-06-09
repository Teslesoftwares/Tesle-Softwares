import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider, useSocket } from './context/SocketContext';
import { Sidebar, Header } from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Tickets from './pages/Tickets';
import Files from './pages/Files';
import Invoices from './pages/Invoices';
import Meetings from './pages/Meetings';
import AIAssistant from './pages/AIAssistant';
import Notifications from './pages/Notifications';
import './index.css';

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const { socket } = useSocket();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    if (!socket) return;
    socket.on('notification', () => {
      setNotifCount((c) => c + 1);
    });
    return () => { socket.off('notification'); };
  }, [socket]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-spin w-8 h-8 border-2 border-[#d4a853] border-t-transparent rounded-full" />
    </div>
  );

  if (!user) return <Navigate to="/portal/login" replace />;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        {notifCount > 0 && (
          <div className="fixed top-4 right-4 z-50 bg-[#d4a853] text-black px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm animate-pulse">
            <Bell size={16} />
            New notification
          </div>
        )}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal/register" element={<Register />} />
            <Route element={<ProtectedLayout />}>
              <Route path="/portal" element={<Dashboard />} />
              <Route path="/portal/projects" element={<Projects />} />
              <Route path="/portal/projects/:id" element={<ProjectDetail />} />
              <Route path="/portal/tickets" element={<Tickets />} />
              <Route path="/portal/files" element={<Files />} />
              <Route path="/portal/invoices" element={<Invoices />} />
              <Route path="/portal/meetings" element={<Meetings />} />
              <Route path="/portal/ai" element={<AIAssistant />} />
              <Route path="/portal/notifications" element={<Notifications />} />
            </Route>
            <Route path="*" element={<Navigate to="/portal" replace />} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(<App />);
