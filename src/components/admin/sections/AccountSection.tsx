import React, { useEffect, useState } from 'react';
import { KeyRound, Check, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  setPassword,
  verifyPassword,
  isUsingDefaultPassword,
  DEFAULT_ADMIN_PASSWORD,
} from '../../../lib/adminStore';

export const AccountSection: React.FC = () => {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [usingDefault, setUsingDefault] = useState(false);

  useEffect(() => {
    isUsingDefaultPassword().then(setUsingDefault);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (next.length < 6) {
      setMsg({ type: 'err', text: 'New password must be at least 6 characters.' });
      return;
    }
    if (next !== confirm) {
      setMsg({ type: 'err', text: 'New password and confirmation do not match.' });
      return;
    }

    setBusy(true);
    const ok = await verifyPassword(current);
    if (!ok) {
      setBusy(false);
      setMsg({ type: 'err', text: 'Current password is incorrect.' });
      return;
    }
    await setPassword(next);
    setBusy(false);
    setCurrent('');
    setNext('');
    setConfirm('');
    setUsingDefault(await isUsingDefaultPassword());
    setMsg({ type: 'ok', text: 'Password updated successfully.' });
  };

  const input =
    'w-full bg-[var(--input-bg)] border border-[var(--border-line)] px-3 py-2.5 text-sm text-[var(--text-main)] focus:outline-none focus:border-[var(--primary-accent)]';

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-editorial text-[var(--text-main)]">Account</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">Manage your admin sign-in credentials.</p>
      </div>

      {usingDefault && (
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 p-4 mb-6">
          <ShieldAlert size={18} className="text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-[var(--text-main)] font-medium">You're still using the default password.</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Change it below from <span className="font-mono">{DEFAULT_ADMIN_PASSWORD}</span> to something private.
            </p>
          </div>
        </div>
      )}

      <div className="bg-[var(--card-bg)] border border-[var(--border-line)] p-5 sm:p-6 max-w-md">
        <div className="flex items-center gap-2 mb-5 text-[var(--text-main)]">
          <KeyRound size={15} className="text-[var(--primary-accent)]" />
          <h2 className="text-[11px] font-mono uppercase tracking-[0.2em]">Change password</h2>
        </div>

        <form onSubmit={submit} className="space-y-4" noValidate>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Current password
            </label>
            <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} className={input} />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              New password
            </label>
            <input type="password" value={next} onChange={(e) => setNext(e.target.value)} className={input} />
          </div>
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
              Confirm new password
            </label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} />
          </div>

          {msg && (
            <div
              className={`flex items-center gap-2 text-xs font-mono ${
                msg.type === 'ok' ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              {msg.type === 'ok' ? <Check size={14} /> : <ShieldAlert size={14} />}
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={busy || !current || !next || !confirm}
            className="w-full inline-flex items-center justify-center gap-2 bg-[var(--text-main)] text-[var(--bg-base)] py-2.5 text-xs uppercase tracking-[0.2em] font-semibold hover:opacity-90 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShieldCheck size={14} /> Update password
          </button>
        </form>

        <p className="mt-5 text-[10px] leading-relaxed text-[var(--text-muted)] font-mono border-t border-[var(--border-line)] pt-4">
          Note: this is a client-side gate stored in your browser. Server-verified login arrives with the backend step.
        </p>
      </div>
    </div>
  );
};
