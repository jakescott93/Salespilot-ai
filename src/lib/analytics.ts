/**
 * VELMONT analytics.
 *
 * A thin, vendor-neutral event bus. Events are pushed to `window.dataLayer`
 * when present (GTM-ready) and buffered otherwise, so a tag manager added
 * later replays nothing and misses nothing important.
 *
 * Free-text content is never sent — only stage names and coarse,
 * non-identifying dimensions (house, step id, band labels).
 */

export type VelmontEvent =
  | "hero_acquisition_clicked"
  | "source_started"
  | "source_step_viewed"
  | "source_completed"
  | "source_abandoned"
  | "sell_started"
  | "sell_step_viewed"
  | "sell_completed"
  | "sell_abandoned"
  | "private_access_requested"
  | "consultation_requested"
  | "whatsapp_clicked";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: VelmontEvent, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...params, ts: Date.now() };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[velmont]", event, params);
  }
}
