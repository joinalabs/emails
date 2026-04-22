export type { TicketWithQRCodeCopy, TicketWithQRCodeProps } from "./TicketWithQRCode.js";
export { TicketWithQRCode } from "./TicketWithQRCode.js";

import { placeholderQrSrc, previewBrand, previewThemeName } from "../../_preview-fixtures.js";
import type { TicketWithQRCodeProps } from "./TicketWithQRCode.js";
import { TicketWithQRCode } from "./TicketWithQRCode.js";

const previewProps = {
  theme: previewThemeName,
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
