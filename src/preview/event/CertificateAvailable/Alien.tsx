import type { CertificateAvailableProps } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { CertificateAvailable } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Alien",
  brand: previewBrand,
  owner: { name: "Júlia Prado", email: "julia@example.com" },
  eventName: "Congresso de Design 2026",
  activityName: "Oficina de Fotografia Noturna",
  workload: "4 horas",
  downloadUrl: "https://example.com/certificados/download?token=preview_token",
} satisfies CertificateAvailableProps;

function Email(props: CertificateAvailableProps) {
  return <CertificateAvailable {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
