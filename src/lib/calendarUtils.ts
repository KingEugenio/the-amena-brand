/**
 * Google Calendar integration for THE AMENA BRAND wedding bookings.
 *
 * Client-side, no-OAuth: builds a pre-filled Google Calendar "create event"
 * link and an .ics file the couple (and studio) can add to any calendar.
 * Two-way auto-sync to the studio's own Google Calendar needs OAuth + the
 * backend and is a later step.
 */

export interface CalendarBooking {
  title: string;
  date: string; // YYYY-MM-DD (may be empty)
  location: string;
  details: string;
  studioName?: string;
  studioEmail?: string;
  clientName?: string;
  clientEmail?: string;
}

function safeDay(date: string): string {
  if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date.replace(/-/g, '');
  return new Date().toISOString().split('T')[0].replace(/-/g, '');
}

export function generateGoogleCalendarUrl(b: CalendarBooking): string {
  const day = safeDay(b.date);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: b.title,
    dates: `${day}T090000/${day}T220000`,
    details: b.details,
    location: b.location || 'To be confirmed',
    ctz: 'Africa/Accra',
  });
  if (b.studioEmail) params.append('add', b.studioEmail);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICS(b: CalendarBooking): string {
  const day = safeDay(b.date);
  const uid = `${Date.now()}@the-amena-brand`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//THE AMENA BRAND//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${day}T090000`,
    `DTEND:${day}T220000`,
    `SUMMARY:${esc(b.title)}`,
    `DESCRIPTION:${esc(b.details)}`,
    `LOCATION:${esc(b.location || 'To be confirmed')}`,
    b.studioEmail ? `ORGANIZER;CN=${esc(b.studioName || 'THE AMENA BRAND')}:mailto:${b.studioEmail}` : '',
    b.clientEmail ? `ATTENDEE;CN=${esc(b.clientName || 'Client')}:mailto:${b.clientEmail}` : '',
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean).join('\r\n');
}

export function downloadICS(b: CalendarBooking): void {
  const blob = new Blob([generateICS(b)], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `amena-wedding-${safeDay(b.date)}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
