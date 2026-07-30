import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { Mail, Lock, User, Building2, Loader2, Sparkles } from 'lucide-react';

export function RegisterForm() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    setSending(true);
    setError('');

    try {
      const r = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, org_name: company || undefined }),
      });

      if (!r.ok) {
        const body = await r.json().catch(() => ({}));
        throw new Error(body.detail || 'Registration failed');
      }

      login();
    } catch (err: any) {
      setError(err.message);
    }
    setSending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.08, 0.24, 1] }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass rounded-3xl border border-accent/20 shadow-xl shadow-accent/5 p-8">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-2xl font-bold text-text">Create your account</h1>
          <p className="text-sm text-muted mt-1">Join Tesle and get access to everything.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted">Full name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full bg-white/5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-muted/40 outline-none focus:border-accent/40 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-white/5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-muted/40 outline-none focus:border-accent/40 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                minLength={8}
                required
                className="w-full bg-white/5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-muted/40 outline-none focus:border-accent/40 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted">Company <span className="text-muted/50">(optional)</span></label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/60" />
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
                className="w-full bg-white/5 border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-muted/40 outline-none focus:border-accent/40 transition-colors"
              />
            </div>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-500 bg-red-500/10 rounded-lg px-3 py-2"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={sending || !name || !email || !password}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-accent text-white hover:bg-accent/90 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {sending ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-xs text-muted/70 text-center mt-6 leading-relaxed">
          By creating an account you agree to our{' '}
          <a href="/" className="text-accent hover:underline">Terms of Service</a> and{' '}
          <a href="/" className="text-accent hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </motion.div>
  );
}
