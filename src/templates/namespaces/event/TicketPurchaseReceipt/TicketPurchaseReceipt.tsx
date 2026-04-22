import type { FC, ReactNode } from "react";
import { Column, Hr, Row, Section, Text } from "react-email";
import {
  EmailDetailList,
  type EmailDetailRow,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
} from "../../../../components/index.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

/** Last four digits only for display (never pass a full PAN in email props). */
function cardLast4Digits(raw: string | undefined): string | null {
  if (!raw?.trim()) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 4) return null;
  return digits.slice(-4);
}

/** Renders document with bullets for hidden digits + last two in body color. */
function payerTaxIdDisplayValue(raw: string): string | ReactNode {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 2) {
    return raw.trim();
  }
  const last2 = digits.slice(-2);
  const maskLen = Math.max(0, digits.length - 2);
  const bullets = maskLen > 0 ? "•".repeat(maskLen) : "";
  const textColor = defaultEmailThemeTokens.textColor;
  const mutedColor = defaultEmailThemeTokens.mutedTextColor;
  if (!bullets) {
    return <span style={{ color: textColor }}>{last2}</span>;
  }
  return (
    <>
      <span style={{ color: mutedColor }}>{`${bullets} `}</span>
      <span style={{ color: textColor }}>{last2}</span>
    </>
  );
}

function paymentMethodDetailValue(
  method: string,
  cardLast4Raw: string | undefined,
): string | ReactNode {
  const last4 = cardLast4Digits(cardLast4Raw);
  const textColor = defaultEmailThemeTokens.textColor;
  const mutedColor = defaultEmailThemeTokens.mutedTextColor;
  if (!last4) return method;
  return (
    <>
      <span style={{ color: textColor }}>{method}</span>
      <span style={{ color: mutedColor }}>{` •••• ${last4}`}</span>
    </>
  );
}

/** Who was charged (name on card / billing). Shown in a card under order details when passed. */
export interface TicketPurchaseReceiptPayer {
  name: string;
  email?: string;
  /**
   * Shown with only the **last two digits** visible (leading digits rendered as `•`). Pass any
   * string that contains those two digits (e.g. masked `***.***.***-42` or just `42`). Prefer not
   * to ship the **full** raw tax id through your mail pipeline — send a pre-truncated or masked
   * value from the API when possible.
   */
  taxIdFormatted?: string;
}

export interface TicketPurchaseReceiptLineItem {
  /** Optional stable id from the API (preferred React list key). */
  id?: string;
  /** Used for keys and multi-event carts; not shown in the line item block. */
  eventName: string;
  /** Batch / lot label shown as the item title (e.g. `1º lote`). Falls back to `ticketTypeName` if omitted. */
  lotName?: string;
  /** Internal / access tier name (e.g. `Pista`); kept for keys and API data, not shown in the email row. */
  ticketTypeName: string;
  /** Shown under the lot title — fare kind (e.g. `Inteira`, `Meia`). */
  fareCategoryLabel?: string;
  quantity: number;
  unitPriceFormatted: string;
  lineTotalFormatted: string;
}

export interface TicketPurchaseReceiptCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  lineItemsHeading?: string;
  subtotalLabel?: string;
  taxesLabel?: string;
  totalLabel?: string;
  paymentMethodLabel?: string;
  orderIdLabel?: string;
  purchasedAtLabel?: string;
  payerSectionHeading?: string;
  payerNameLabel?: string;
  payerEmailLabel?: string;
  payerTaxIdLabel?: string;
}

export interface TicketPurchaseReceiptProps {
  theme: ThemeName;
  brand: Brand;
  /**
   * Event name shown in the header (same pattern as ticket emails). For orders spanning multiple
   * events, pass a label chosen by the API (e.g. shared venue name or a short summary).
   */
  eventName: string;
  orderId: string;
  /** Already formatted for the recipient locale (e.g. `13/04/2026 15:42`). */
  purchasedAtFormatted: string;
  items: TicketPurchaseReceiptLineItem[];
  subtotalFormatted: string;
  taxesFormatted?: string;
  totalFormatted: string;
  paymentMethod?: string;
  /**
   * When the charge was by card, pass the last four digits (any non-digits are stripped; longer
   * digit strings use the final four). Shown after `paymentMethod` in muted color (`•••• 1234`).
   * Omit for PIX, boleto, etc.
   */
  paymentCardLast4?: string;
  payer?: TicketPurchaseReceiptPayer;
  copy?: TicketPurchaseReceiptCopy;
}

const defaultCopy: Required<TicketPurchaseReceiptCopy> = {
  subjectPreview: "Recibo da sua compra",
  title: "🧾 Recibo de compra",
  intro: "Obrigado pela compra! Abaixo está o resumo do pedido.",
  lineItemsHeading: "Itens",
  subtotalLabel: "Subtotal",
  taxesLabel: "Taxas",
  totalLabel: "💰 Total",
  paymentMethodLabel: "Forma de pagamento",
  orderIdLabel: "Pedido",
  purchasedAtLabel: "Data",
  payerSectionHeading: "Pagador",
  payerNameLabel: "Nome",
  payerEmailLabel: "E-mail",
  payerTaxIdLabel: "Documento",
};

export const TicketPurchaseReceipt: FC<TicketPurchaseReceiptProps> = ({
  theme: _theme,
  brand,
  eventName,
  orderId,
  purchasedAtFormatted,
  items,
  subtotalFormatted,
  taxesFormatted,
  totalFormatted,
  paymentMethod,
  paymentCardLast4,
  payer,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const previewText = `${eventName} — ${c.subjectPreview}`;

  const trimmedPayment = paymentMethod?.trim();
  const paymentMethodValue = trimmedPayment
    ? paymentMethodDetailValue(trimmedPayment, paymentCardLast4)
    : undefined;
  const orderDetailRows: EmailDetailRow[] = [
    { title: c.orderIdLabel, value: orderId },
    { title: c.purchasedAtLabel, value: purchasedAtFormatted },
    ...(paymentMethodValue !== undefined
      ? [{ id: "payment-method", title: c.paymentMethodLabel, value: paymentMethodValue }]
      : []),
  ];

  const payerName = payer?.name?.trim();
  const trimmedPayerEmail = payer?.email?.trim();
  const trimmedPayerTaxId = payer?.taxIdFormatted?.trim();
  const payerDetailRows: EmailDetailRow[] | null = payerName
    ? [
        { id: "payer-name", title: c.payerNameLabel, value: payerName },
        ...(trimmedPayerEmail
          ? [{ id: "payer-email", title: c.payerEmailLabel, value: trimmedPayerEmail }]
          : []),
        ...(trimmedPayerTaxId
          ? [
              {
                id: "payer-tax-id",
                title: c.payerTaxIdLabel,
                value: payerTaxIdDisplayValue(trimmedPayerTaxId),
              },
            ]
          : []),
      ]
    : null;

  return (
    <EmailLayout previewText={previewText}>
      <HeaderLogo brand={brand} headline={eventName} />
      <Text style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <EmailDetailList rows={orderDetailRows} sectionStyle={{ marginBottom: "16px" }} />
      {payerDetailRows ? (
        <>
          <Text style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: muted }}>
            {c.payerSectionHeading}
          </Text>
          <EmailDetailList rows={payerDetailRows} sectionStyle={{ marginBottom: "16px" }} />
        </>
      ) : null}
      <Text style={{ margin: "0 0 8px", fontSize: "13px", fontWeight: 600, color: muted }}>
        {c.lineItemsHeading}
      </Text>
      <Section
        style={{
          backgroundColor: defaultEmailThemeTokens.canvasBackground,
          borderRadius: "8px",
          padding: "10px 14px",
          marginBottom: "20px",
        }}
      >
        {items.map((item, index) => {
          const lotTitle = item.lotName?.trim() ? item.lotName.trim() : item.ticketTypeName;
          const fare = item.fareCategoryLabel?.trim();
          const detailLine = fare
            ? `${fare} · ${item.quantity}× ${item.unitPriceFormatted}`
            : `${item.quantity}× ${item.unitPriceFormatted}`;
          const isNotFirst = index > 0;
          return (
            <Section
              key={
                item.id ??
                `${item.eventName}|${item.ticketTypeName}|${item.quantity}|${item.unitPriceFormatted}|${item.lineTotalFormatted}`
              }
              style={{
                paddingTop: isNotFirst ? "12px" : 0,
                marginTop: isNotFirst ? "12px" : 0,
                ...(isNotFirst
                  ? { borderTop: `1px solid ${defaultEmailThemeTokens.borderColor}` }
                  : {}),
              }}
            >
              <Row style={{ marginBottom: "6px" }}>
                <Column
                  style={{ width: "68%", verticalAlign: "top" as const, paddingRight: "8px" }}
                >
                  <Text
                    style={{ margin: 0, fontSize: "15px", fontWeight: 600, lineHeight: "22px" }}
                  >
                    {lotTitle}
                  </Text>
                </Column>
                <Column style={{ width: "32%", verticalAlign: "top" as const, textAlign: "right" }}>
                  <Text
                    style={{ margin: 0, fontSize: "14px", fontWeight: 600, lineHeight: "22px" }}
                  >
                    {item.lineTotalFormatted}
                  </Text>
                </Column>
              </Row>
              <Text style={{ margin: 0, fontSize: "13px", lineHeight: "20px", color: muted }}>
                {detailLine}
              </Text>
            </Section>
          );
        })}
      </Section>
      <Section style={{ marginTop: 0 }}>
        <Text style={{ margin: "6px 0", fontSize: "14px" }}>
          <span style={{ color: muted }}>{c.subtotalLabel}</span>
          <span style={{ float: "right" as const }}>{subtotalFormatted}</span>
        </Text>
        {taxesFormatted ? (
          <Text style={{ margin: "6px 0", fontSize: "14px" }}>
            <span style={{ color: muted }}>{c.taxesLabel}</span>
            <span style={{ float: "right" as const }}>{taxesFormatted}</span>
          </Text>
        ) : null}
        <Hr style={{ borderColor: defaultEmailThemeTokens.borderColor, margin: "12px 0" }} />
        <Text style={{ margin: "6px 0", fontSize: "16px", fontWeight: 700 }}>
          <span>{c.totalLabel}</span>
          <span style={{ float: "right" as const }}>{totalFormatted}</span>
        </Text>
      </Section>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
