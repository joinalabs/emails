import type { TicketCancelledProps } from "../../../templates/namespaces/event/TicketCancelled/index.js";
import { TicketCancelled } from "../../../templates/namespaces/event/TicketCancelled/index.js";
import { previewBrandNoLogo } from "../../_fixtures.js";

const previewProps = {
  theme: "Snow",
  brand: previewBrandNoLogo,
  holderName: "Carlos Novo",
  buyerName: "Maria Silva",
  eventName: "Show ao vivo",
} satisfies TicketCancelledProps;

function Email(props: TicketCancelledProps) {
  return <TicketCancelled {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
