/**
 * adminStore — persistence layer for the FREDDIESHOTIT admin portal.
 *
 * Right now everything is stored in the browser (localStorage). Every read/write
 * goes through this one module and is namespaced by SITE_KEY, so when we build the
 * multi-tenant "Website as a Service" system, this file is the ONLY thing that has
 * to change: swap the localStorage bodies for Supabase calls (per-tenant rows keyed
 * by SITE_KEY) and the rest of the admin UI keeps working untouched.
 *
 * Known limitation of the localStorage version: inquiries are saved on the browser
 * where the form was submitted, so a real client's inquiry lands in THEIR browser,
 * not the photographer's. That is why the booking form also hands off to WhatsApp /
 * calendar today. True cross-device lead capture arrives with the backend step.
 */

import type { BookingInquiry, SiteSettings } from '../types';

/** Identifies this photographer's site. In the WaaS build this becomes the tenant id. */
export const SITE_KEY = 'freddieshotit';

const NS = `eko_waas:${SITE_KEY}`;
const INQUIRIES_KEY = `${NS}:inquiries`;
const AUTH_KEY = `${NS}:auth`;
const SESSION_KEY = `${NS}:session`;

/** Default admin password. Change it from Account → Security on first login. */
export const DEFAULT_ADMIN_PASSWORD = 'freddie2026';

export type InquiryStatus = 'new' | 'contacted' | 'booked' | 'archived';

export interface StoredInquiry extends BookingInquiry {
  id: string;
  createdAt: string; // ISO timestamp
  status: InquiryStatus;
}

/* ------------------------------------------------------------------ */
/* Inquiries                                                           */
/* ------------------------------------------------------------------ */

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function listInquiries(): StoredInquiry[] {
  const items = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  // Newest first
  return [...items].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveInquiry(inquiry: BookingInquiry): StoredInquiry {
  const record: StoredInquiry = {
    ...inquiry,
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `inq_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  const all = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  all.push(record);
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(all));
  } catch (err) {
    console.error('Failed to persist inquiry', err);
  }
  return record;
}

export function updateInquiry(id: string, patch: Partial<StoredInquiry>): void {
  const all = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  const next = all.map((i) => (i.id === id ? { ...i, ...patch } : i));
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(next));
}

export function deleteInquiry(id: string): void {
  const all = safeParse<StoredInquiry[]>(localStorage.getItem(INQUIRIES_KEY), []);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(all.filter((i) => i.id !== id)));
}

export function clearInquiries(): void {
  localStorage.removeItem(INQUIRIES_KEY);
}

/** Export the inbox as a CSV string (for a spreadsheet / backup). */
export function inquiriesToCSV(items: StoredInquiry[]): string {
  const cols: (keyof StoredInquiry)[] = [
    'createdAt',
    'status',
    'categoryType',
    'fullName',
    'email',
    'phone',
    'whatsapp',
    'service',
    'brandOrProjectName',
    'eventDate',
    'location',
    'budgetRange',
    'referralSource',
    'projectDescription',
    'additionalInfo',
  ];
  const esc = (v: unknown) => {
    const s = Array.isArray(v) ? v.join(' | ') : v == null ? '' : String(v);
    return `"${s.replace(/"/g, '""')}"`;
  };
  const header = cols.join(',');
  const rows = items.map((i) => cols.map((c) => esc(i[c])).join(','));
  return [header, ...rows].join('\n');
}

/* ------------------------------------------------------------------ */
/* Auth (client-side gate)                                             */
/* ------------------------------------------------------------------ */
/*
 * IMPORTANT: a browser-only login can never be truly secure — the code and
 * localStorage are readable by anyone with the device. This gate keeps the admin
 * out of casual reach and demonstrates the real flow. Genuine authentication
 * (Supabase Auth, server-verified) is part of the backend / WaaS step.
 */

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

interface AuthConfig {
  passwordHash: string;
}

async function ensureAuthConfig(): Promise<AuthConfig> {
  const existing = safeParse<AuthConfig | null>(localStorage.getItem(AUTH_KEY), null);
  if (existing?.passwordHash) return existing;
  const cfg: AuthConfig = { passwordHash: await sha256(DEFAULT_ADMIN_PASSWORD) };
  localStorage.setItem(AUTH_KEY, JSON.stringify(cfg));
  return cfg;
}

/** True if the current password is still the factory default. */
export async function isUsingDefaultPassword(): Promise<boolean> {
  const cfg = await ensureAuthConfig();
  return cfg.passwordHash === (await sha256(DEFAULT_ADMIN_PASSWORD));
}

export async function verifyPassword(password: string): Promise<boolean> {
  const cfg = await ensureAuthConfig();
  return cfg.passwordHash === (await sha256(password));
}

export async function setPassword(newPassword: string): Promise<void> {
  const cfg: AuthConfig = { passwordHash: await sha256(newPassword) };
  localStorage.setItem(AUTH_KEY, JSON.stringify(cfg));
}

/* ------------------------------------------------------------------ */
/* Session                                                            */
/* ------------------------------------------------------------------ */

export function startSession(): void {
  sessionStorage.setItem(SESSION_KEY, String(Date.now()));
}

export function endSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

export function hasSession(): boolean {
  return !!sessionStorage.getItem(SESSION_KEY);
}

/* ------------------------------------------------------------------ */
/* Settings backup (settings themselves live in SiteConfigContext /   */
/* localStorage; these helpers let the admin export / import them)     */
/* ------------------------------------------------------------------ */

export function settingsToJSON(settings: SiteSettings): string {
  return JSON.stringify(settings, null, 2);
}
