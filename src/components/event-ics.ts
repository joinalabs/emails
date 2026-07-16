/**
 * iCalendar (`.ics`) builder — RFC 5545.
 *
 * Produces a calendar object the sending side attaches as `text/calendar`. Unlike the
 * schema.org markup (best-effort, algorithmic, whitelist-gated), an `.ics` attachment makes
 * Gmail render an event block with **Add to Calendar** deterministically.
 *
 * Two modes, driven by `method` / `attendees`:
 * - **Add to calendar** (default / `PUBLISH`): no RSVP, just add a copy.
 * - **RSVP invite** (`REQUEST` with `organizer` + `attendees`): Gmail shows Yes / Maybe / No
 *   when the recipient is listed as an `ATTENDEE` with `RSVP=TRUE`.
 *
 * This package does not send mail; attaching the returned string is the caller's job
 * (e.g. `Content-Type: text/calendar; method=REQUEST; charset=UTF-8; name="invite.ics"`).
 */

export type IcsMethod = "PUBLISH" | "REQUEST" | "CANCEL";
export type IcsEventStatus = "CONFIRMED" | "TENTATIVE" | "CANCELLED";

export interface IcsParticipant {
  email: string;
  name?: string;
}

export interface IcsAttendee extends IcsParticipant {
  /** Ask the participant to respond. Required (with `method: "REQUEST"`) for Gmail RSVP buttons. */
  rsvp?: boolean;
}

export interface EventInviteIcsInput {
  /** Event title → `SUMMARY`. */
  title: string;
  /** Start in ISO 8601 with timezone, e.g. `2026-07-18T12:00:00-03:00`. Required. */
  startISO: string;
  /** End in ISO 8601 with timezone. Defaults to `startISO` + 1 hour. */
  endISO?: string;
  /** Human-readable venue string → `LOCATION`. */
  location?: string;
  /** Free-text details → `DESCRIPTION`. */
  description?: string;
  /** Event URL → `URL`. */
  url?: string;
  /** Defaults to `CONFIRMED`. */
  status?: IcsEventStatus;
  /** Stable identifier → `UID`. Defaults to a value derived from title + start. Reuse it to update/cancel. */
  uid?: string;
  organizer?: IcsParticipant;
  attendees?: IcsAttendee[];
  /** Calendar `METHOD`. Defaults to `REQUEST` when `attendees` are present, else `PUBLISH`. */
  method?: IcsMethod;
  /** Bump on each update of the same `UID` so clients accept the change. Defaults to 0. */
  sequence?: number;
  /** Override the `DTSTAMP` "now" (deterministic output for tests). */
  now?: Date;
  /** `PRODID` identifier. Defaults to the package id. */
  prodId?: string;
}

const HOUR_MS = 60 * 60 * 1000;
const encoder = new TextEncoder();

/** Escapes a TEXT value per RFC 5545 §3.3.11. */
function escapeText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r\n|\r|\n/g, "\\n");
}

/** Formats a Date as an RFC 5545 UTC timestamp, e.g. `20260718T150000Z`. */
function toIcsUtc(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  );
}

/** Folds a content line to ≤75 octets, continuation lines prefixed with a space (§3.1). */
function foldLine(line: string): string {
  const chunks: string[] = [];
  let current = "";
  let octets = 0;
  for (const ch of line) {
    const chOctets = encoder.encode(ch).length;
    // First physical line allows 75 octets; folded lines lose 1 to the leading space.
    const max = chunks.length === 0 ? 75 : 74;
    if (octets + chOctets > max) {
      chunks.push(current);
      current = ch;
      octets = chOctets;
    } else {
      current += ch;
      octets += chOctets;
    }
  }
  chunks.push(current);
  return chunks.join("\r\n ");
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "event"
  );
}

function participantLine(prop: "ORGANIZER" | "ATTENDEE", p: IcsParticipant, extra = ""): string {
  const cn = p.name ? `;CN=${escapeText(p.name)}` : "";
  return `${prop}${cn}${extra}:mailto:${p.email}`;
}

/**
 * Builds an RFC 5545 iCalendar string for an event invite. Throws `TypeError` when `title`
 * is empty or `startISO` is missing/invalid — an explicit invite call should fail loudly.
 */
export function buildEventInviteIcs(input: EventInviteIcsInput): string {
  const title = input.title?.trim();
  if (!title) {
    throw new TypeError("buildEventInviteIcs: `title` is required.");
  }
  const start = new Date(input.startISO);
  if (!input.startISO || Number.isNaN(start.getTime())) {
    throw new TypeError("buildEventInviteIcs: `startISO` must be a valid ISO 8601 date-time.");
  }
  const end = input.endISO ? new Date(input.endISO) : new Date(start.getTime() + HOUR_MS);
  if (Number.isNaN(end.getTime())) {
    throw new TypeError("buildEventInviteIcs: `endISO` must be a valid ISO 8601 date-time.");
  }

  const attendees = input.attendees ?? [];
  const method = input.method ?? (attendees.length > 0 ? "REQUEST" : "PUBLISH");
  const status = input.status ?? "CONFIRMED";
  const sequence = input.sequence ?? 0;
  const stamp = input.now ?? new Date();
  const prodId = input.prodId ?? "-//joinalabs//emails//EN";
  const uid = input.uid ?? `${slugify(title)}-${toIcsUtc(start)}@joinalabs.emails`;

  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:${prodId}`,
    "CALSCALE:GREGORIAN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toIcsUtc(stamp)}`,
    `DTSTART:${toIcsUtc(start)}`,
    `DTEND:${toIcsUtc(end)}`,
    `SEQUENCE:${sequence}`,
    `STATUS:${status}`,
    `SUMMARY:${escapeText(title)}`,
  ];

  if (input.description) {
    lines.push(`DESCRIPTION:${escapeText(input.description)}`);
  }
  if (input.location) {
    lines.push(`LOCATION:${escapeText(input.location)}`);
  }
  if (input.url) {
    lines.push(`URL:${input.url}`);
  }
  if (input.organizer) {
    lines.push(participantLine("ORGANIZER", input.organizer));
  }
  for (const attendee of attendees) {
    const extra = `;ROLE=REQ-PARTICIPANT;PARTSTAT=NEEDS-ACTION;RSVP=${attendee.rsvp === false ? "FALSE" : "TRUE"}`;
    lines.push(participantLine("ATTENDEE", attendee, extra));
  }

  lines.push("END:VEVENT", "END:VCALENDAR");

  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}
