export type { CourtesyTicketCopy, CourtesyTicketProps } from "./CourtesyTicket.js";
export { CourtesyTicket } from "./CourtesyTicket.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { CourtesyTicketProps } from "./CourtesyTicket.js";
import { CourtesyTicket } from "./CourtesyTicket.js";

const previewProps = {
  theme: previewTheme,
  eventName: "Show ao vivo",
  eventDate: "20/04/2026",
  eventTime: "21:00",
  venue: "Arena Example, São Paulo",
  venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
  lotName: "Cortesias",
  ownerName: "João Convidado",
  ownerEmail: "convidado@example.com",
  ctaUrl: "https://example.com/ingresso/cortesia-preview",
} satisfies CourtesyTicketProps;

function Email(props: CourtesyTicketProps) {
  return <CourtesyTicket {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
