export type { TicketQrCodeCopy, TicketQrCodeProps } from "./TicketQrCode.js";
export { TicketQrCode } from "./TicketQrCode.js";

import { placeholderQrSrc, previewTheme } from "../../_preview-fixtures.js";
import type { TicketQrCodeProps } from "./TicketQrCode.js";
import { TicketQrCode } from "./TicketQrCode.js";

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
  qrImageSrc: placeholderQrSrc,
  ctaUrl: "https://example.com/ingresso/TCK-preview-001",
} satisfies TicketQrCodeProps;

function Email(props: TicketQrCodeProps) {
  return <TicketQrCode {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
