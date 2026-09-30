import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  hasSession,
  startSession,
  endSession,
  verifyPassword,
} from '../lib/adminStore';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

interface AdminAuthContextType {
  isAuthed: boolean;
  /** True once this deployment is connected to the EKO PIXELS platform (Supabase login). */
  usesSupabaseAuth: boolean;
  /** Local mode: login(password). Platform mode: login(email, password). */
  login: (emailOrPassword: string, maybePassword?: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthed, setIsAuthed] = useState<boolean>(() => (isSupabaseConfigured ? false : hasSession()));
  const [checked, setChecked] = useState(!isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Local mode: keep session state in sync if opened in another tab.
      const sync = () => setIsAuthed(hasSession());
      window.addEventListener('focus', sync);
      return () => window.removeEventListener('focus', sync);
    }

    // Platform mode: derive auth state from the real Supabase session.
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(!!data.session);
      setChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const login = async (emailOrPassword: string, maybePassword?: string): Promise<boolean> => {
    if (isSupabaseConfigured) {
      const email = emailOrPassword;
      const password = maybePassword || '';
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) setIsAuthed(true);
      return !error;
    }

    // Local (standalone) mode — unchanged from the original template.
    const ok = await verifyPassword(emailOrPassword);
    if (ok) {
      startSession();
      setIsAuthed(true);
    }
    return ok;
  };

  const logout = () => {
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    } else {
      endSession();
    }
    setIsAuthed(false);
  };

  if (isSupabaseConfigured && !checked) {
    return null; // brief flash while we check for an existing Supabase session
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthed, usesSupabaseAuth: isSupabaseConfigured, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return ctx;
};
