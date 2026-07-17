import type { CertificateAvailableProps } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { CertificateAvailable } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Vulkan",
  brand: previewBrand,
  owner: { name: "Thiago Rocha", email: "thiago@example.com" },
  eventName: "Feira de Ciências",
  activityName: "Oficina de Robótica",
  downloadUrl: "https://example.com/certificados/download?token=preview_token",
} satisfies CertificateAvailableProps;

function Email(props: CertificateAvailableProps) {
  return <CertificateAvailable {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
