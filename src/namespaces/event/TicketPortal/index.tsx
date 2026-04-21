export type { TicketPortalCopy, TicketPortalProps } from "./TicketPortal.js";
export { TicketPortal } from "./TicketPortal.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { TicketPortalProps } from "./TicketPortal.js";
import { TicketPortal } from "./TicketPortal.js";

const previewProps = {
  theme: previewTheme,
  ownerName: "Maria Silva",
  ownerEmail: "maria@example.com",
  eventName: "Show ao vivo",
  eventDate: "20/04/2026",
  eventTime: "21:00",
  venue: "Arena Example, São Paulo",
  venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
  fareKind: "full" as const,
  lotName: "1º lote",
  ticketUrl: "https://example.com/ingresso/autenticado/TCK-preview-001",
} satisfies TicketPortalProps;

function Email(props: TicketPortalProps) {
  return <TicketPortal {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
