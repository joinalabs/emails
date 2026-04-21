import type { ReactNode } from "react";
import { Link } from "react-email";
import type { EmailTheme } from "../theme/types.js";
import { defaultEmailThemeTokens } from "../theme/types.js";
import type { EmailDetailRow } from "./email-detail-list.js";

export type TicketFareKind = "courtesy" | "full" | "half";

export interface TicketIngressoFareLabels {
  courtesy: string;
  full: string;
  half: string;
}

export interface TicketIngressoDetailLabels {
  titular: string;
  horaLocal: string;
  /** Row title for the fare kind (e.g. “Ticket type” → Full / Half / Complimentary). */
  ticketTypeFare: string;
  lot: string;
}

export interface BuildTicketIngressoDetailRowsInput {
  theme: EmailTheme;
  labels: TicketIngressoDetailLabels;
  fareLabels: TicketIngressoFareLabels;
  /**
   * Calendar date for the date/venue line (e.g. `20/04/2026`). Use with `eventTime`, or pass
   * `eventDateFormatted` instead.
   */
  eventDate?: string;
  /**
   * Clock time for the date/venue line (e.g. `21:00`). Use with `eventDate`, or pass
   * `eventDateFormatted` instead.
   */
  eventTime?: string;
  /**
   * Fallback when `eventDate` + `eventTime` are not both set: shown as the left segment before ` · `.
   */
  eventDateFormatted?: string;
  venue?: string;
  /** Google Maps (or other) URL for the venue name. */
  venueMapsUrl?: string;
  fareKind: TicketFareKind;
  lotName?: string;
  ownerName: string;
  ownerEmail: string;
}

function fareLabelForKind(kind: TicketFareKind, fareLabels: TicketIngressoFareLabels): string {
  switch (kind) {
    case "courtesy":
      return fareLabels.courtesy;
    case "full":
      return fareLabels.full;
    case "half":
      return fareLabels.half;
    default: {
      const _exhaustive: never = kind;
      return _exhaustive;
    }
  }
}

function titularRowValue(ownerName: string, ownerEmail: string, theme: EmailTheme): ReactNode {
  const text = theme.textColor ?? defaultEmailThemeTokens.textColor;
  const muted = theme.mutedTextColor ?? defaultEmailThemeTokens.mutedTextColor;
  return (
    <>
      <span style={{ color: text, fontWeight: 600 }}>{ownerName.trim()}</span>
      <span style={{ color: muted }}>{` ${ownerEmail.trim()}`}</span>
    </>
  );
}

function venueNameLink(
  venue: string,
  venueMapsUrl: string | undefined,
  theme: EmailTheme,
): ReactNode {
  const primary = theme.primaryColor;
  const maps = venueMapsUrl?.trim();
  if (maps) {
    return (
      <Link href={maps} style={{ color: primary, textDecoration: "underline" }}>
        {venue}
      </Link>
    );
  }
  return venue;
}

function horaLocalValue(
  theme: EmailTheme,
  eventDate: string | undefined,
  eventTime: string | undefined,
  eventDateFormatted: string | undefined,
  venue: string | undefined,
  venueMapsUrl: string | undefined,
): ReactNode | string | null {
  const d = eventDate?.trim();
  const t = eventTime?.trim();
  const left = d && t ? `${d}, ${t}` : (eventDateFormatted?.trim() ?? "");
  const v = venue?.trim();

  if (!left && !v) {
    return null;
  }

  if (!v) {
    return left;
  }

  const venueNode = venueNameLink(v, venueMapsUrl, theme);
  if (!left) {
    return venueNode;
  }

  return (
    <>
      {left}
      {" · "}
      {venueNode}
    </>
  );
}

export function buildTicketIngressoDetailRows(
  input: BuildTicketIngressoDetailRowsInput,
): EmailDetailRow[] {
  const {
    theme,
    labels,
    fareLabels,
    eventDate,
    eventTime,
    eventDateFormatted,
    venue,
    venueMapsUrl,
    fareKind,
    lotName,
    ownerName,
    ownerEmail,
  } = input;

  const rows: EmailDetailRow[] = [
    {
      id: "titular",
      title: labels.titular,
      value: titularRowValue(ownerName, ownerEmail, theme),
    },
  ];

  const horaLocal = horaLocalValue(
    theme,
    eventDate,
    eventTime,
    eventDateFormatted,
    venue,
    venueMapsUrl,
  );
  if (horaLocal !== null) {
    rows.push({ id: "hora-local", title: labels.horaLocal, value: horaLocal });
  }

  const fare = fareLabelForKind(fareKind, fareLabels);

  const lot = lotName?.trim();
  if (lot) {
    rows.push({ id: "lot", title: labels.lot, value: lot });
  }

  rows.push({
    id: "ticket-fare-kind",
    title: labels.ticketTypeFare,
    value: fare,
  });

  return rows;
}
