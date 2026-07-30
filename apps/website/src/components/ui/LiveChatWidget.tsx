import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageSquare, X, Bot, User, Loader2 } from 'lucide-react';

const API = 'http://localhost:3000';

interface ChatMsg {
  id: number;
  sender: string;
  message: string;
  created_at: string;
}

const SESSION_KEY = 'tesle_chat_session';

export function LiveChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Restore or create session
  useEffect(() => {
    if (!open) return;
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      setSessionId(stored);
      fetchMessages(stored);
    } else {
      fetch(`${API}/api/chat/sessions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' })
        .then((r) => r.json())
        .then((d) => {
          localStorage.setItem(SESSION_KEY, d.session_id);
          setSessionId(d.session_id);
        })
        .catch(() => {});
    }
    return () => {
      wsRef.current?.close();
      wsRef.current = null;
    };
  }, [open]);

  // WebSocket connection
  useEffect(() => {
    if (!sessionId || !open) return;
    const proto = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(`${proto}://localhost:3000/ws/chat/${sessionId}`);
    wsRef.current = ws;

    ws.onopen = () => setConnected(true);
    ws.onclose = () => setConnected(false);
    ws.onerror = () => setConnected(false);
    ws.onmessage = (e) => {
      try {
        const p = JSON.parse(e.data);
        if (p.event === 'chat:message') {
          setMessages((prev) => {
            if (prev.some((m) => m.id === p.data.id)) return prev;
            return [...prev, p.data];
          });
        }
      } catch {}
    };

    return () => ws.close();
  }, [sessionId, open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = useCallback(async (sid: string) => {
    try {
      const r = await fetch(`${API}/api/chat/sessions/${sid}/messages`);
      if (r.ok) {
        const data = await r.json();
        setMessages(data);
      }
    } catch {}
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || !sessionId || sending) return;
    setSending(true);
    setInput('');

    const optimistic: ChatMsg = {
      id: Date.now(),
      sender: 'visitor',
      message: text,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    try {
      const r = await fetch(`${API}/api/chat/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: text, sender: 'visitor' }),
      });
      if (r.ok) {
        const saved = await r.json();
        setMessages((prev) => prev.map((m) => (m.id === optimistic.id ? saved : m)));
      }
    } catch {}
    setSending(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className="fixed bottom-20 right-5 z-50 w-[340px] max-w-[calc(100vw-40px)] rounded-2xl glass border border-accent/20 shadow-lg shadow-accent/10 flex flex-col overflow-hidden"
          style={{ maxHeight: '480px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-text leading-tight">Chat with us</p>
                <p className="text-[11px] text-muted flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-500' : 'bg-muted'}`} />
                  {connected ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-4 h-4 text-muted" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[280px] max-h-[320px]">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted text-xs gap-2">
                <Bot className="w-8 h-8 text-accent/40" />
                <p>Hi! How can we help you today?</p>
              </div>
            )}
            {messages.map((msg) => {
              const isVisitor = msg.sender === 'visitor';
              return (
                <div key={msg.id} className={`flex ${isVisitor ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                      isVisitor
                        ? 'bg-accent text-white rounded-br-md'
                        : 'bg-white/10 text-text rounded-bl-md border border-white/[0.06]'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                    <p className={`text-[10px] mt-1 ${isVisitor ? 'text-white/60' : 'text-muted'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message..."
              disabled={!connected}
              className="flex-1 bg-white/5 border border-white/[0.08] rounded-xl px-3 py-2 text-sm text-text placeholder:text-muted/60 outline-none focus:border-accent/40 transition-colors disabled:opacity-40"
            />
            <button
              onClick={send}
              disabled={!input.trim() || !connected || sending}
              className="w-9 h-9 rounded-xl bg-accent text-white flex items-center justify-center shrink-0 hover:bg-accent/90 transition-colors disabled:opacity-40"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
