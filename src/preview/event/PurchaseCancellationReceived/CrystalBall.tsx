import type { PurchaseCancellationReceivedProps } from "../../../templates/namespaces/event/PurchaseCancellationReceived/index.js";
import { PurchaseCancellationReceived } from "../../../templates/namespaces/event/PurchaseCancellationReceived/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "CrystalBall",
  brand: previewBrand,
  buyerName: "Maria Silva",
  eventName: "Show ao vivo",
  orderId: "tkp-preview-001",
  ticketCount: 2,
  purchasedAtFormatted: "13/04/2026 15:42",
  refund: { amountFormatted: "R$ 91,80", method: "pix" as const },
  accountUrl: "https://produtora-example.joina.space/account",
} satisfies PurchaseCancellationReceivedProps;

function Email(props: PurchaseCancellationReceivedProps) {
  return <PurchaseCancellationReceived {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
