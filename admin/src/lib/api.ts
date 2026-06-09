const BASE = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('admin-token');
  const headers: Record<string, string> = { ...(options?.headers as Record<string, string>) };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!headers['Content-Type'] && options?.body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    window.location.href = '/admin/login';
    throw new Error('Unauthorized');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: { id: number; email: string; name: string; role: string } }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    me: () => request<{ id: number; email: string; name: string; role: string }>('/auth/me'),
  },
  dashboard: {
    stats: () =>
      request<{
        stats: Record<string, number>;
        leadsByStatus: { status: string; count: number }[];
        recentLeads: unknown[];
        recentBlog: unknown[];
      }>('/dashboard'),
  },
  services: {
    list: () => request<unknown[]>('/services'),
    get: (id: number) => request<unknown>(`/services/${id}`),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/services', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Record<string, unknown>) =>
      request<unknown>(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<{ deleted: boolean }>(`/services/${id}`, { method: 'DELETE' }),
  },
  portfolio: {
    list: () => request<unknown[]>('/portfolio'),
    get: (id: number) => request<unknown>(`/portfolio/${id}`),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/portfolio', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Record<string, unknown>) =>
      request<unknown>(`/portfolio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<{ deleted: boolean }>(`/portfolio/${id}`, { method: 'DELETE' }),
  },
  blog: {
    list: (published?: boolean) =>
      request<unknown[]>(`/blog${published !== undefined ? `?published=${published}` : ''}`),
    get: (id: number) => request<unknown>(`/blog/${id}`),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/blog', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Record<string, unknown>) =>
      request<unknown>(`/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<{ deleted: boolean }>(`/blog/${id}`, { method: 'DELETE' }),
  },
  testimonials: {
    list: () => request<unknown[]>('/testimonials'),
    get: (id: number) => request<unknown>(`/testimonials/${id}`),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Record<string, unknown>) =>
      request<unknown>(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<{ deleted: boolean }>(`/testimonials/${id}`, { method: 'DELETE' }),
  },
  careers: {
    list: () => request<unknown[]>('/careers'),
    get: (id: number) => request<unknown>(`/careers/${id}`),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/careers', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: Record<string, unknown>) =>
      request<unknown>(`/careers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<{ deleted: boolean }>(`/careers/${id}`, { method: 'DELETE' }),
  },
  leads: {
    list: () => request<unknown[]>('/leads'),
    get: (id: number) => request<unknown>(`/leads/${id}`),
    updateStatus: (id: number, status: string) =>
      request<unknown>(`/leads/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
    delete: (id: number) => request<{ deleted: boolean }>(`/leads/${id}`, { method: 'DELETE' }),
  },
};
