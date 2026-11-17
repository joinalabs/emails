/** How an amount returns to the buyer (finance@0.1.0's copy): by Pix, or to the card that paid. */
export interface Refund {
  /** Already formatted for the recipient locale (e.g. `R$ 91,80`). */
  amountFormatted: string;
  method: "pix" | "card";
  /** Card only: the brand as shown (e.g. `Visa`) and its last four digits. */
  card?: { brand: string; last4: string };
}

export interface RefundDestinationCopy {
  /** Pix: "no Pix que pagou a compra, na hora". */
  refundToPix?: string;
  /** A card the API knows: `{brand}`, `{last4}`. */
  refundToCard?: string;
  /** A card without its brand and digits. */
  refundToCardUnknown?: string;
}

export const defaultRefundDestinationCopy: Required<RefundDestinationCopy> = {
  refundToPix: "no Pix que pagou a compra, na hora",
  refundToCard:
    "no cartão {brand} final {last4}: aparece na fatura em até duas faturas, conforme o banco",
  refundToCardUnknown: "no cartão: aparece na fatura em até duas faturas, conforme o banco",
};

/** "no Pix que pagou a compra, na hora" / "no cartão Visa final 4242: …". */
export function refundDestination(refund: Refund, copy?: RefundDestinationCopy): string {
  const c = { ...defaultRefundDestinationCopy, ...copy };
  if (refund.method === "pix") return c.refundToPix;
  if (!refund.card) return c.refundToCardUnknown;
  return c.refundToCard.replace("{brand}", refund.card.brand).replace("{last4}", refund.card.last4);
}
