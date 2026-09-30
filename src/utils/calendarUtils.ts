export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // YYYY-MM-DD
  timeSlot?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  photographerEmail?: string;
}

/**
 * Generate a Google Calendar web link that creates an event with pre-filled details
 * and invites the photographer directly.
 */
export function generateGoogleCalendarUrl(details: CalendarEventDetails): string {
  const photoEmail = details.photographerEmail || 'freddieshotit@gmail.com';
  // Determine start & end time based on slot
  let startTime = '090000';
  let endTime = '120000';

  if (details.timeSlot === 'afternoon') {
    startTime = '133000';
    endTime = '170000';
  } else if (details.timeSlot === 'golden') {
    startTime = '163000';
    endTime = '190000';
  } else if (details.timeSlot === 'fullday') {
    startTime = '080000';
    endTime = '200000';
  }

  const cleanDate = details.startDate.replace(/-/g, '');
  const dates = `${cleanDate}T${startTime}/${cleanDate}T${endTime}`;

  const fullDescription = `${details.description}

Client: ${details.clientName}
Client Email: ${details.clientEmail}
Client Phone: ${details.clientPhone}
Photographer: FREDDIESHOTIT (${photoEmail})
Status: Direct Studio Booking Inquiry`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: details.title,
    dates: dates,
    details: fullDescription,
    location: details.location,
    add: `${photoEmail},${details.clientEmail}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generates an .ics file string and triggers a browser download.
 * Compatible with Apple Calendar, Outlook, and Google Calendar.
 */
export function downloadICSFile(details: CalendarEventDetails) {
  const photoEmail = details.photographerEmail || 'freddieshotit@gmail.com';
  let startTime = '090000';
  let endTime = '120000';

  if (details.timeSlot === 'afternoon') {
    startTime = '133000';
    endTime = '170000';
  } else if (details.timeSlot === 'golden') {
    startTime = '163000';
    endTime = '190000';
  } else if (details.timeSlot === 'fullday') {
    startTime = '080000';
    endTime = '200000';
  }

  const cleanDate = details.startDate.replace(/-/g, '');
  const dtStart = `${cleanDate}T${startTime}`;
  const dtEnd = `${cleanDate}T${endTime}`;
  const dtStamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const summary = details.title.replace(/\n/g, ' ');
  const description = `${details.description} | Client: ${details.clientName} (${details.clientEmail}, ${details.clientPhone}) | Photographer: FREDDIESHOTIT (${photoEmail})`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FREDDIESHOTIT//Photography Studio Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:freddieshotit-${Date.now()}@freddieshotit.com`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${details.location}`,
    `ORGANIZER;CN="FREDDIESHOTIT Studio":mailto:${photoEmail}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;CN="${details.clientName}":mailto:${details.clientEmail}`,
    `ATTENDEE;ROLE=REQ-PARTICIPANT;CN="FREDDIESHOTIT":mailto:${photoEmail}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `FREDDIESHOTIT_Shoot_${details.startDate}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
