export type {
  CourtesyTicketQrCodeCopy,
  CourtesyTicketQrCodeProps,
} from "./CourtesyTicketQrCode.js";
export { CourtesyTicketQrCode } from "./CourtesyTicketQrCode.js";

import { placeholderQrSrc, previewTheme } from "../../_preview-fixtures.js";
import type { CourtesyTicketQrCodeProps } from "./CourtesyTicketQrCode.js";
import { CourtesyTicketQrCode } from "./CourtesyTicketQrCode.js";

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
  qrImageSrc: placeholderQrSrc,
  ctaUrl: "https://example.com/ingresso/cortesia-preview",
} satisfies CourtesyTicketQrCodeProps;

function Email(props: CourtesyTicketQrCodeProps) {
  return <CourtesyTicketQrCode {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
