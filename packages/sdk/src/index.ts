export interface ApiClientConfig {
  baseUrl: string;
  token?: string;
  orgId?: string;
}
export class ApiClient {
  private config: ApiClientConfig;
  constructor(config: ApiClientConfig) { this.config = config; }
  private headers(): Record<string, string> {
    const h: Record<string, string> = { 'Content-Type': 'application/json' };
    if (this.config.token) h['Authorization'] = `Bearer ${this.config.token}`;
    if (this.config.orgId) h['x-org-id'] = this.config.orgId;
    return h;
  }
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${path}`, { headers: this.headers() });
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.statusText}`);
    return res.json();
  }
  async post<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${path}`, { method: 'POST', headers: this.headers(), body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.statusText}`);
    return res.json();
  }
  async put<T>(path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${path}`, { method: 'PUT', headers: this.headers(), body: body ? JSON.stringify(body) : undefined });
    if (!res.ok) throw new Error(`PUT ${path} failed: ${res.statusText}`);
    return res.json();
  }
  async delete<T>(path: string): Promise<T> {
    const res = await fetch(`${this.config.baseUrl}${path}`, { method: 'DELETE', headers: this.headers() });
    if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.statusText}`);
    return res.json();
  }
  setToken(token: string) { this.config.token = token; }
  setOrgId(orgId: string) { this.config.orgId = orgId; }
}
export type CrudEndpoints = 'products' | 'organizations' | 'users' | 'roles' | 'permissions' | 'subscriptions' | 'feature-flags' | 'audit-logs' | 'notifications' | 'marketplace';
