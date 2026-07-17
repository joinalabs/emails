import type { CertificateAvailableProps } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { CertificateAvailable } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Rainbow",
  brand: previewBrand,
  owner: { name: "Pedro Alves", email: "pedro@example.com" },
  eventName: "Festival Maker 2026",
  activityName: "Oficina de Cerâmica",
  workload: "6 horas",
  downloadUrl: "https://example.com/certificados/download?token=preview_token",
} satisfies CertificateAvailableProps;

function Email(props: CertificateAvailableProps) {
  return <CertificateAvailable {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
