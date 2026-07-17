import type { CertificateAvailableProps } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { CertificateAvailable } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Wave",
  brand: previewBrand,
  owner: { name: "Carlos Mendes", email: "carlos@example.com" },
  eventName: "Festival de Música",
  activityName: "Festival de Música",
  downloadUrl: "https://example.com/certificados/download?token=preview_token",
} satisfies CertificateAvailableProps;

function Email(props: CertificateAvailableProps) {
  return <CertificateAvailable {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
