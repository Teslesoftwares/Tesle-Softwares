import { useState, useEffect } from 'react';
import {
  Package, CreditCard, Building2, Users, Shield, Key, ShoppingBag,
  Brain, Terminal, Headphones, FileText, Award, Flag, ClipboardList,
  BarChart3, HeartPulse, Plus, Globe, Server, Sliders, CheckCircle2,
  XCircle, AlertTriangle, Zap, Download,
} from 'lucide-react';
import { api } from '../lib/api';
import { PageHeader } from '../components/PageHeader';
import { StatsCard } from '../components/StatsCard';
import { DataTable, type Column } from '../components/DataTable';
import { Modal } from '../components/Modal';
import { FormInput, FormTextarea, FormSelect } from '../components/FormFields';
import { useCrud } from '../lib/useCrud';

/* ─── PRODUCT MANAGEMENT ─── */
export function ProductsPage() {
  const crud = useCrud(api.products);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Name', render: (p) => <div><div className="font-medium">{String(p.name)}</div><div className="text-xs text-gray-200">{String(p.description)}</div></div> },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'version', header: 'Version' },
    { key: 'status', header: 'Status', render: (p) => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-200'}`}>{String(p.status)}</span> },
  ];
  const stats = [
    { label: 'Total Products', value: crud.items.length, icon: <Package size={22} />, color: 'text-blue-400' },
    { label: 'Active', value: crud.items.filter((p) => p.status === 'active').length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Categories', value: [...new Set(crud.items.map((p) => p.category))].length, icon: <Sliders size={22} />, color: 'text-purple-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Product Management" subtitle="Manage all Tesle products and modules" action={{ label: 'Add Product', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Product' : 'Add Product'}>
        <div className="space-y-3">
          <FormInput label="Name" value={crud.form.name as string} onChange={(e) => crud.handleChange('name', e.target.value)} />
          <FormInput label="Slug" value={crud.form.slug as string} onChange={(e) => crud.handleChange('slug', e.target.value)} />
          <FormTextarea label="Description" value={crud.form.description as string} onChange={(e) => crud.handleChange('description', e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Price" value={crud.form.price as string} onChange={(e) => crud.handleChange('price', e.target.value)} />
            <FormInput label="Version" value={crud.form.version as string} onChange={(e) => crud.handleChange('version', e.target.value)} />
          </div>
          <FormSelect label="Category" value={crud.form.category as string} onChange={(e) => crud.handleChange('category', e.target.value)} options={['Operations', 'Intelligence', 'Industry', 'Business', 'Logistics']} />
          <FormSelect label="Status" value={crud.form.status as string} onChange={(e) => crud.handleChange('status', e.target.value)} options={['active', 'inactive']} />
          <button onClick={crud.handleSave} disabled={crud.saving} className="w-full px-4 py-2.5 bg-[#d4a853] text-black font-medium rounded-lg hover:bg-[#b8943a] transition-colors disabled:opacity-50">{crud.saving ? 'Saving...' : 'Save'}</button>
        </div>
      </Modal>
    </div>
  );
}

/* ─── SUBSCRIPTIONS ─── */
export function SubscriptionsPage() {
  const crud = useCrud(api.subscriptions);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Name', render: (p) => <div><div className="font-medium">{String(p.name)}</div><div className="text-xs text-gray-200">{String(p.tier)}</div></div> },
    { key: 'price', header: 'Price', render: (p) => <span>${Number(p.price)}<span className="text-gray-200">/{String(p.interval)}</span></span> },
    { key: 'users', header: 'Subscribers' },
    { key: 'popular', header: '', render: (p) => p.popular ? <span className="text-xs bg-[#d4a853]/20 text-[#d4a853] px-2 py-0.5 rounded-full font-medium">Popular</span> : null },
    { key: 'active', header: 'Active', render: (p) => p.active ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" /> },
  ];
  const stats = [
    { label: 'Total Plans', value: crud.items.length, icon: <CreditCard size={22} />, color: 'text-yellow-400' },
    { label: 'Total Subscribers', value: crud.items.reduce((a: number, p: Record<string, unknown>) => a + Number(p.users), 0), icon: <Users size={22} />, color: 'text-cyan-400' },
    { label: 'Active Plans', value: crud.items.filter((p) => p.active).length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Subscription Plans" subtitle="Manage pricing tiers and plans" action={{ label: 'Add Plan', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Plan' : 'Add Plan'}>
        <div className="space-y-3">
          <FormInput label="Name" value={crud.form.name as string} onChange={(e) => crud.handleChange('name', e.target.value)} />
          <div className="grid grid-cols-2 gap-3">
            <FormInput label="Price ($)" value={crud.form.price as string} onChange={(e) => crud.handleChange('price', e.target.value)} />
            <FormSelect label="Interval" value={crud.form.interval as string} onChange={(e) => crud.handleChange('interval', e.target.value)} options={['month', 'year']} />
          </div>
          <FormSelect label="Tier" value={crud.form.tier as string} onChange={(e) => crud.handleChange('tier', e.target.value)} options={['free', 'growth', 'premium', 'special']} />
          <button onClick={crud.handleSave} disabled={crud.saving} className="w-full px-4 py-2.5 bg-[#d4a853] text-black font-medium rounded-lg hover:bg-[#b8943a] transition-colors disabled:opacity-50">{crud.saving ? 'Saving...' : 'Save'}</button>
        </div>
      </Modal>
    </div>
  );
}

/* ─── ORGANIZATIONS ─── */
export function OrganizationsPage() {
  const crud = useCrud(api.organizations);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Organization', render: (p) => <div><div className="font-medium">{String(p.name)}</div><div className="text-xs text-gray-200">{String(p.slug)}</div></div> },
    { key: 'plan', header: 'Plan', render: (p) => <span className="text-xs font-medium text-[#d4a853]">{String(p.plan)}</span> },
    { key: 'users', header: 'Users' },
    { key: 'apps', header: 'Apps', render: (p) => <span className="text-xs text-gray-200">{(p.apps as string[]).length} active</span> },
    { key: 'status', header: 'Status', render: (p) => {
      const s = String(p.status);
      return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s === 'active' ? 'bg-green-900/30 text-green-400' : s === 'suspended' ? 'bg-red-900/30 text-red-400' : 'bg-yellow-900/30 text-yellow-400'}`}>{s}</span>;
    }},
  ];
  const stats = [
    { label: 'Total Orgs', value: crud.items.length, icon: <Building2 size={22} />, color: 'text-blue-400' },
    { label: 'Active', value: crud.items.filter((p) => p.status === 'active').length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Trial', value: crud.items.filter((p) => p.status === 'trial').length, icon: <Zap size={22} />, color: 'text-yellow-400' },
    { label: 'Suspended', value: crud.items.filter((p) => p.status === 'suspended').length, icon: <XCircle size={22} />, color: 'text-red-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Organizations" subtitle="Manage all organizations on the platform" action={{ label: 'Add Organization', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit Organization' : 'Add Organization'}>
        <div className="space-y-3">
          <FormInput label="Name" value={crud.form.name as string} onChange={(e) => crud.handleChange('name', e.target.value)} />
          <FormInput label="Slug" value={crud.form.slug as string} onChange={(e) => crud.handleChange('slug', e.target.value)} />
          <FormSelect label="Plan" value={crud.form.plan as string} onChange={(e) => crud.handleChange('plan', e.target.value)} options={['Starter', 'Business', 'Enterprise', 'Education']} />
          <FormSelect label="Status" value={crud.form.status as string} onChange={(e) => crud.handleChange('status', e.target.value)} options={['active', 'trial', 'suspended']} />
          <button onClick={crud.handleSave} disabled={crud.saving} className="w-full px-4 py-2.5 bg-[#d4a853] text-black font-medium rounded-lg hover:bg-[#b8943a] transition-colors disabled:opacity-50">{crud.saving ? 'Saving...' : 'Save'}</button>
        </div>
      </Modal>
    </div>
  );
}

/* ─── USERS ─── */
export function UsersPage() {
  const crud = useCrud(api.adminUsers);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'User', render: (p) => <div><div className="font-medium">{String(p.name)}</div><div className="text-xs text-gray-200">{String(p.email)}</div></div> },
    { key: 'role', header: 'Role', render: (p) => <span className="text-xs text-[#d4a853]">{String(p.role)}</span> },
    { key: 'orgName', header: 'Organization', render: (p) => <span className="text-xs text-gray-200">{String(p.orgName)}</span> },
    { key: 'status', header: 'Status', render: (p) => {
      const s = String(p.status);
      return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s === 'active' ? 'bg-green-900/30 text-green-400' : s === 'invited' ? 'bg-blue-900/30 text-blue-400' : 'bg-gray-800 text-gray-200'}`}>{s}</span>;
    }},
    { key: 'lastActive', header: 'Last Active', render: (p) => <span className="text-xs text-gray-200">{String(p.lastActive)}</span> },
  ];
  const stats = [
    { label: 'Total Users', value: crud.items.length, icon: <Users size={22} />, color: 'text-blue-400' },
    { label: 'Active', value: crud.items.filter((p) => p.status === 'active').length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Invited', value: crud.items.filter((p) => p.status === 'invited').length, icon: <Zap size={22} />, color: 'text-yellow-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Users" subtitle="Manage platform users across all organizations" action={{ label: 'Invite User', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
      <Modal open={crud.modalOpen} onClose={crud.closeModal} title={crud.editing ? 'Edit User' : 'Invite User'}>
        <div className="space-y-3">
          <FormInput label="Name" value={crud.form.name as string} onChange={(e) => crud.handleChange('name', e.target.value)} />
          <FormInput label="Email" value={crud.form.email as string} onChange={(e) => crud.handleChange('email', e.target.value)} />
          <FormSelect label="Role" value={crud.form.role as string} onChange={(e) => crud.handleChange('role', e.target.value)} options={['Super Admin', 'Admin', 'Manager', 'Member', 'Viewer']} />
          <button onClick={crud.handleSave} disabled={crud.saving} className="w-full px-4 py-2.5 bg-[#d4a853] text-black font-medium rounded-lg hover:bg-[#b8943a] transition-colors disabled:opacity-50">{crud.saving ? 'Saving...' : 'Save'}</button>
        </div>
      </Modal>
    </div>
  );
}

/* ─── ROLES ─── */
export function RolesPage() {
  const crud = useCrud(api.roles);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Role', render: (p) => <div><div className="font-medium">{String(p.name)}</div><div className="text-xs text-gray-200">{String(p.description)}</div></div> },
    { key: 'users', header: 'Users', render: (p) => <span className="font-medium">{Number(p.users)}</span> },
    { key: 'permissions', header: 'Permissions', render: (p) => <div className="flex gap-1 flex-wrap">{(p.permissions as string[]).slice(0, 3).map((perm: string) => <span key={perm} className="text-[10px] bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded">{perm}</span>)}</div> },
    { key: 'system', header: '', render: (p) => p.system ? <span className="text-[10px] text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded">System</span> : null },
  ];
  const stats = [
    { label: 'Total Roles', value: crud.items.length, icon: <Shield size={22} />, color: 'text-purple-400' },
    { label: 'Total Users', value: crud.items.reduce((a: number, p: Record<string, unknown>) => a + Number(p.users), 0), icon: <Users size={22} />, color: 'text-blue-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Roles" subtitle="Define access roles and user permissions" action={{ label: 'Create Role', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={(item) => item.system ? null : crud.handleDelete(item)} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── PERMISSIONS ─── */
export function PermissionsPage() {
  const crud = useCrud(api.permissions);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'resource', header: 'Resource', render: (p) => <span className="font-medium">{String(p.resource)}</span> },
    { key: 'action', header: 'Action', render: (p) => <span className="text-xs font-mono text-gray-200 bg-gray-800 px-2 py-0.5 rounded">{String(p.action)}</span> },
    { key: 'role', header: 'Role', render: (p) => <span className="text-xs text-[#d4a853]">{String(p.role)}</span> },
    { key: 'description', header: 'Description', render: (p) => <span className="text-xs text-gray-200">{String(p.description)}</span> },
    { key: 'grant', header: 'Granted', render: (p) => p.grant ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" /> },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Permissions" subtitle="Granular permission management across all resources" action={{ label: 'Add Permission', onClick: () => crud.openCreate() }} />
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── MARKETPLACE ─── */
export function MarketplacePage() {
  const crud = useCrud(api.marketplace);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Listing', render: (p) => <div><div className="font-medium">{String(p.name)}</div><div className="text-xs text-gray-200">by {String(p.provider)}</div></div> },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price' },
    { key: 'rating', header: 'Rating', render: (p) => <span className="text-yellow-400">{'★'.repeat(Math.round(Number(p.rating)))}{'☆'.repeat(5 - Math.round(Number(p.rating)))}</span> },
    { key: 'installs', header: 'Installs' },
    { key: 'status', header: 'Status', render: (p) => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'published' ? 'bg-green-900/30 text-green-400' : p.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-gray-800 text-gray-200'}`}>{String(p.status)}</span> },
  ];
  const stats = [
    { label: 'Total Listings', value: crud.items.length, icon: <ShoppingBag size={22} />, color: 'text-blue-400' },
    { label: 'Published', value: crud.items.filter((p) => p.status === 'published').length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Total Installs', value: crud.items.reduce((a: number, p: Record<string, unknown>) => a + Number(p.installs), 0).toLocaleString(), icon: <Download size={22} />, color: 'text-purple-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Marketplace" subtitle="Manage marketplace listings and integrations" action={{ label: 'Add Listing', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── AI CONFIG ─── */
export function AIConfigPage() {
  const crud = useCrud(api.aiConfig);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'model', header: 'Model', render: (p) => <div><div className="font-medium">{String(p.model)}</div><div className="text-xs text-gray-200">{String(p.provider)}</div></div> },
    { key: 'maxTokens', header: 'Max Tokens' },
    { key: 'temperature', header: 'Temperature', render: (p) => <span>{Number(p.temperature).toFixed(1)}</span> },
    { key: 'cost', header: 'Cost/1K', render: (p) => <span>${Number(p.cost).toFixed(3)}</span> },
    { key: 'enabled', header: 'Status', render: (p) => p.enabled ? <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full font-medium">Enabled</span> : <span className="text-xs bg-gray-800 text-gray-200 px-2 py-0.5 rounded-full font-medium">Disabled</span> },
  ];
  const stats = [
    { label: 'Models Configured', value: crud.items.length, icon: <Brain size={22} />, color: 'text-purple-400' },
    { label: 'Enabled', value: crud.items.filter((p) => p.enabled).length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Avg Cost/1K', value: `$${(crud.items.reduce((a: number, p: Record<string, unknown>) => a + Number(p.cost), 0) / Math.max(crud.items.length, 1)).toFixed(3)}`, icon: <CreditCard size={22} />, color: 'text-yellow-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="AI Configuration" subtitle="Manage AI models, providers, and settings" action={{ label: 'Add Model', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── API KEYS ─── */
export function APIKeysPage() {
  const crud = useCrud(api.apiKeys);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'Name', render: (p) => <div className="font-medium">{String(p.name)}</div> },
    { key: 'key', header: 'Key', render: (p) => <code className="text-xs font-mono text-gray-200 bg-gray-800 px-2 py-0.5 rounded">{String(p.key)}</code> },
    { key: 'scopes', header: 'Scopes', render: (p) => <div className="flex gap-1">{(p.scopes as string[]).map((s: string) => <span key={s} className="text-[10px] bg-[#d4a853]/10 text-[#d4a853] px-1.5 py-0.5 rounded font-medium">{s}</span>)}</div> },
    { key: 'status', header: 'Status', render: (p) => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>{String(p.status)}</span> },
    { key: 'lastUsed', header: 'Last Used' },
  ];
  const stats = [
    { label: 'Total Keys', value: crud.items.length, icon: <Key size={22} />, color: 'text-yellow-400' },
    { label: 'Active', value: crud.items.filter((p) => p.status === 'active').length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Revoked', value: crud.items.filter((p) => p.status === 'revoked').length, icon: <XCircle size={22} />, color: 'text-red-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="API Keys" subtitle="Manage API keys across the platform" action={{ label: 'Generate Key', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── DEVELOPERS ─── */
export function DevelopersPage() {
  const crud = useCrud(api.developerApps);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'name', header: 'App', render: (p) => <div><div className="font-medium">{String(p.name)}</div><div className="text-xs text-gray-200">{String(p.type)}</div></div> },
    { key: 'clientId', header: 'Client ID', render: (p) => <code className="text-xs font-mono text-gray-200">{String(p.clientId)}</code> },
    { key: 'org', header: 'Organization' },
    { key: 'user', header: 'Developer' },
    { key: 'status', header: 'Status', render: (p) => <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status === 'active' ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-200'}`}>{String(p.status)}</span> },
  ];
  const stats = [
    { label: 'Total Apps', value: crud.items.length, icon: <Terminal size={22} />, color: 'text-cyan-400' },
    { label: 'Active', value: crud.items.filter((p) => p.status === 'active').length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Developers" subtitle="Manage developer applications and integrations" action={{ label: 'Register App', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── SUPPORT TICKETS ─── */
export function TicketsPage() {
  const crud = useCrud(api.tickets);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'subject', header: 'Subject', render: (p) => <div><div className="font-medium">{String(p.subject)}</div><div className="text-xs text-gray-200">{String(p.org)}</div></div> },
    { key: 'priority', header: 'Priority', render: (p) => {
      const pr = String(p.priority);
      return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${pr === 'critical' ? 'bg-red-900/30 text-red-400' : pr === 'high' ? 'bg-orange-900/30 text-orange-400' : pr === 'medium' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-gray-800 text-gray-200'}`}>{pr}</span>;
    }},
    { key: 'status', header: 'Status', render: (p) => {
      const s = String(p.status);
      return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s === 'open' ? 'bg-blue-900/30 text-blue-400' : s === 'in_progress' ? 'bg-purple-900/30 text-purple-400' : s === 'resolved' ? 'bg-green-900/30 text-green-400' : 'bg-gray-800 text-gray-200'}`}>{s.replace('_', ' ')}</span>;
    }},
    { key: 'assignee', header: 'Assignee' },
    { key: 'updated', header: 'Updated' },
  ];
  const openTickets = crud.items.filter((p) => p.status === 'open' || p.status === 'in_progress');
  const stats = [
    { label: 'Total Tickets', value: crud.items.length, icon: <Headphones size={22} />, color: 'text-blue-400' },
    { label: 'Open', value: openTickets.length, icon: <AlertTriangle size={22} />, color: 'text-orange-400' },
    { label: 'Critical', value: crud.items.filter((p) => p.priority === 'critical').length, icon: <XCircle size={22} />, color: 'text-red-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Support Tickets" subtitle="Manage support requests from all organizations" action={{ label: 'Create Ticket', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── INVOICES ─── */
export function InvoicesPage() {
  const crud = useCrud(api.invoices);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'number', header: 'Invoice', render: (p) => <span className="font-mono text-xs font-medium">{String(p.number)}</span> },
    { key: 'org', header: 'Organization' },
    { key: 'plan', header: 'Plan' },
    { key: 'amount', header: 'Amount', render: (p) => <span>${Number(p.amount).toLocaleString()}</span> },
    { key: 'status', header: 'Status', render: (p) => {
      const s = String(p.status);
      return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s === 'paid' ? 'bg-green-900/30 text-green-400' : s === 'pending' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-red-900/30 text-red-400'}`}>{s}</span>;
    }},
    { key: 'due', header: 'Due Date' },
  ];
  const totalRev = crud.items.reduce((a: number, p: Record<string, unknown>) => a + (p.status === 'paid' ? Number(p.amount) : 0), 0);
  const stats = [
    { label: 'Total Invoices', value: crud.items.length, icon: <FileText size={22} />, color: 'text-blue-400' },
    { label: 'Revenue Collected', value: `$${totalRev.toLocaleString()}`, icon: <CreditCard size={22} />, color: 'text-green-400' },
    { label: 'Overdue', value: crud.items.filter((p) => p.status === 'overdue').length, icon: <AlertTriangle size={22} />, color: 'text-red-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Invoices" subtitle="View and manage all platform invoices" action={{ label: 'Create Invoice', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── LICENSING ─── */
export function LicensingPage() {
  const crud = useCrud(api.licenses);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'key', header: 'License Key', render: (p) => <code className="text-xs font-mono text-gray-200 bg-gray-800 px-2 py-0.5 rounded">{String(p.key)}</code> },
    { key: 'org', header: 'Organization' },
    { key: 'product', header: 'Product' },
    { key: 'seats', header: 'Seats', render: (p) => <span>{Number(p.used)}/{Number(p.seats)}</span> },
    { key: 'status', header: 'Status', render: (p) => {
      const s = String(p.status);
      return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s === 'active' ? 'bg-green-900/30 text-green-400' : s === 'expired' ? 'bg-red-900/30 text-red-400' : 'bg-gray-800 text-gray-200'}`}>{s}</span>;
    }},
    { key: 'expires', header: 'Expires' },
  ];
  const stats = [
    { label: 'Total Licenses', value: crud.items.length, icon: <Award size={22} />, color: 'text-yellow-400' },
    { label: 'Active', value: crud.items.filter((p) => p.status === 'active').length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Seats Used', value: `${crud.items.reduce((a: number, p: Record<string, unknown>) => a + Number(p.used), 0)}/${crud.items.reduce((a: number, p: Record<string, unknown>) => a + Number(p.seats), 0)}`, icon: <Users size={22} />, color: 'text-blue-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Licensing" subtitle="Manage product licenses across organizations" action={{ label: 'Issue License', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── FEATURE FLAGS ─── */
export function FeatureFlagsPage() {
  const crud = useCrud(api.featureFlags);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'key', header: 'Key', render: (p) => <code className="text-xs font-mono text-gray-200">{String(p.key)}</code> },
    { key: 'name', header: 'Feature' },
    { key: 'env', header: 'Environment', render: (p) => {
      const e = String(p.env);
      return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${e === 'production' ? 'bg-red-900/30 text-red-400' : e === 'staging' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-blue-900/30 text-blue-400'}`}>{e}</span>;
    }},
    { key: 'enabled', header: 'Status', render: (p) => p.enabled ? <span className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded-full font-medium">Enabled</span> : <span className="text-xs bg-gray-800 text-gray-200 px-2 py-0.5 rounded-full font-medium">Disabled</span> },
    { key: 'owner', header: 'Owner' },
    { key: 'updated', header: 'Updated' },
  ];
  const stats = [
    { label: 'Total Flags', value: crud.items.length, icon: <Flag size={22} />, color: 'text-purple-400' },
    { label: 'Enabled', value: crud.items.filter((p) => p.enabled).length, icon: <CheckCircle2 size={22} />, color: 'text-green-400' },
    { label: 'Production', value: crud.items.filter((p) => p.env === 'production').length, icon: <Server size={22} />, color: 'text-red-400' },
  ];
  useEffect(() => { crud.fetch(); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Feature Flags" subtitle="Toggle features across environments" action={{ label: 'Add Flag', onClick: () => crud.openCreate() }} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={crud.items as any[]} onEdit={crud.openEdit} onDelete={crud.handleDelete} loading={crud.loading} /></div>
    </div>
  );
}

/* ─── AUDIT LOGS ─── */
export function AuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.auditLogs.list().then((d) => { setLogs(d as any[]); }).catch(console.error).finally(() => setLoading(false)); }, []);
  const columns: Column<Record<string, unknown>>[] = [
    { key: 'action', header: 'Action', render: (p) => <span className="font-mono text-xs text-gray-200 bg-gray-800 px-2 py-0.5 rounded">{String(p.action)}</span> },
    { key: 'resource', header: 'Resource' },
    { key: 'user', header: 'User' },
    { key: 'org', header: 'Organization' },
    { key: 'ip', header: 'IP Address', render: (p) => <code className="text-xs text-gray-200">{String(p.ip)}</code> },
    { key: 'timestamp', header: 'Timestamp', render: (p) => <span className="text-xs text-gray-200">{String(p.timestamp)}</span> },
  ];
  const stats = [
    { label: 'Total Events', value: logs.length, icon: <ClipboardList size={22} />, color: 'text-gray-200' },
    { label: 'Unique Users', value: [...new Set(logs.map((l) => l.user))].length, icon: <Users size={22} />, color: 'text-blue-400' },
  ];
  return (
    <div className="space-y-4">
      <PageHeader title="Audit Logs" subtitle="Complete audit trail of all platform events" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{stats.map((s) => <StatsCard key={s.label} {...s} />)}</div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4"><DataTable columns={columns} data={logs} loading={loading} /></div>
    </div>
  );
}

/* ─── ANALYTICS ─── */
export function AnalyticsPage() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { api.analytics.list().then((d) => { setMetrics(d as any[]); }).catch(console.error).finally(() => setLoading(false)); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="Analytics" subtitle="Platform-wide metrics and business intelligence" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(metrics as any[]).map((m: any) => (
          <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-200 mb-1">{String(m.label)}</div>
            <div className="text-2xl font-bold">{String(m.value)}</div>
            <div className={`text-xs mt-1 font-medium ${String(m.change).startsWith('+') ? 'text-green-400' : String(m.change).startsWith('-') ? 'text-red-400' : 'text-gray-200'}`}>{String(m.change)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SYSTEM HEALTH ─── */
export function SystemHealthPage() {
  const [sMetrics, setSMetrics] = useState<any[]>([]);
  const [sLoading, setSLoading] = useState(true);
  useEffect(() => { api.systemHealth.list().then((d) => { setSMetrics(d as any[]); }).catch(console.error).finally(() => setSLoading(false)); }, []);
  return (
    <div className="space-y-4">
      <PageHeader title="System Health" subtitle="Monitor infrastructure and service health" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sMetrics.map((m: any) => (
          <div key={m.id} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium">{String(m.label)}</div>
              <div className={`w-2.5 h-2.5 rounded-full ${m.status === 'operational' ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]'}`} />
            </div>
            <div className="text-xl font-bold">{String(m.value)}</div>
            <div className="text-xs text-gray-200 mt-1">Threshold: {String(m.threshold)}</div>
          </div>
        ))}
        {sLoading && <div className="col-span-full text-center py-12 text-gray-200"><div className="animate-spin w-6 h-6 border-2 border-[#d4a853] border-t-transparent rounded-full mx-auto mb-2" />Loading...</div>}
      </div>
    </div>
  );
}

