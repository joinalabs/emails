import type { CertificateAvailableProps } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { CertificateAvailable } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { previewBrandNoLogo } from "../../_fixtures.js";

const previewProps = {
  theme: "Snow",
  brand: previewBrandNoLogo,
  owner: { name: "Juliana Costa", email: "juliana@example.com" },
  eventName: "Summit de Marketing",
  activityName: "Workshop de Marketing",
  downloadUrl: "https://example.com/certificados/download?token=preview_token",
} satisfies CertificateAvailableProps;

function Email(props: CertificateAvailableProps) {
  return <CertificateAvailable {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
