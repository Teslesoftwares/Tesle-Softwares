import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: number;
  email: string;
  name: string;
  company: string;
  phone: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('portal-token');
    if (savedToken) {
      setToken(savedToken);
      api.auth.me()
        .then((u) => setUser(u as unknown as User))
        .catch(() => {
          localStorage.removeItem('portal-token');
          localStorage.removeItem('portal-user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const result = await api.auth.login(email, password);
    localStorage.setItem('portal-token', result.token);
    localStorage.setItem('portal-user', JSON.stringify(result.user));
    setToken(result.token);
    setUser(result.user as unknown as User);
  };

  const logout = () => {
    localStorage.removeItem('portal-token');
    localStorage.removeItem('portal-user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
