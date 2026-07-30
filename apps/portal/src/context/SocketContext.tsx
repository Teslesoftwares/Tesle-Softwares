import { createContext, useContext, useEffect, useState, useRef, useCallback, type ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface SocketContextType {
  connected: boolean;
  send: (event: string, data?: unknown) => void;
  on: (event: string, handler: (data: unknown) => void) => void;
  off: (event: string, handler: (data: unknown) => void) => void;
}

const SocketContext = createContext<SocketContextType>({
  connected: false,
  send: () => {},
  on: () => {},
  off: () => {},
});

export function SocketProvider({ children }: { children: ReactNode }) {
  const { user, token } = useAuth();
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const handlersRef = useRef<Map<string, Set<(data: unknown) => void>>>(new Map());
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectDelay = useRef(1000);

  const getWsUrl = useCallback(() => {
    const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${proto}//${window.location.host}/ws?token=${token}`;
  }, [token]);

  const connect = useCallback(() => {
    if (wsRef.current) wsRef.current.close();

    const ws = new WebSocket(getWsUrl());
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      reconnectDelay.current = 1000;
      // tell server who we are
      ws.send(JSON.stringify({ event: 'join', data: { userId: user?.id } }));
    };

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        const event: string = msg.event;
        const data = msg.data;
        const fns = handlersRef.current.get(event);
        if (fns) fns.forEach((fn) => fn(data));
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      setConnected(false);
      // exponential backoff reconnect
      reconnectTimer.current = setTimeout(() => {
        reconnectDelay.current = Math.min(reconnectDelay.current * 2, 30000);
        connect();
      }, reconnectDelay.current);
    };

    ws.onerror = () => ws.close();
  }, [getWsUrl, user?.id]);

  useEffect(() => {
    if (!user || !token) return;
    connect();
    return () => {
      if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
      wsRef.current?.close();
    };
  }, [user, token, connect]);

  const send = useCallback((event: string, data?: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ event, data: data ?? {} }));
    }
  }, []);

  const on = useCallback((event: string, handler: (data: unknown) => void) => {
    const set = handlersRef.current.get(event) ?? new Set();
    set.add(handler);
    handlersRef.current.set(event, set);
  }, []);

  const off = useCallback((event: string, handler: (data: unknown) => void) => {
    handlersRef.current.get(event)?.delete(handler);
  }, []);

  return (
    <SocketContext.Provider value={{ connected, send, on, off }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
