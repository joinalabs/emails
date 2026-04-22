import type { CourtesyTicketProps } from "../../../templates/namespaces/event/CourtesyTicket/index.js";
import { CourtesyTicket } from "../../../templates/namespaces/event/CourtesyTicket/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Rainbow",
  brand: previewBrand,
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
