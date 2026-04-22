import type { CourtesyTicketWithQRCodeProps } from "../../../templates/namespaces/event/CourtesyTicketWithQRCode/index.js";
import { CourtesyTicketWithQRCode } from "../../../templates/namespaces/event/CourtesyTicketWithQRCode/index.js";
import { placeholderQrSrc, previewBrand } from "../../_fixtures.js";

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
  qrImageSrc: placeholderQrSrc,
  ctaUrl: "https://example.com/ingresso/cortesia-preview",
} satisfies CourtesyTicketWithQRCodeProps;

function Email(props: CourtesyTicketWithQRCodeProps) {
  return <CourtesyTicketWithQRCode {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
