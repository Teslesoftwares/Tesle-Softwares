const BASE = '/api/portal';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('portal-token');
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!headers['Content-Type'] && options?.body) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    localStorage.removeItem('portal-token');
    localStorage.removeItem('portal-user');
    window.location.href = '/portal/login';
    throw new Error('Unauthorized');
  }

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request<{ token: string; user: Record<string, unknown> }>('/auth/login', {
        method: 'POST', body: JSON.stringify({ email, password }),
      }),
    register: (data: Record<string, string>) =>
      request<{ token: string; user: Record<string, unknown> }>('/auth/register', {
        method: 'POST', body: JSON.stringify(data),
      }),
    me: () => request<Record<string, unknown>>('/auth/me'),
  },
  projects: {
    list: () => request<unknown[]>('/projects'),
    get: (id: number) => request<unknown>(`/projects/${id}`),
  },
  tickets: {
    list: () => request<unknown[]>('/tickets'),
    get: (id: number) => request<unknown>(`/tickets/${id}`),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/tickets', { method: 'POST', body: JSON.stringify(data) }),
    addComment: (id: number, message: string) =>
      request<unknown>(`/tickets/${id}/comments`, { method: 'POST', body: JSON.stringify({ message }) }),
  },
  files: {
    list: () => request<unknown[]>('/files'),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/files', { method: 'POST', body: JSON.stringify(data) }),
  },
  invoices: {
    list: () => request<unknown[]>('/invoices'),
    get: (id: number) => request<unknown>(`/invoices/${id}`),
  },
  meetings: {
    list: () => request<unknown[]>('/meetings'),
    create: (data: Record<string, unknown>) =>
      request<unknown>('/meetings', { method: 'POST', body: JSON.stringify(data) }),
  },
  notifications: {
    list: () => request<unknown[]>('/notifications'),
    markRead: (id: number) => request<unknown>(`/notifications/${id}/read`, { method: 'PUT' }),
    markAllRead: () => request<unknown>('/notifications/read-all', { method: 'PUT' }),
  },
  ai: {
    chat: (message: string) =>
      request<{ reply: string }>('/ai/chat', { method: 'POST', body: JSON.stringify({ message }) }),
  },
};
