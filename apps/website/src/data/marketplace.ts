/**
 * TESLE MARKETPLACE  Data Layer
 *
 * Backend integration: Replace each export with API calls:
 *   GET  /api/v1/marketplace/items          → marketplaceItems
 *   GET  /api/v1/marketplace/items?type=X   → filtered items
 *   GET  /api/v1/marketplace/featured       → featured items
 *   GET  /api/v1/marketplace/developers     → developers
 *   GET  /api/v1/marketplace/developers/:id → developer profile
 *   POST /api/v1/marketplace/install        → installItem
 *   GET  /api/v1/marketplace/installed      → installedItems
 */

import type { LucideIcon } from 'lucide-react';
import {
  Clock, FileText, Kanban, Moon, Droplets, Palette, TrendingUp,
  Package, UserCheck, Calculator, Video, Puzzle, HeartPulse,
  Globe, Shield, Database, Mail, MessageSquare,
  FileSpreadsheet, PieChart, BarChart3, Cloud,
  Smartphone, Users, Share2, CreditCard,
  Layout, Bot, Cpu, Network, Grid3X3,
} from 'lucide-react';

export type MarketplaceItemType = 'app' | 'integration' | 'theme' | 'template' | 'report' | 'ai_agent' | 'extension';

export interface MarketplaceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  type: MarketplaceItemType;
  category: string;
  provider: string;
  developerId: string;
  icon: LucideIcon;
  color: string;
  screenshots: string[];
  rating: number;
  ratingCount: number;
  installCount: number;
  featured: boolean;
  verified: boolean;
  pricing: 'free' | 'paid' | 'freemium';
  price?: string;
  version: string;
  updatedAt: string;
  size?: string;
  requirements: string[];
  permissions: string[];
  worksWith: string[];
}

export interface DeveloperProfile {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  website: string;
  email: string;
  itemsCount: number;
  totalInstalls: number;
  verified: boolean;
  joinedAt: string;
}

export interface InstalledItem {
  itemId: string;
  orgId: string;
  installedAt: string;
  status: 'active' | 'inactive' | 'updating';
  config?: Record<string, unknown>;
}

export const marketplaceTypes: { value: MarketplaceItemType; label: string; icon: LucideIcon }[] = [
  { value: 'app', label: 'Apps', icon: Grid3X3 },
  { value: 'integration', label: 'Integrations', icon: Share2 },
  { value: 'theme', label: 'Themes', icon: Palette },
  { value: 'template', label: 'Templates', icon: Layout },
  { value: 'report', label: 'Reports', icon: PieChart },
  { value: 'ai_agent', label: 'AI Agents', icon: Bot },
  { value: 'extension', label: 'Extensions', icon: Puzzle },
];

export const marketplaceCategories: string[] = [
  'All', 'Analytics', 'Communication', 'Finance', 'HR', 'Marketing',
  'Productivity', 'Sales', 'Security', 'AI & ML', 'Development',
  'Design', 'Compliance', 'Data', 'Infrastructure', 'E-commerce',
];

const screenshots = ['/placeholder-1.png', '/placeholder-2.png', '/placeholder-3.png'];

function item(
  id: string, name: string, tagline: string, desc: string,
  type: MarketplaceItemType, category: string, provider: string,
  devId: string, icon: LucideIcon, color: string,
  rating: number, ratingCount: number, installCount: number,
  featured: boolean, verified: boolean, pricing: 'free' | 'paid' | 'freemium',
  price: string | undefined, version: string, updatedAt: string,
  size: string | undefined, requirements: string[], permissions: string[],
  worksWith: string[],
): MarketplaceItem {
  return {
    id, name, tagline, description: desc, type, category, provider, developerId: devId,
    icon, color, screenshots, rating, ratingCount, installCount,
    featured, verified, pricing, price, version, updatedAt, size,
    requirements, permissions, worksWith,
  };
}

export const marketplaceItems: MarketplaceItem[] = [
  // ─── APPS ───
  item('m_app_1', 'Timesheet Pro', 'Time tracking for teams of any size',
    'Track work hours, manage timesheets, and generate payroll-ready reports. Integrates with Tesle Payroll and HR.',
    'app', 'Productivity', 'Tesle Labs', 'dev_tesle', Clock, 'from-blue-500 to-cyan-500',
    4.8, 1247, 34200, true, true, 'freemium', undefined, '2.4.1', '2026-06-15', '4.2 MB',
    ['Tesle Workspace v4+', 'Node.js 18+'], ['timesheet:read', 'timesheet:write', 'calendar:read'], ['hr', 'payroll']),

  item('m_app_2', 'DocuFlow', 'Document management & e-signatures',
    'Upload, sign, and manage documents with enterprise-grade e-signatures and workflow automation.',
    'app', 'Productivity', 'SignTech', 'dev_signtech', FileText, 'from-violet-500 to-purple-500',
    4.7, 892, 28100, true, true, 'paid', '$9.99/mo', '3.1.0', '2026-06-20', '6.8 MB',
    ['Tesle Workspace v4+'], ['files:read', 'files:write', 'notifications:send'], ['erp', 'hr', 'projects']),

  item('m_app_3', 'TeamBoard', 'Visual project management',
    'Kanban boards, Gantt charts, and sprint planning for agile teams. Syncs with Tesle Projects.',
    'app', 'Productivity', 'AgileSoft', 'dev_agile', Kanban, 'from-emerald-500 to-green-500',
    4.6, 1563, 51200, true, true, 'freemium', undefined, '4.0.2', '2026-06-18', '3.5 MB',
    ['Tesle Workspace v4+'], ['projects:read', 'projects:write', 'notifications:send'], ['projects']),

  // ─── INTEGRATIONS ───
  item('m_int_1', 'PayStack Payments', 'Accept payments across Africa',
    'Integrate PayStack payment gateway for seamless transactions in 15+ African countries.',
    'integration', 'Finance', 'PayStack', 'dev_paystack', CreditCard, 'from-green-400 to-emerald-600',
    4.9, 2341, 89400, true, true, 'free', undefined, '2.0.0', '2026-06-22', '1.2 MB',
    ['Active PayStack account', 'Tesle POS v2+'], ['payment:process', 'payment:refund', 'invoices:read'], ['pos', 'erp', 'crm']),

  item('m_int_2', 'Twilio SMS & Voice', 'SMS, voice & WhatsApp integration',
    'Send SMS, make voice calls, and integrate WhatsApp messaging across your Tesle workspace.',
    'integration', 'Communication', 'Twilio', 'dev_twilio', MessageSquare, 'from-red-500 to-orange-500',
    4.7, 1876, 67300, true, true, 'free', undefined, '3.2.1', '2026-06-10', '890 KB',
    ['Active Twilio account'], ['sms:send', 'voice:call', 'notifications:send'], ['crm', 'hr', 'marketing']),

  item('m_int_3', 'Slack Connect', 'Real-time workspace notifications',
    'Send Tesle notifications, alerts, and reports directly to your Slack channels.',
    'integration', 'Communication', 'Slack', 'dev_slack', MessageSquare, 'from-purple-500 to-pink-500',
    4.8, 2104, 78200, true, true, 'free', undefined, '1.5.0', '2026-06-01', '450 KB',
    ['Slack workspace', 'Tesle Workspace v4+'], ['notifications:send', 'messages:read'], ['all']),

  item('m_int_4', 'Mailchimp Marketing', 'Email marketing & automation',
    'Sync contacts, segment audiences, and launch email campaigns directly from Tesle CRM.',
    'integration', 'Marketing', 'Mailchimp', 'dev_mailchimp', Mail, 'from-yellow-500 to-orange-500',
    4.5, 1456, 45100, false, true, 'free', undefined, '1.3.0', '2026-05-28', '670 KB',
    ['Mailchimp account', 'Tesle CRM v3+'], ['contacts:read', 'contacts:sync', 'campaigns:create'], ['crm']),

  item('m_int_5', 'DocuSign E-Signatures', 'Legally binding e-signatures',
    'Send documents for signature, track status, and manage templates with DocuSign.',
    'integration', 'Productivity', 'DocuSign', 'dev_docusign', FileSpreadsheet, 'from-blue-500 to-indigo-500',
    4.6, 987, 31200, false, true, 'paid', 'From $10/mo', '2.1.0', '2026-06-15', '780 KB',
    ['DocuSign account', 'Tesle Workspace v4+'], ['documents:sign', 'documents:send'], ['erp', 'hr', 'crm']),

  item('m_int_6', 'Power BI Analytics', 'Advanced BI & dashboards',
    'Push Tesle data to Power BI for custom dashboards, drill-down analytics, and AI insights.',
    'integration', 'Analytics', 'Microsoft', 'dev_microsoft', BarChart3, 'from-yellow-400 to-amber-600',
    4.8, 654, 19800, false, true, 'free', undefined, '1.1.0', '2026-06-20', '520 KB',
    ['Power BI license', 'Tesle Workspace v4+'], ['analytics:read', 'analytics:export'], ['all']),

  item('m_int_7', 'Zoom Meetings', 'Video conferencing integration',
    'Schedule, join, and manage Zoom meetings directly from Tesle Calendar and CRM.',
    'integration', 'Communication', 'Zoom', 'dev_zoom', Video, 'from-blue-400 to-cyan-500',
    4.7, 1789, 56700, false, true, 'free', undefined, '2.0.1', '2026-06-12', '340 KB',
    ['Zoom account', 'Tesle Workspace v4+'], ['calendar:write', 'meetings:create'], ['crm', 'hr', 'projects']),

  // ─── THEMES ───
  item('m_thm_1', 'Midnight Pro', 'Dark theme optimized for enterprise',
    'A premium dark theme with carefully balanced contrast ratios for extended work sessions.',
    'theme', 'Design', 'ThemeCraft', 'dev_themecraft', Moon, 'from-slate-800 to-slate-900',
    4.9, 342, 12800, true, false, 'paid', '$4.99', '1.2.0', '2026-06-18', '2.1 MB',
    ['Tesle Workspace v4+'], ['theme:apply'], []),

  item('m_thm_2', 'Ocean Breeze', 'Calming blue-toned light theme',
    'A serene light theme with ocean-inspired colors. Easy on the eyes for all-day use.',
    'theme', 'Design', 'ThemeCraft', 'dev_themecraft', Droplets, 'from-sky-300 to-blue-400',
    4.7, 215, 8900, false, false, 'free', undefined, '1.0.0', '2026-06-10', '1.8 MB',
    ['Tesle Workspace v4+'], ['theme:apply'], []),

  item('m_thm_3', 'Enterprise Gold', 'Professional gold-accented theme',
    'A sophisticated theme with gold accents  perfect for enterprise admin panels and dashboards.',
    'theme', 'Design', 'Tesle Design', 'dev_tesle', Palette, 'from-amber-500 to-yellow-500',
    4.8, 178, 6700, true, true, 'free', undefined, '1.1.0', '2026-06-22', '2.4 MB',
    ['Tesle Workspace v4+'], ['theme:apply'], []),

  // ─── TEMPLATES ───
  item('m_tpl_1', 'Project Dashboard', 'Pre-built project management dashboard',
    'A comprehensive project dashboard template with KPIs, timelines, resource allocation, and risk tracking.',
    'template', 'Productivity', 'Tesle Templates', 'dev_tesle', Layout, 'from-red-500 to-orange-500',
    4.8, 567, 23400, true, true, 'free', undefined, '2.0.0', '2026-06-20', '340 KB',
    ['Tesle Projects'], ['templates:use'], ['projects']),

  item('m_tpl_2', 'Financial Report Suite', 'Professional financial report templates',
    'A suite of financial report templates including P&L, balance sheet, cash flow, and budget variance.',
    'template', 'Finance', 'Tesle Templates', 'dev_tesle', FileSpreadsheet, 'from-emerald-500 to-green-500',
    4.9, 432, 19800, true, true, 'free', undefined, '1.3.0', '2026-06-15', '280 KB',
    ['Tesle Accounting'], ['templates:use'], ['accounting']),

  item('m_tpl_3', 'HR Onboarding Kit', 'Complete employee onboarding workflow',
    'Everything you need for new hire onboarding  checklists, document templates, and email sequences.',
    'template', 'HR', 'HR Pro Templates', 'dev_hrpro', Users, 'from-pink-500 to-rose-500',
    4.7, 389, 15600, false, true, 'free', undefined, '1.1.0', '2026-06-08', '420 KB',
    ['Tesle HR'], ['templates:use'], ['hr']),

  item('m_tpl_4', 'Sales Playbook', 'CRM-driven sales process templates',
    'Pre-built sales stages, email sequences, call scripts, and deal tracking templates for Tesle CRM.',
    'template', 'Sales', 'Tesle Templates', 'dev_tesle', TrendingUp, 'from-emerald-500 to-teal-500',
    4.6, 521, 21300, false, true, 'free', undefined, '1.2.0', '2026-06-12', '310 KB',
    ['Tesle CRM'], ['templates:use'], ['crm']),

  item('m_tpl_5', 'Hospital Discharge Summary', 'Medical discharge template for Tesle Hospital',
    'A compliant discharge summary template with all required clinical sections and regulatory fields.',
    'template', 'Healthcare', 'MediTemplates', 'dev_medi', HeartPulse, 'from-red-500 to-pink-500',
    4.8, 198, 8700, false, true, 'paid', '$2.99', '1.0.0', '2026-06-01', '190 KB',
    ['Tesle Hospital'], ['templates:use'], ['hospital']),

  // ─── REPORTS ───
  item('m_rpt_1', 'Executive Dashboard', 'C-suite business performance report',
    'Real-time executive dashboard showing revenue, profitability, growth metrics, and operational KPIs.',
    'report', 'Analytics', 'Tesle Analytics', 'dev_tesle', BarChart3, 'from-amber-500 to-yellow-500',
    4.9, 876, 34500, true, true, 'free', undefined, '3.0.1', '2026-06-22', 'N/A',
    ['Tesle ERP', 'Tesle Accounting'], ['analytics:read'], ['erp', 'accounting']),

  item('m_rpt_2', 'Inventory Health Report', 'Stock status & reorder analytics',
    'Comprehensive inventory report with stock levels, turnover rates, dead stock alerts, and reorder predictions.',
    'report', 'Analytics', 'Supply Chain Labs', 'dev_supplychain', Package, 'from-green-400 to-emerald-600',
    4.7, 543, 18900, true, true, 'paid', '$5.99/mo', '2.1.0', '2026-06-18', 'N/A',
    ['Tesle Inventory'], ['inventory:read', 'analytics:read'], ['inventory']),

  item('m_rpt_3', 'Employee Satisfaction Report', 'HR sentiment & engagement analytics',
    'Analyze employee satisfaction trends, turnover risks, and engagement scores across departments.',
    'report', 'HR', 'People Analytics', 'dev_peopleanalytics', Users, 'from-violet-500 to-purple-500',
    4.6, 312, 11200, false, true, 'freemium', undefined, '1.4.0', '2026-06-14', 'N/A',
    ['Tesle HR'], ['hr:read', 'analytics:read'], ['hr']),

  // ─── AI AGENTS ───
  item('m_agent_1', 'Sales Assistant', 'AI agent for CRM automation',
    'Automates lead scoring, follow-up emails, meeting scheduling, and deal insights with natural language.',
    'ai_agent', 'AI & ML', 'Tesle AI', 'dev_tesle', Bot, 'from-emerald-400 to-green-500',
    4.9, 1234, 45600, true, true, 'freemium', undefined, '2.2.0', '2026-06-22', 'N/A',
    ['Tesle CRM', 'Tesle AI Platform'], ['crm:read', 'crm:write', 'email:send', 'calendar:write'], ['crm']),

  item('m_agent_2', 'Inventory Optimizer', 'AI agent for stock management',
    'Predicts demand, automates reordering, identifies slow movers, and optimizes safety stock levels.',
    'ai_agent', 'AI & ML', 'Tesle AI', 'dev_tesle', Cpu, 'from-blue-400 to-cyan-500',
    4.8, 876, 31200, true, true, 'paid', '$14.99/mo', '1.5.0', '2026-06-20', 'N/A',
    ['Tesle Inventory', 'Tesle AI Platform'], ['inventory:read', 'inventory:write', 'purchasing:read'], ['inventory', 'procurement']),

  item('m_agent_3', 'HR Screening Bot', 'AI agent for candidate screening',
    'Automatically screens resumes, schedules interviews, and scores candidates against job requirements.',
    'ai_agent', 'AI & ML', 'RecruitAI', 'dev_recruitai', UserCheck, 'from-pink-400 to-rose-500',
    4.7, 654, 22300, false, true, 'paid', '$19.99/mo', '1.3.0', '2026-06-16', 'N/A',
    ['Tesle HR'], ['hr:read', 'hr:write', 'email:send'], ['hr']),

  item('m_agent_4', 'Financial Analyst', 'AI agent for accounting automation',
    'Automates reconciliation, generates journal entries, flags anomalies, and explains financial variances.',
    'ai_agent', 'AI & ML', 'Tesle AI', 'dev_tesle', Calculator, 'from-amber-400 to-yellow-500',
    4.8, 543, 18900, false, true, 'paid', '$12.99/mo', '2.0.0', '2026-06-18', 'N/A',
    ['Tesle Accounting', 'Tesle AI Platform'], ['accounting:read', 'accounting:write'], ['accounting']),

  // ─── EXTENSIONS ───
  item('m_ext_1', 'Multi-Currency Support', 'Handle 150+ currencies across Tesle',
    'Adds multi-currency support to Tesle ERP, Accounting, and POS with real-time exchange rates.',
    'extension', 'Finance', 'Tesle Labs', 'dev_tesle', Globe, 'from-green-400 to-emerald-600',
    4.8, 2341, 67800, true, true, 'paid', '$7.99/mo', '1.4.0', '2026-06-22', '1.5 MB',
    ['Tesle ERP v4+'], ['settings:write', 'accounting:read', 'pricing:read'], ['erp', 'accounting', 'pos']),

  item('m_ext_2', 'Advanced Security Suite', 'Enterprise security & compliance pack',
    'Adds SSO, 2FA, IP whitelisting, audit logging enhancements, and GDPR compliance tools.',
    'extension', 'Security', 'SecureStack', 'dev_securestack', Shield, 'from-red-500 to-rose-500',
    4.9, 1876, 51200, true, true, 'paid', '$19.99/mo', '3.1.0', '2026-06-21', '2.8 MB',
    ['Tesle Workspace v4+'], ['security:manage', 'settings:write', 'audit:read'], ['all']),

  item('m_ext_3', 'Offline Mode', 'Work offline, sync when connected',
    'Enables offline data access and local storage for Tesle apps. Changes sync automatically when online.',
    'extension', 'Infrastructure', 'Offline Labs', 'dev_offline', Cloud, 'from-blue-400 to-indigo-500',
    4.6, 987, 28900, false, true, 'paid', '$4.99/mo', '1.2.0', '2026-06-14', '4.5 MB',
    ['Tesle Workspace v4+'], ['storage:local', 'sync:manage'], ['all']),

  item('m_ext_4', 'Custom Fields Manager', 'Add custom fields to any Tesle module',
    'Create, manage, and report on custom fields across all Tesle apps without development.',
    'extension', 'Productivity', 'Tesle Labs', 'dev_tesle', Database, 'from-violet-400 to-purple-500',
    4.7, 765, 23400, true, true, 'free', undefined, '2.0.0', '2026-06-19', '890 KB',
    ['Tesle Workspace v4+'], ['settings:write', 'data:manage'], ['all']),

  item('m_ext_5', 'Mobile App Builder', 'Custom mobile apps for your org',
    'Build and deploy custom mobile apps connected to your Tesle data without writing code.',
    'extension', 'Development', 'AppForge', 'dev_appforge', Smartphone, 'from-cyan-400 to-teal-500',
    4.5, 432, 12300, false, false, 'paid', '$29.99/mo', '1.0.0', '2026-06-10', 'N/A',
    ['Tesle Workspace v4+'], ['api:manage', 'data:read'], []),
];

export const marketplaceDevelopers: DeveloperProfile[] = [
  {
    id: 'dev_tesle',
    name: 'Tesle Labs',
    bio: 'Official Tesle development team building high-quality apps, templates, and AI agents for the Tesle ecosystem.',
    website: 'https://tesle.ai',
    email: 'labs@tesle.ai',
    itemsCount: 8,
    totalInstalls: 245000,
    verified: true,
    joinedAt: '2024-01-01',
  },
  {
    id: 'dev_signtech',
    name: 'SignTech',
    bio: 'Enterprise e-signature and document workflow solutions provider.',
    website: 'https://signtech.example.com',
    email: 'hello@signtech.example.com',
    itemsCount: 2,
    totalInstalls: 28100,
    verified: true,
    joinedAt: '2024-03-15',
  },
  {
    id: 'dev_paystack',
    name: 'PayStack',
    bio: 'Leading African payment gateway powering businesses across the continent.',
    website: 'https://paystack.com',
    email: 'partners@paystack.com',
    itemsCount: 1,
    totalInstalls: 89400,
    verified: true,
    joinedAt: '2024-02-01',
  },
  {
    id: 'dev_twilio',
    name: 'Twilio',
    bio: 'Customer engagement platform powering communications for businesses worldwide.',
    website: 'https://twilio.com',
    email: 'partners@twilio.com',
    itemsCount: 1,
    totalInstalls: 67300,
    verified: true,
    joinedAt: '2024-02-15',
  },
  {
    id: 'dev_themecraft',
    name: 'ThemeCraft',
    bio: 'Crafting beautiful, accessible themes for enterprise workspaces.',
    website: 'https://themecraft.example.com',
    email: 'hello@themecraft.example.com',
    itemsCount: 2,
    totalInstalls: 21700,
    verified: false,
    joinedAt: '2025-01-10',
  },
  {
    id: 'dev_agile',
    name: 'AgileSoft',
    bio: 'Agile project management tools for modern teams.',
    website: 'https://agilesoft.example.com',
    email: 'team@agilesoft.example.com',
    itemsCount: 1,
    totalInstalls: 51200,
    verified: true,
    joinedAt: '2024-04-01',
  },
];

const installed: InstalledItem[] = [];

export function getInstalledItems(orgId: string): InstalledItem[] {
  return installed.filter((i) => i.orgId === orgId);
}

export function getItemById(id: string): MarketplaceItem | undefined {
  return marketplaceItems.find((i) => i.id === id);
}

export function getDeveloperById(id: string): DeveloperProfile | undefined {
  return marketplaceDevelopers.find((d) => d.id === id);
}

export function getDeveloperItems(developerId: string): MarketplaceItem[] {
  return marketplaceItems.filter((i) => i.developerId === developerId);
}

export function getFeaturedItems(): MarketplaceItem[] {
  return marketplaceItems.filter((i) => i.featured);
}

export function getItemsByType(type: MarketplaceItemType): MarketplaceItem[] {
  return marketplaceItems.filter((i) => i.type === type);
}

export function getItemsByCategory(category: string): MarketplaceItem[] {
  if (category === 'All') return marketplaceItems;
  return marketplaceItems.filter((i) => i.category === category);
}

export function searchItems(query: string): MarketplaceItem[] {
  const q = query.toLowerCase();
  return marketplaceItems.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.tagline.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q) ||
      i.provider.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q),
  );
}

export function installItem(itemId: string, orgId: string): InstalledItem {
  const existing = installed.find((i) => i.itemId === itemId && i.orgId === orgId);
  if (existing) return existing;
  const entry: InstalledItem = {
    itemId, orgId,
    installedAt: new Date().toISOString(),
    status: 'active',
  };
  installed.push(entry);
  return entry;
}

