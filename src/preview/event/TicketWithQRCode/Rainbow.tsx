import type { TicketWithQRCodeProps } from "../../../templates/namespaces/event/TicketWithQRCode/index.js";
import { TicketWithQRCode } from "../../../templates/namespaces/event/TicketWithQRCode/index.js";
import { placeholderQrSrc, previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Rainbow",
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
  qrImageSrc: placeholderQrSrc,
  ctaUrl: "https://example.com/ingresso/TCK-preview-001",
} satisfies TicketWithQRCodeProps;

function Email(props: TicketWithQRCodeProps) {
  return <TicketWithQRCode {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
