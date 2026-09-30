import React, { useState } from 'react';
import { Lock, Loader2, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { DEFAULT_ADMIN_PASSWORD } from '../../lib/adminStore';

export const AdminLogin: React.FC = () => {
  const { login, usesSupabaseAuth } = useAdminAuth();
  const { settings, navigateTo } = useSiteConfig();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    const ok = usesSupabaseAuth ? await login(email, password) : await login(password);
    setBusy(false);
    if (!ok) {
      setError(usesSupabaseAuth ? 'Incorrect email or password.' : 'Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const canSubmit = usesSupabaseAuth ? !!email && !!password : !!password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="block text-2xl font-editorial uppercase tracking-[0.1em] text-[var(--text-main)]">
            {settings.photographerName}
          </span>
          <span className="block text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)] font-mono mt-1">
            Studio Admin Portal
          </span>
        </div>

        <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-8">
          <div className="flex items-center gap-2 mb-6 text-[var(--text-main)]">
            <Lock size={16} className="text-[var(--primary-accent)]" />
            <h1 className="text-sm font-mono uppercase tracking-widest">Sign in</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {usesSupabaseAuth && (
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  autoFocus
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-line)] px-4 py-3 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]"
                  placeholder="you@example.com"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  autoFocus={!usesSupabaseAuth}
                  className="w-full bg-[var(--input-bg)] border border-[var(--border-line)] px-4 py-3 pr-11 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && <p className="text-[11px] text-rose-500 mt-2 font-mono">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={busy || !canSubmit}
              className="w-full flex items-center justify-center gap-2 bg-[var(--text-main)] text-[var(--bg-base)] py-3 text-xs uppercase tracking-[0.2em] font-semibold hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : null}
              {busy ? 'Checking…' : 'Enter Portal'}
            </button>
          </form>

          {!usesSupabaseAuth && (
            <p className="mt-6 text-[10px] leading-relaxed text-[var(--text-muted)] font-mono border-t border-[var(--border-line)] pt-4">
              Default password: <span className="text-[var(--text-main)]">{DEFAULT_ADMIN_PASSWORD}</span>
              <br />
              Change it under Account → Security after signing in.
            </p>
          )}
          {usesSupabaseAuth && (
            <p className="mt-6 text-[10px] leading-relaxed text-[var(--text-muted)] font-mono border-t border-[var(--border-line)] pt-4">
              This site is connected to the EKO PIXELS platform. Use the login sent to you when your account was created.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="mt-6 mx-auto flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
        >
          <ArrowLeft size={13} /> Back to website
        </button>
      </div>
    </div>
  );
};
