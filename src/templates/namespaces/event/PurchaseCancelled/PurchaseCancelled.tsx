/**
 * Purchase — cancelled and refunded (blueprint finance@0.1.0, FN-EMAILS-2): the amount returned and how.
 * The API attaches the refund receipt.
 */

import type { FC } from "react";
import { Text } from "react-email";
import {
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  type Refund,
  type RefundDestinationCopy,
  refundDestination,
} from "../../../../components/index.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface PurchaseCancelledCopy extends RefundDestinationCopy {
  subjectPreview?: string;
  title?: string;
  /** `{name}`. */
  greeting?: string;
  /** `{amount}`, `{to}`. */
  refundLine?: string;
  /** Shown when `receiptAttached`. */
  receiptNote?: string;
  orderIdLabel?: string;
  amountLabel?: string;
  refundedAtLabel?: string;
}

export interface PurchaseCancelledProps {
  theme: ThemeName;
  brand: Brand;
  buyerName: string;
  eventName: string;
  orderId: string;
  refund: Refund;
  /** Already formatted for the recipient locale. */
  refundedAtFormatted?: string;
  /** The API attached the refund receipt. */
  receiptAttached?: boolean;
  copy?: PurchaseCancelledCopy;
}

const defaultCopy: Required<Omit<PurchaseCancelledCopy, keyof RefundDestinationCopy>> = {
  subjectPreview: "Compra de ingresso cancelada",
  title: "Compra cancelada",
  greeting: "Olá, {name}.",
  refundLine: "Sua compra foi cancelada. Devolvemos {amount} {to}.",
  receiptNote: "O comprovante do estorno está em anexo.",
  orderIdLabel: "Pedido",
  amountLabel: "Valor devolvido",
  refundedAtLabel: "Data",
};

export const PurchaseCancelled: FC<PurchaseCancelledProps> = ({
  theme,
  brand,
  buyerName,
  eventName,
  orderId,
  refund,
  refundedAtFormatted,
  receiptAttached,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const paragraph = { margin: "0 0 12px", fontSize: "14px", lineHeight: "22px", color: muted };

  return (
    <EmailLayout previewText={`${eventName} — ${c.subjectPreview}`}>
      <HeaderLogo brand={brand} theme={theme} headline={eventName} />
      <Text style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={paragraph}>{c.greeting.replace("{name}", buyerName)}</Text>
      <Text style={{ ...paragraph, margin: receiptAttached ? "0 0 12px" : "0 0 20px" }}>
        {c.refundLine
          .replace("{amount}", refund.amountFormatted)
          .replace("{to}", refundDestination(refund, copy))}
      </Text>
      {receiptAttached ? (
        <Text style={{ ...paragraph, margin: "0 0 20px" }}>{c.receiptNote}</Text>
      ) : null}
      <EmailDetailList
        rows={[
          { title: c.orderIdLabel, value: orderId },
          { title: c.amountLabel, value: refund.amountFormatted },
          ...(refundedAtFormatted
            ? [{ title: c.refundedAtLabel, value: refundedAtFormatted }]
            : []),
        ]}
        sectionStyle={{ marginBottom: "16px" }}
      />
      <FooterLegal legalFooter={brand.legalFooter} supportEmail={brand.supportEmail} />
    </EmailLayout>
  );
};
