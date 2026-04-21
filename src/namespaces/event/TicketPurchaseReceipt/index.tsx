export type {
  TicketPurchaseReceiptCopy,
  TicketPurchaseReceiptLineItem,
  TicketPurchaseReceiptPayer,
  TicketPurchaseReceiptProps,
} from "./TicketPurchaseReceipt.js";
export { TicketPurchaseReceipt } from "./TicketPurchaseReceipt.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { TicketPurchaseReceiptProps } from "./TicketPurchaseReceipt.js";
import { TicketPurchaseReceipt } from "./TicketPurchaseReceipt.js";

const previewProps = {
  theme: previewTheme,
  eventName: "Show ao vivo",
  orderId: "ord_preview_001",
  purchasedAtFormatted: "13/04/2026 15:42",
  items: [
    {
      id: "line-1",
      eventName: "Show ao vivo",
      lotName: "1º lote",
      ticketTypeName: "Pista",
      fareCategoryLabel: "Inteira",
      quantity: 2,
      unitPriceFormatted: "R$ 100,00",
      lineTotalFormatted: "R$ 200,00",
    },
    {
      id: "line-2",
      eventName: "Show ao vivo",
      lotName: "2º lote",
      ticketTypeName: "Camarote",
      fareCategoryLabel: "Meia",
      quantity: 1,
      unitPriceFormatted: "R$ 150,00",
      lineTotalFormatted: "R$ 75,00",
    },
  ],
  subtotalFormatted: "R$ 275,00",
  totalFormatted: "R$ 275,00",
  paymentMethod: "Cartão",
  paymentCardLast4: "4242",
  payer: {
    name: "Maria Silva",
    email: "maria@example.com",
    taxIdFormatted: "12345678909",
  },
} satisfies TicketPurchaseReceiptProps;

function Email(props: TicketPurchaseReceiptProps) {
  return <TicketPurchaseReceipt {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
