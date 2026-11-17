import type { PurchaseChargedBackProps } from "../../../templates/namespaces/event/PurchaseChargedBack/index.js";
import { PurchaseChargedBack } from "../../../templates/namespaces/event/PurchaseChargedBack/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Wave",
  brand: previewBrand,
  buyerName: "Maria Silva",
  eventName: "Show ao vivo",
  orderId: "tkp-preview-001",
} satisfies PurchaseChargedBackProps;

function Email(props: PurchaseChargedBackProps) {
  return <PurchaseChargedBack {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
