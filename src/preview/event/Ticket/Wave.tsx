import type { TicketProps } from "../../../templates/namespaces/event/Ticket/index.js";
import { Ticket } from "../../../templates/namespaces/event/Ticket/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Wave",
  brand: previewBrand,
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
} satisfies TicketProps;

function Email(props: TicketProps) {
  return <Ticket {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
