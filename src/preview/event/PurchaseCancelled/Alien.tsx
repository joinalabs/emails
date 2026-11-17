import type { PurchaseCancelledProps } from "../../../templates/namespaces/event/PurchaseCancelled/index.js";
import { PurchaseCancelled } from "../../../templates/namespaces/event/PurchaseCancelled/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Alien",
  brand: previewBrand,
  buyerName: "Maria Silva",
  eventName: "Show ao vivo",
  orderId: "tkp-preview-001",
  refund: {
    amountFormatted: "R$ 106,00",
    method: "card" as const,
    card: { brand: "Visa", last4: "4242" },
  },
  refundedAtFormatted: "14/04/2026 10:05",
  receiptAttached: true,
} satisfies PurchaseCancelledProps;

function Email(props: PurchaseCancelledProps) {
  return <PurchaseCancelled {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
