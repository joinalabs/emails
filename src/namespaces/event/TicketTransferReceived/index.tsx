export type {
  TicketTransferReceivedCopy,
  TicketTransferReceivedProps,
} from "./TicketTransferReceived.js";
export { TicketTransferReceived } from "./TicketTransferReceived.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { TicketTransferReceivedProps } from "./TicketTransferReceived.js";
import { TicketTransferReceived } from "./TicketTransferReceived.js";

const previewProps = {
  theme: previewTheme,
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
} satisfies TicketTransferReceivedProps;

function Email(props: TicketTransferReceivedProps) {
  return <TicketTransferReceived {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
