/**
 * tenantStore — the Supabase-aware layer on top of adminStore.ts.
 *
 * Every function here is async and safe to call whether or not this
 * deployment is connected to the EKO PIXELS platform:
 *   - If VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY / VITE_TENANT_ID are set,
 *     data goes to Supabase (`bookings` table, `tenants.settings`), scoped to
 *     this tenant, and is visible from the Super Admin too.
 *   - If not set, everything falls back to the original localStorage-only
 *     behavior in adminStore.ts, so the site still works standalone exactly
 *     as before (this is how freddieshotit ran before it became a tenant).
 *
 * This is the ONLY file that needed to change to turn a standalone template
 * into a real multi-tenant platform site.
 */

import { supabase, isSupabaseConfigured, TENANT_ID } from './supabaseClient';
import type { BookingInquiry, SiteSettings } from '../types';
import {
  listInquiries as localListInquiries,
  saveInquiry as localSaveInquiry,
  updateInquiry as localUpdateInquiry,
  deleteInquiry as localDeleteInquiry,
  type StoredInquiry,
  type InquiryStatus,
} from './adminStore';

export { isSupabaseConfigured };

/* ------------------------------------------------------------------ */
/* Bookings / inquiries                                                */
/* ------------------------------------------------------------------ */

function rowToStoredInquiry(row: any): StoredInquiry {
  return {
    id: row.id,
    createdAt: row.created_at,
    status: row.status,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    service: row.service,
    eventDate: row.preferred_date || '',
    location: row.location,
    budgetRange: row.budget_range,
    additionalInfo: row.notes,
    ...row.details, // whatsapp, categoryType, numberOfPeople, referralSource, etc.
  };
}

/** Submit a booking. Public — no login required (this is what the booking form calls). */
export async function submitBooking(inquiry: BookingInquiry): Promise<StoredInquiry> {
  if (!isSupabaseConfigured) {
    return localSaveInquiry(inquiry);
  }

  const { whatsapp, categoryType, brandOrProjectName, deliverablesNeeded, timeSlot, numberOfPeople, referralSource, projectDescription, ...rest } =
    inquiry as any;

  const { data, error } = await supabase
    .from('bookings')
    .insert({
      tenant_id: TENANT_ID,
      full_name: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      service: inquiry.service,
      preferred_date: inquiry.eventDate || null,
      location: inquiry.location,
      budget_range: inquiry.budgetRange,
      notes: inquiry.projectDescription || inquiry.additionalInfo,
      source: 'freddieshotit',
      status: 'new',
      details: { whatsapp, categoryType, brandOrProjectName, deliverablesNeeded, timeSlot, numberOfPeople, referralSource, projectDescription, ...rest },
    })
    .select()
    .single();

  if (error || !data) {
    console.error('Supabase booking insert failed, falling back to local save', error);
    return localSaveInquiry(inquiry);
  }
  return rowToStoredInquiry(data);
}

/** List bookings for this tenant. Requires the tenant admin to be signed in (RLS enforced). */
export async function fetchBookings(): Promise<StoredInquiry[]> {
  if (!isSupabaseConfigured) {
    return localListInquiries();
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('tenant_id', TENANT_ID)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase booking fetch failed, falling back to local list', error);
    return localListInquiries();
  }
  return (data || []).map(rowToStoredInquiry);
}

export async function updateBookingStatus(id: string, status: InquiryStatus): Promise<void> {
  if (!isSupabaseConfigured) {
    localUpdateInquiry(id, { status });
    return;
  }
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
  if (error) console.error('Supabase booking status update failed', error);
}

export async function removeBooking(id: string): Promise<void> {
  if (!isSupabaseConfigured) {
    localDeleteInquiry(id);
    return;
  }
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) console.error('Supabase booking delete failed', error);
}

/* ------------------------------------------------------------------ */
/* Site settings                                                       */
/* ------------------------------------------------------------------ */

/** Merge any settings saved on the tenant row over the given local defaults. */
export async function fetchTenantSettings(localDefaults: SiteSettings): Promise<SiteSettings> {
  if (!isSupabaseConfigured) return localDefaults;

  const { data, error } = await supabase.from('tenants').select('settings').eq('id', TENANT_ID).maybeSingle();
  if (error || !data?.settings || Object.keys(data.settings).length === 0) {
    return localDefaults;
  }
  return { ...localDefaults, ...(data.settings as Partial<SiteSettings>) };
}

/** Persist settings to the tenant row (in addition to whatever local caching the caller does). */
export async function saveTenantSettings(settings: SiteSettings): Promise<boolean> {
  if (!isSupabaseConfigured) return true; // nothing to push — local-only mode
  const { error } = await supabase.from('tenants').update({ settings }).eq('id', TENANT_ID);
  if (error) {
    console.error('Supabase settings save failed', error);
    return false;
  }
  return true;
}
