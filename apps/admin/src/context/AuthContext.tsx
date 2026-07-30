import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
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
    const savedToken = localStorage.getItem('admin-token');
    if (savedToken) {
      setToken(savedToken);
      api.auth.me()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('admin-token');
          localStorage.removeItem('admin-user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const result = await api.auth.login(email, password);
    localStorage.setItem('admin-token', result.token);
    localStorage.setItem('admin-user', JSON.stringify(result.user));
    setToken(result.token);
    setUser(result.user);
  };

  const logout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
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
