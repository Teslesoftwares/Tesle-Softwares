export interface Product {
  id: number; name: string; slug: string; description: string; price: string;
  category: string; status: 'active' | 'inactive'; version: string; updated: string;
}

export interface SubscriptionPlan {
  id: number; name: string; slug: string; price: number; interval: string;
  features: string[]; tier: string; popular: boolean; active: boolean; users: number;
}

export interface Organization {
  id: number; name: string; slug: string; plan: string; users: number;
  status: 'active' | 'suspended' | 'trial'; created: string; apps: string[];
}

export interface AdminUser {
  id: number; name: string; email: string; role: string; orgId: number;
  orgName: string; status: 'active' | 'invited' | 'disabled'; lastActive: string;
}

export interface Role {
  id: number; name: string; slug: string; description: string;
  users: number; permissions: string[]; system: boolean;
}

export interface Permission {
  id: number; resource: string; action: string; role: string;
  description: string; grant: boolean;
}

export interface MarketplaceListing {
  id: number; name: string; provider: string; category: string;
  price: string; rating: number; installs: number; status: 'published' | 'draft' | 'pending';
}

export interface AIConfig {
  id: number; model: string; provider: string; endpoint: string;
  maxTokens: number; temperature: number; enabled: boolean; cost: number;
}

export interface ApiKey {
  id: number; name: string; key: string; scopes: string[];
  created: string; lastUsed: string; status: 'active' | 'revoked'; user: string;
}

export interface DeveloperApp {
  id: number; name: string; type: string; clientId: string;
  user: string; org: string; created: string; status: 'active' | 'inactive';
}

export interface Ticket {
  id: number; subject: string; user: string; org: string; priority: string;
  status: string; category: string; assignee: string; created: string; updated: string;
}

export interface Invoice {
  id: number; number: string; org: string; plan: string; amount: number;
  status: string; issued: string; due: string; paid?: string;
}

export interface License {
  id: number; key: string; org: string; product: string; seats: number;
  used: number; expires: string; status: 'active' | 'expired' | 'revoked';
}

export interface FeatureFlag {
  id: number; key: string; name: string; description: string;
  enabled: boolean; env: string; owner: string; updated: string;
}

export interface AuditLog {
  id: number; action: string; resource: string; user: string;
  org: string; ip: string; timestamp: string; details: string;
}

export interface AnalyticsMetric {
  id: number; label: string; value: string; change: string; trend: 'up' | 'down' | 'neutral';
}

export interface SystemMetric {
  id: number; label: string; value: string; status: string; threshold: string;
}

export const sampleProducts: Product[] = [
  { id: 1, name: 'Tesle ERP', slug: 'erp', description: 'Enterprise Resource Planning', price: '$19/mo', category: 'Operations', status: 'active', version: '4.2.0', updated: '2026-07-01' },
  { id: 2, name: 'Tesle CRM', slug: 'crm', description: 'Customer Relationship Management', price: '$14/mo', category: 'Operations', status: 'active', version: '3.8.1', updated: '2026-06-28' },
  { id: 3, name: 'Tesle HR', slug: 'hr', description: 'Human Resources Management', price: '$9/mo', category: 'Operations', status: 'active', version: '2.5.0', updated: '2026-06-25' },
  { id: 4, name: 'Tesle Payroll', slug: 'payroll', description: 'Payroll & Tax Compliance', price: '$7/mo', category: 'Operations', status: 'active', version: '3.1.2', updated: '2026-06-20' },
  { id: 5, name: 'Tesle Procurement', slug: 'procurement', description: 'Procurement & Supply Chain', price: '$12/mo', category: 'Operations', status: 'active', version: '2.0.0', updated: '2026-06-15' },
  { id: 6, name: 'Tesle AI', slug: 'ai', description: 'AI Intelligence Layer', price: '$29/mo', category: 'Intelligence', status: 'active', version: '1.5.0', updated: '2026-07-02' },
  { id: 7, name: 'Tesle School', slug: 'school', description: 'School Management System', price: '$15/mo', category: 'Industry', status: 'active', version: '3.0.0', updated: '2026-06-10' },
  { id: 8, name: 'Tesle Hospital', slug: 'hospital', description: 'Hospital Information System', price: '$25/mo', category: 'Industry', status: 'active', version: '2.3.0', updated: '2026-06-05' },
];

export const sampleSubscriptions: SubscriptionPlan[] = [
  { id: 1, name: 'Starter', slug: 'starter', price: 0, interval: 'month', features: ['1 org', '3 apps', '5 users', 'Basic support'], tier: 'free', popular: false, active: true, users: 120 },
  { id: 2, name: 'Business', slug: 'business', price: 49, interval: 'month', features: ['Unlimited orgs', '10 apps', '50 users', 'Priority support', 'API access'], tier: 'growth', popular: true, active: true, users: 340 },
  { id: 3, name: 'Enterprise', slug: 'enterprise', price: 199, interval: 'month', features: ['Everything in Business', 'All apps', 'Unlimited users', 'Dedicated support', 'SSO', 'Audit logs', 'Custom SLA'], tier: 'premium', popular: false, active: true, users: 85 },
  { id: 4, name: 'Education', slug: 'education', price: 29, interval: 'month', features: ['5 orgs', 'Education apps', '100 users', 'Support'], tier: 'special', popular: false, active: true, users: 45 },
];

export const sampleOrgs: Organization[] = [
  { id: 1, name: 'Tesle Technologies', slug: 'tesle', plan: 'Enterprise', users: 45, status: 'active', created: '2025-01-15', apps: ['erp', 'crm', 'hr', 'payroll', 'ai'] },
  { id: 2, name: 'Acme Corp Ltd', slug: 'acme', plan: 'Business', users: 12, status: 'active', created: '2025-03-20', apps: ['erp', 'crm', 'hr'] },
  { id: 3, name: 'Global Healthcare Inc', slug: 'global-health', plan: 'Enterprise', users: 89, status: 'active', created: '2025-02-10', apps: ['erp', 'hr', 'hospital', 'inventory'] },
  { id: 4, name: 'EduStar Schools', slug: 'edustar', plan: 'Education', users: 34, status: 'active', created: '2025-04-01', apps: ['erp', 'school', 'hr'] },
  { id: 5, name: 'TechStartup.io', slug: 'techstartup', plan: 'Starter', users: 5, status: 'trial', created: '2026-06-28', apps: ['crm', 'projects'] },
  { id: 6, name: 'Suspended Org Inc', slug: 'suspended', plan: 'Business', users: 0, status: 'suspended', created: '2025-05-01', apps: ['erp'] },
];

export const sampleUsers: AdminUser[] = [
  { id: 1, name: 'Arnold Asumbisa', email: 'arnold@tesle.ai', role: 'Super Admin', orgId: 1, orgName: 'Tesle Technologies', status: 'active', lastActive: '2 min ago' },
  { id: 2, name: 'Sarah Mensah', email: 'sarah@tesle.ai', role: 'Admin', orgId: 1, orgName: 'Tesle Technologies', status: 'active', lastActive: '15 min ago' },
  { id: 3, name: 'John Doe', email: 'john@acme.com', role: 'Manager', orgId: 2, orgName: 'Acme Corp Ltd', status: 'active', lastActive: '1 hr ago' },
  { id: 4, name: 'Grace Acheampong', email: 'grace@globalhealth.com', role: 'Admin', orgId: 3, orgName: 'Global Healthcare Inc', status: 'active', lastActive: '3 hrs ago' },
  { id: 5, name: 'Jane Smith', email: 'jane@edustar.com', role: 'Member', orgId: 4, orgName: 'EduStar Schools', status: 'active', lastActive: '1 day ago' },
  { id: 6, name: 'Kwame Nkrumah', email: 'kwame@techstartup.io', role: 'Member', orgId: 5, orgName: 'TechStartup.io', status: 'invited', lastActive: 'Never' },
];

export const sampleRoles: Role[] = [
  { id: 1, name: 'Super Admin', slug: 'super_admin', description: 'Full system access', users: 2, permissions: ['*'], system: true },
  { id: 2, name: 'Admin', slug: 'admin', description: 'Org-level admin access', users: 8, permissions: ['read', 'write', 'delete', 'manage_users'], system: true },
  { id: 3, name: 'Manager', slug: 'manager', description: 'Can manage content and users', users: 15, permissions: ['read', 'write', 'manage_users'], system: true },
  { id: 4, name: 'Member', slug: 'member', description: 'Standard user access', users: 120, permissions: ['read', 'write'], system: true },
  { id: 5, name: 'Viewer', slug: 'viewer', description: 'Read-only access', users: 45, permissions: ['read'], system: true },
  { id: 6, name: 'Custom Auditor', slug: 'auditor', description: 'Custom role with audit access', users: 3, permissions: ['read', 'audit_logs'], system: false },
];

export const samplePermissions: Permission[] = [
  { id: 1, resource: 'products', action: 'crud', role: 'Super Admin', description: 'Full product management', grant: true },
  { id: 2, resource: 'organizations', action: 'crud', role: 'Super Admin', description: 'Manage all organizations', grant: true },
  { id: 3, resource: 'users', action: 'crud', role: 'Admin', description: 'Manage org users', grant: true },
  { id: 4, resource: 'billing', action: 'read', role: 'Manager', description: 'View billing info', grant: true },
  { id: 5, resource: 'analytics', action: 'read', role: 'Viewer', description: 'View dashboards', grant: true },
  { id: 6, resource: 'settings', action: 'write', role: 'Admin', description: 'Modify settings', grant: true },
  { id: 7, resource: 'audit_logs', action: 'read', role: 'Auditor', description: 'View audit trail', grant: true },
  { id: 8, resource: 'api_keys', action: 'crud', role: 'Admin', description: 'Manage API keys', grant: true },
];

export const sampleMarketplace: MarketplaceListing[] = [
  { id: 1, name: 'Payment Gateway', provider: 'PayStack', category: 'Finance', price: 'Free', rating: 4.8, installs: 1200, status: 'published' },
  { id: 2, name: 'SMS Notification', provider: 'Twilio', category: 'Communication', price: '$0.05/sms', rating: 4.6, installs: 890, status: 'published' },
  { id: 3, name: 'E-Signature', provider: 'DocuSign', category: 'Productivity', price: '$10/mo', rating: 4.7, installs: 654, status: 'published' },
  { id: 4, name: 'Tax Calculator', provider: 'TaxPro', category: 'Finance', price: '$5/mo', rating: 4.5, installs: 432, status: 'published' },
  { id: 5, name: 'Email Marketing', provider: 'Mailchimp', category: 'Marketing', price: 'Free', rating: 4.4, installs: 2100, status: 'published' },
  { id: 6, name: 'Data Analytics', provider: 'Power BI', category: 'Analytics', price: '$9.99/mo', rating: 4.9, installs: 1567, status: 'published' },
  { id: 7, name: 'AI Chatbot', provider: 'Tesle AI', category: 'AI', price: '$29/mo', rating: 4.2, installs: 89, status: 'pending' },
];

export const sampleAIConfigs: AIConfig[] = [
  { id: 1, model: 'gpt-4o', provider: 'OpenAI', endpoint: 'https://api.openai.com/v1/chat/completions', maxTokens: 4096, temperature: 0.7, enabled: true, cost: 0.015 },
  { id: 2, model: 'claude-opus-4', provider: 'Anthropic', endpoint: 'https://api.anthropic.com/v1/messages', maxTokens: 8192, temperature: 0.5, enabled: true, cost: 0.03 },
  { id: 3, model: 'llama-4-70b', provider: 'Meta', endpoint: 'https://api.groq.com/openai/v1/chat/completions', maxTokens: 8192, temperature: 0.8, enabled: false, cost: 0.008 },
  { id: 4, model: 'gemini-2.0-pro', provider: 'Google', endpoint: 'https://generativelanguage.googleapis.com/v1/models/gemini-pro', maxTokens: 8192, temperature: 0.6, enabled: true, cost: 0.01 },
];

export const sampleApiKeys: ApiKey[] = [
  { id: 1, name: 'Production API Key', key: 'sk_live_abc123...xyz', scopes: ['read', 'write'], created: '2026-01-15', lastUsed: '2 min ago', status: 'active', user: 'Arnold A.' },
  { id: 2, name: 'Staging Key', key: 'sk_staging_def456...uvw', scopes: ['read'], created: '2026-03-20', lastUsed: '1 hr ago', status: 'active', user: 'Sarah M.' },
  { id: 3, name: 'CI/CD Pipeline', key: 'sk_ci_ghi789...rst', scopes: ['read', 'write', 'deploy'], created: '2026-04-10', lastUsed: '5 min ago', status: 'active', user: 'DevOps Bot' },
  { id: 4, name: 'Old Integration', key: 'sk_old_jkl012...opq', scopes: ['read'], created: '2025-06-01', lastUsed: '90 days ago', status: 'revoked', user: 'John D.' },
];

export const sampleDeveloperApps: DeveloperApp[] = [
  { id: 1, name: 'Acme Integration', type: 'Web App', clientId: 'client_abc123', user: 'John Doe', org: 'Acme Corp Ltd', created: '2026-04-01', status: 'active' },
  { id: 2, name: 'Healthcare Sync', type: 'Background Worker', clientId: 'client_def456', user: 'Grace A.', org: 'Global Healthcare Inc', created: '2026-05-15', status: 'active' },
  { id: 3, name: 'EduStar Mobile', type: 'Mobile App', clientId: 'client_ghi789', user: 'Jane Smith', org: 'EduStar Schools', created: '2026-06-01', status: 'inactive' },
  { id: 4, name: 'Payment Relay', type: 'Webhook Handler', clientId: 'client_jkl012', user: 'Arnold A.', org: 'Tesle Technologies', created: '2026-02-10', status: 'active' },
];

export const sampleTickets: Ticket[] = [
  { id: 1, subject: 'Cannot access ERP module', user: 'John Doe', org: 'Acme Corp Ltd', priority: 'high', status: 'open', category: 'bug', assignee: 'Support Team', created: '2026-07-02', updated: '2 hrs ago' },
  { id: 2, subject: 'Invoice generation failing', user: 'Grace A.', org: 'Global Healthcare Inc', priority: 'critical', status: 'in_progress', category: 'technical', assignee: 'Arnold A.', created: '2026-07-01', updated: '30 min ago' },
  { id: 3, subject: 'How to add custom fields?', user: 'Jane Smith', org: 'EduStar Schools', priority: 'low', status: 'open', category: 'feature_request', assignee: 'Unassigned', created: '2026-06-30', updated: '1 day ago' },
  { id: 4, subject: 'Billing discrepancy on invoice', user: 'Sarah M.', org: 'Tesle Technologies', priority: 'medium', status: 'resolved', category: 'billing', assignee: 'Billing Team', created: '2026-06-28', updated: '3 days ago' },
  { id: 5, subject: 'API rate limiting too strict', user: 'Kwame N.', org: 'TechStartup.io', priority: 'medium', status: 'waiting', category: 'feature_request', assignee: 'Product Team', created: '2026-06-25', updated: '5 days ago' },
];

export const sampleInvoices: Invoice[] = [
  { id: 1, number: 'INV-2026-001', org: 'Tesle Technologies', plan: 'Enterprise', amount: 5900, status: 'paid', issued: '2026-07-01', due: '2026-07-15', paid: '2026-07-01' },
  { id: 2, number: 'INV-2026-002', org: 'Global Healthcare Inc', plan: 'Enterprise', amount: 5900, status: 'pending', issued: '2026-07-01', due: '2026-07-15' },
  { id: 3, number: 'INV-2026-003', org: 'Acme Corp Ltd', plan: 'Business', amount: 490, status: 'paid', issued: '2026-06-01', due: '2026-06-15', paid: '2026-06-10' },
  { id: 4, number: 'INV-2026-004', org: 'EduStar Schools', plan: 'Education', amount: 290, status: 'overdue', issued: '2026-05-01', due: '2026-05-15' },
  { id: 5, number: 'INV-2026-005', org: 'TechStartup.io', plan: 'Starter', amount: 0, status: 'paid', issued: '2026-06-01', due: '2026-06-15', paid: '2026-06-01' },
];

export const sampleLicenses: License[] = [
  { id: 1, key: 'TLE-ERP-4A3B-2C1D', org: 'Tesle Technologies', product: 'Tesle ERP', seats: 50, used: 45, expires: '2027-01-15', status: 'active' },
  { id: 2, key: 'TLE-CRM-5E6F-3G4H', org: 'Acme Corp Ltd', product: 'Tesle CRM', seats: 20, used: 12, expires: '2027-03-20', status: 'active' },
  { id: 3, key: 'TLE-HOS-7I8J-5K6L', org: 'Global Healthcare Inc', product: 'Tesle Hospital', seats: 100, used: 89, expires: '2026-12-31', status: 'active' },
  { id: 4, key: 'TLE-SCH-9M0N-1O2P', org: 'EduStar Schools', product: 'Tesle School', seats: 200, used: 34, expires: '2026-10-01', status: 'active' },
  { id: 5, key: 'TLE-ERP-3Q4R-5S6T', org: 'Expired Corp', product: 'Tesle ERP', seats: 10, used: 0, expires: '2026-01-01', status: 'expired' },
];

export const sampleFeatureFlags: FeatureFlag[] = [
  { id: 1, key: 'new-dashboard', name: 'New Dashboard UI', description: 'Enable the redesigned dashboard', enabled: true, env: 'production', owner: 'Product', updated: '2026-07-01' },
  { id: 2, key: 'ai-chat', name: 'AI Chat Assistant', description: 'Enable AI chat across the platform', enabled: false, env: 'staging', owner: 'Engineering', updated: '2026-06-28' },
  { id: 3, key: 'dark-mode', name: 'Dark Mode Toggle', description: 'Allow users to toggle dark mode', enabled: true, env: 'production', owner: 'Design', updated: '2026-06-15' },
  { id: 4, key: 'beta-reports', name: 'Beta Analytics Reports', description: 'New analytics report engine', enabled: true, env: 'staging', owner: 'Data', updated: '2026-06-20' },
  { id: 5, key: 'webhook-v2', name: 'Webhook V2', description: 'New webhook delivery system', enabled: false, env: 'development', owner: 'Engineering', updated: '2026-06-25' },
  { id: 6, key: 'multi-currency', name: 'Multi-Currency Support', description: 'Enable multi-currency in accounting', enabled: false, env: 'development', owner: 'Product', updated: '2026-06-30' },
];

export const sampleAuditLogs: AuditLog[] = [
  { id: 1, action: 'user.login', resource: 'session', user: 'arnold@tesle.ai', org: 'Tesle Technologies', ip: '192.168.1.1', timestamp: '2026-07-03 09:15:22', details: 'Login from web browser' },
  { id: 2, action: 'org.update', resource: 'organization', user: 'sarah@tesle.ai', org: 'Tesle Technologies', ip: '192.168.1.2', timestamp: '2026-07-03 08:45:00', details: 'Updated org settings' },
  { id: 3, action: 'user.create', resource: 'user', user: 'arnold@tesle.ai', org: 'Tesle Technologies', ip: '192.168.1.1', timestamp: '2026-07-02 16:30:00', details: 'Created user jane@edustar.com' },
  { id: 4, action: 'invoice.paid', resource: 'invoice', user: 'system', org: 'Tesle Technologies', ip: '10.0.0.1', timestamp: '2026-07-02 14:22:10', details: 'INV-2026-001 marked as paid' },
  { id: 5, action: 'api_key.create', resource: 'api_key', user: 'arnold@tesle.ai', org: 'Tesle Technologies', ip: '192.168.1.1', timestamp: '2026-07-01 11:00:00', details: 'Created new API key: Production API Key' },
  { id: 6, action: 'role.update', resource: 'role', user: 'sarah@tesle.ai', org: 'Tesle Technologies', ip: '192.168.1.2', timestamp: '2026-06-30 10:15:30', details: 'Updated Manager role permissions' },
  { id: 7, action: 'subscription.change', resource: 'subscription', user: 'system', org: 'Acme Corp Ltd', ip: '10.0.0.2', timestamp: '2026-06-29 09:00:00', details: 'Plan changed from Starter to Business' },
  { id: 8, action: 'user.delete', resource: 'user', user: 'arnold@tesle.ai', org: 'Tesle Technologies', ip: '192.168.1.1', timestamp: '2026-06-28 17:45:00', details: 'Deleted user former@employee.com' },
];

export const sampleAnalytics: AnalyticsMetric[] = [
  { id: 1, label: 'Monthly Recurring Revenue', value: '$48,200', change: '+12.5%', trend: 'up' },
  { id: 2, label: 'Active Organizations', value: '142', change: '+8', trend: 'up' },
  { id: 3, label: 'Total Users', value: '8,450', change: '+342', trend: 'up' },
  { id: 4, label: 'API Calls (24h)', value: '1.2M', change: '+5.2%', trend: 'up' },
  { id: 5, label: 'Avg Response Time', value: '142ms', change: '-12ms', trend: 'up' },
  { id: 6, label: 'Churn Rate', value: '2.1%', change: '-0.3%', trend: 'up' },
];

export const sampleSystemHealth: SystemMetric[] = [
  { id: 1, label: 'API Gateway', value: '99.99%', status: 'operational', threshold: '99.9%' },
  { id: 2, label: 'Database Cluster', value: '99.99%', status: 'operational', threshold: '99.9%' },
  { id: 3, label: 'Redis Cache', value: '99.97%', status: 'operational', threshold: '99.5%' },
  { id: 4, label: 'Message Queue', value: '99.95%', status: 'operational', threshold: '99.5%' },
  { id: 5, label: 'Object Storage', value: '99.99%', status: 'operational', threshold: '99.9%' },
  { id: 6, label: 'CDN', value: '99.99%', status: 'operational', threshold: '99.9%' },
  { id: 7, label: 'AI Inference', value: '98.50%', status: 'degraded', threshold: '99.0%' },
  { id: 8, label: 'Webhook Delivery', value: '99.89%', status: 'operational', threshold: '99.5%' },
];
