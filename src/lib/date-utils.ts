/**
 * Utility functions for consistent date handling between server and client
 */

/**
 * Determines if an event is past based on end date
 * Uses UTC for consistent comparison across server/client
 */
export function isEventPast(endDate: string | Date): boolean {
  const eventEndDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
  const now = new Date();
  
  // Convert both dates to UTC for consistent comparison
  const eventEndUTC = new Date(eventEndDate.getTime() + (eventEndDate.getTimezoneOffset() * 60000));
  const nowUTC = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  
  return eventEndUTC.getTime() <= nowUTC.getTime();
}

/**
 * Determines event status consistently
 */
export function getEventStatus(endDate: string | Date): "upcoming" | "past" {
  return isEventPast(endDate) ? "past" : "upcoming";
}

/**
 * Normalizes a date to avoid hydration mismatches
 * Returns date in ISO string format for consistency
 */
export function normalizeEventDate(date: string | Date): string {
  const eventDate = typeof date === 'string' ? new Date(date) : date;
  return eventDate.toISOString();
}