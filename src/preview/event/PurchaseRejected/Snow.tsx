import type { PurchaseRejectedProps } from "../../../templates/namespaces/event/PurchaseRejected/index.js";
import { PurchaseRejected } from "../../../templates/namespaces/event/PurchaseRejected/index.js";
import { previewBrandProducerColor } from "../../_fixtures.js";

const previewProps = {
  theme: "Snow",
  brand: previewBrandProducerColor,
  eventName: "Show ao vivo",
  eventUrl: "https://loja.joina.cc/show-ao-vivo",
} satisfies PurchaseRejectedProps;

function Email(props: PurchaseRejectedProps) {
  return <PurchaseRejected {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
