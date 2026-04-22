export type {
  TransferredTicketReceivedCopy,
  TransferredTicketReceivedProps,
} from "./TransferredTicketReceived.js";
export { TransferredTicketReceived } from "./TransferredTicketReceived.js";

import { previewBrand, previewThemeName } from "../../_preview-fixtures.js";
import type { TransferredTicketReceivedProps } from "./TransferredTicketReceived.js";
import { TransferredTicketReceived } from "./TransferredTicketReceived.js";

const previewProps = {
  theme: previewThemeName,
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
