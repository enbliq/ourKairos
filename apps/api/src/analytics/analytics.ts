/**
 * Issue #381 – Analytics event sink
 *
 * Lightweight log-based event emitter. No sensitive content is logged.
 * Replace the `sink` function to forward events to a real analytics backend.
 */

export type AnalyticsEvent =
  | 'auth.sign_in'
  | 'auth.sign_out'
  | 'capsule.draft_created'
  | 'capsule.sealed'
  | 'capsule.archived'
  | 'capsule.unarchived'
  | 'capsule.deleted'
  | 'recipient.opened'
  | 'recipient.unlocked'
  | 'delivery.sent'
  | 'delivery.failed'
  | 'delivery.resent'
  | 'gift.funded';

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  userId?: string;
  capsuleId?: string;
  /** Any extra non-sensitive metadata */
  meta?: Record<string, string | number | boolean>;
}

/** Pluggable sink – defaults to structured console log */
const sink = (payload: AnalyticsPayload): void => {
  console.log(JSON.stringify({ analytics: true, ...payload, ts: new Date().toISOString() }));
};

export const track = (payload: AnalyticsPayload): void => {
  try {
    sink(payload);
  } catch {
    // never throw from analytics
  }
};
