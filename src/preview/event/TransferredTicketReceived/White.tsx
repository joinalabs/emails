import type { TransferredTicketReceivedProps } from "../../../templates/namespaces/event/TransferredTicketReceived/index.js";
import { TransferredTicketReceived } from "../../../templates/namespaces/event/TransferredTicketReceived/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "White",
  brand: previewBrand,
  ownerName: "Carlos Novo",
  ownerEmail: "carlos.novo@example.com",
  eventName: "Show ao vivo",
  eventDate: "20/04/2026",
  eventTime: "21:00",
  venue: "Arena Example, São Paulo",
  venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
  fareKind: "full" as const,
  lotName: "1º lote",
  ticketUrl: "https://example.com/ingresso/transferido/TCK-preview-002",
  transferrerName: "Maria Silva",
} satisfies TransferredTicketReceivedProps;

function Email(props: TransferredTicketReceivedProps) {
  return <TransferredTicketReceived {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
