import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import BlogPage from './pages/BlogPage';
import TestimonialsPage from './pages/TestimonialsPage';
import CareersPage from './pages/CareersPage';
import LeadsPage from './pages/LeadsPage';
import {
  ProductsPage, SubscriptionsPage, OrganizationsPage, UsersPage,
  RolesPage, PermissionsPage, MarketplacePage, AIConfigPage,
  APIKeysPage, DevelopersPage, TicketsPage, InvoicesPage,
  LicensingPage, FeatureFlagsPage, AuditLogsPage, AnalyticsPage,
  SystemHealthPage,
} from './pages/ManagementPages';

function ProtectedLayout() {
  const { user, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin w-8 h-8 border-2 border-[#d4a853] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64">
        <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur border-b border-gray-800 px-4 py-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-200 hover:text-white">
            <Menu size={22} />
          </button>
        </header>
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/services" element={<ServicesPage />} />
          <Route path="/admin/portfolio" element={<PortfolioPage />} />
          <Route path="/admin/blog" element={<BlogPage />} />
          <Route path="/admin/testimonials" element={<TestimonialsPage />} />
          <Route path="/admin/careers" element={<CareersPage />} />
          <Route path="/admin/leads" element={<LeadsPage />} />
          <Route path="/admin/products" element={<ProductsPage />} />
          <Route path="/admin/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/admin/organizations" element={<OrganizationsPage />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/roles" element={<RolesPage />} />
          <Route path="/admin/permissions" element={<PermissionsPage />} />
          <Route path="/admin/marketplace" element={<MarketplacePage />} />
          <Route path="/admin/ai-config" element={<AIConfigPage />} />
          <Route path="/admin/api-keys" element={<APIKeysPage />} />
          <Route path="/admin/developers" element={<DevelopersPage />} />
          <Route path="/admin/tickets" element={<TicketsPage />} />
          <Route path="/admin/invoices" element={<InvoicesPage />} />
          <Route path="/admin/licensing" element={<LicensingPage />} />
          <Route path="/admin/feature-flags" element={<FeatureFlagsPage />} />
          <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
          <Route path="/admin/analytics" element={<AnalyticsPage />} />
          <Route path="/admin/system-health" element={<SystemHealthPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
