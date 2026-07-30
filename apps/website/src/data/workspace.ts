/**
 * TESLE WORKSPACE  Data Layer
 *
 * Backend integration: Replace each export with API calls:
 *   GET /workspace/orgs          → organizations
 *   GET /workspace/user          → currentUser
 *   GET /workspace/apps          → appCards
 *   GET /workspace/notifications → notifications
 *   GET /workspace/widgets       → homeWidgets
 *   GET /workspace/activity      → recentActivities
 *   GET /workspace/files         → recentFiles
 *   GET /workspace/marketplace   → marketplaceItems
 */

import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, Users, ShoppingCart, Briefcase, Receipt, Landmark,
  Package, CreditCard, Kanban, GraduationCap, HeartPulse, Church,
  Hotel, Truck, Brain, Grid3X3, TrendingUp, Bell, FileText,
  ShoppingBag, Headphones, Settings,
} from 'lucide-react';
import { products } from '@/data/products';

export type WorkspaceRole = 'super_admin' | 'admin' | 'manager' | 'member' | 'viewer';

export interface WorkspaceOrg {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  plan: 'starter' | 'business' | 'enterprise';
  activeApps: string[];
}

export interface WorkspaceUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: WorkspaceRole;
  currentOrgId: string;
  orgIds: string[];
}

export interface AppCard {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  status: 'active' | 'coming_soon';
  category: string;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  minRole: WorkspaceRole;
  badge?: number;
}

export interface HomeWidget {
  id: string;
  type: 'kpi' | 'recent' | 'activity' | 'quick_action';
  title: string;
  data: Record<string, string | number>;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  timestamp: string;
  app?: string;
}

export interface RecentActivity {
  id: string;
  action: string;
  target: string;
  user: string;
  time: string;
  app: string;
}

export interface RecentFile {
  id: string;
  name: string;
  size: string;
  modified: string;
  app: string;
}

export interface MarketplaceItem {
  id: string;
  name: string;
  provider: string;
  category: string;
  rating: number;
}

/** Role hierarchy for permission checks */
export const roleHierarchy: Record<WorkspaceRole, number> = {
  super_admin: 100,
  admin: 80,
  manager: 60,
  member: 40,
  viewer: 20,
};

export function hasPermission(userRole: WorkspaceRole, requiredRole: WorkspaceRole): boolean {
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/** Available organizations for switching */
export const organizations: WorkspaceOrg[] = [
  { id: 'org_1', name: 'Tesle Technologies', slug: 'tesle', plan: 'enterprise', activeApps: ['erp', 'crm', 'hr', 'payroll', 'procurement', 'inventory', 'accounting', 'projects', 'pos', 'logistics', 'ai'] },
  { id: 'org_2', name: 'Acme Corp Ltd', slug: 'acme', plan: 'business', activeApps: ['erp', 'crm', 'hr', 'payroll', 'accounting', 'ai'] },
  { id: 'org_3', name: 'Global Healthcare Inc', slug: 'global-health', plan: 'enterprise', activeApps: ['erp', 'hr', 'payroll', 'hospital', 'inventory', 'procurement', 'ai'] },
  { id: 'org_4', name: 'EduStar Schools', slug: 'edustar', plan: 'business', activeApps: ['erp', 'hr', 'payroll', 'school', 'accounting', 'ai'] },
];

/** Current user  replace with auth state */
export const currentUser: WorkspaceUser = {
  id: 'user_1',
  name: 'Arnold Asumbisa',
  email: 'arnold@tesle.ai',
  role: 'super_admin',
  currentOrgId: 'org_1',
  orgIds: ['org_1', 'org_2', 'org_3', 'org_4'],
};

/** Build app cards from existing products data */
export const appCards: AppCard[] = products.map((p) => ({
  slug: p.slug,
  name: p.name.replace('Tesle ', ''),
  description: p.tagline,
  icon: p.icon,
  color: p.color,
  status: 'active' as const,
  category: p.slug === 'ai' ? 'Intelligence' :
    ['erp', 'crm', 'hr', 'payroll', 'procurement', 'inventory', 'accounting'].includes(p.slug) ? 'Operations' :
    ['pos', 'projects'].includes(p.slug) ? 'Business' :
    ['school', 'hospital', 'church', 'hotel'].includes(p.slug) ? 'Industry' : 'Logistics',
}));

/** Sidebar navigation items */
export const sidebarItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: LayoutDashboard, minRole: 'viewer' },
  { id: 'apps', label: 'Apps', icon: Grid3X3, minRole: 'member' },
  { id: 'ai', label: 'AI Assistant', icon: Brain, minRole: 'viewer' },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp, minRole: 'manager' },
  { id: 'notifications', label: 'Notifications', icon: Bell, minRole: 'viewer', badge: 5 },
  { id: 'files', label: 'Files', icon: FileText, minRole: 'member' },
  { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, minRole: 'member' },
  { id: 'support', label: 'Support', icon: Headphones, minRole: 'viewer' },
  { id: 'settings', label: 'Settings', icon: Settings, minRole: 'admin' },
];

/** Home dashboard widgets */
export const homeWidgets: HomeWidget[] = [
  { id: 'active-users', type: 'kpi', title: 'Active Users', data: { value: '24', change: '+3', period: 'today' } },
  { id: 'active-orgs', type: 'kpi', title: 'Organization', data: { value: '4', change: '0', period: 'active' } },
  { id: 'pending-tasks', type: 'kpi', title: 'Pending Tasks', data: { value: '12', change: '-2', period: 'from yesterday' } },
  { id: 'storage', type: 'kpi', title: 'Storage Used', data: { value: '68%', change: '+5%', period: 'this month' } },
];

/** Sample notifications */
export const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Invoice #INV-0241 paid', message: 'Acme Corp paid $12,500.00', type: 'success', read: false, timestamp: '2 min ago', app: 'ERP' },
  { id: 'n2', title: 'New user registered', message: 'Sarah Mensah joined Tesle HR', type: 'info', read: false, timestamp: '15 min ago', app: 'HR' },
  { id: 'n3', title: 'System update available', message: 'Tesle v4.2.0 is ready to install', type: 'warning', read: false, timestamp: '1 hr ago', app: 'Settings' },
  { id: 'n4', title: 'Backup completed', message: 'Daily backup finished successfully', type: 'success', read: true, timestamp: '3 hrs ago', app: 'ERP' },
  { id: 'n5', title: 'API rate limit warning', message: '90% of hourly quota used', type: 'warning', read: true, timestamp: '5 hrs ago', app: 'AI' },
];

export const recentActivities: RecentActivity[] = [
  { id: 'a1', action: 'Created invoice', target: 'INV-0241', user: 'Arnold A.', time: '10 min ago', app: 'ERP' },
  { id: 'a2', action: 'Updated contact', target: 'Sarah Mensah', user: 'You', time: '25 min ago', app: 'CRM' },
  { id: 'a3', action: 'Approved leave', target: 'John Doe - Annual Leave', user: 'You', time: '1 hr ago', app: 'HR' },
  { id: 'a4', action: 'Processed payroll', target: 'June 2026', user: 'System', time: '2 hrs ago', app: 'Payroll' },
  { id: 'a5', action: 'Added product', target: 'Widget Pro X1', user: 'Grace A.', time: '3 hrs ago', app: 'Inventory' },
];

/** Recent files */
export const recentFiles: RecentFile[] = [
  { id: 'f1', name: 'Q2_Financial_Report.xlsx', size: '2.4 MB', modified: '2 hrs ago', app: 'Accounting' },
  { id: 'f2', name: 'Employee_Onboarding_v3.pdf', size: '856 KB', modified: '5 hrs ago', app: 'HR' },
  { id: 'f3', name: 'Project_Proposal_Hospital.pptx', size: '4.1 MB', modified: '1 day ago', app: 'Projects' },
];

/** Marketplace featured items */
export const marketplaceItems: MarketplaceItem[] = [
  { id: 'm1', name: 'Payment Gateway', provider: 'PayStack', category: 'Finance', rating: 4.8 },
  { id: 'm2', name: 'SMS Notification', provider: 'Twilio', category: 'Communication', rating: 4.6 },
  { id: 'm3', name: 'E-Signature', provider: 'DocuSign', category: 'Productivity', rating: 4.7 },
  { id: 'm4', name: 'Tax Calculator', provider: 'TaxPro', category: 'Finance', rating: 4.5 },
  { id: 'm5', name: 'Email Marketing', provider: 'Mailchimp', category: 'Marketing', rating: 4.4 },
  { id: 'm6', name: 'Data Analytics', provider: 'Power BI', category: 'Analytics', rating: 4.9 },
];
