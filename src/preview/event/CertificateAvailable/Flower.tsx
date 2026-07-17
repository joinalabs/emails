import type { CertificateAvailableProps } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { CertificateAvailable } from "../../../templates/namespaces/event/CertificateAvailable/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Flower",
  brand: previewBrand,
  owner: { name: "Larissa Nunes", email: "larissa@example.com" },
  eventName: "Semana de Arte",
  activityName: "Oficina de Escrita Criativa",
  title: "Certificado de conclusão",
  greeting: "Parabéns por concluir a oficina! Baixe seu certificado no botão abaixo.",
  downloadUrl: "https://example.com/certificados/download?token=preview_token",
} satisfies CertificateAvailableProps;

function Email(props: CertificateAvailableProps) {
  return <CertificateAvailable {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
