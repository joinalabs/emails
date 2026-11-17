/**
 * Purchase — the buyer's cancellation, received (blueprint finance@0.1.0, FN-EMAILS-1): the immediate
 * confirmation the law asks for (Decreto 7.962/2013 art. 5 § 4). Another e-mail follows once refunded.
 */

import type { FC } from "react";
import { Text } from "react-email";
import {
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
  type Refund,
  type RefundDestinationCopy,
  refundDestination,
} from "../../../../components/index.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface PurchaseCancellationReceivedCopy extends RefundDestinationCopy {
  subjectPreview?: string;
  title?: string;
  /** `{name}`. */
  greeting?: string;
  /** `{tickets}`, `{event}`, `{date}`. */
  body?: string;
  /** `{amount}`, `{to}`. */
  refundLine?: string;
  followUp?: string;
  ticketsOne?: string;
  /** `{n}`. */
  ticketsMany?: string;
  orderIdLabel?: string;
  amountLabel?: string;
  ctaLabel?: string;
}

export interface PurchaseCancellationReceivedProps {
  theme: ThemeName;
  brand: Brand;
  buyerName: string;
  eventName: string;
  orderId: string;
  ticketCount: number;
  /** Already formatted for the recipient locale (e.g. `13/04/2026 15:42`). */
  purchasedAtFormatted: string;
  refund: Refund;
  /** The buyer's account in the producer's space, when the API has it. */
  accountUrl?: string;
  copy?: PurchaseCancellationReceivedCopy;
}

const defaultCopy: Required<Omit<PurchaseCancellationReceivedCopy, keyof RefundDestinationCopy>> = {
  subjectPreview: "Recebemos o cancelamento da sua compra",
  title: "Recebemos o cancelamento da sua compra",
  greeting: "Olá, {name}.",
  body: "Recebemos o seu pedido para cancelar a compra de {tickets} para {event}, feito em {date}. Os ingressos já não valem.",
  refundLine: "Vamos devolver {amount} {to}.",
  followUp: "Avisamos por e-mail quando o valor for devolvido.",
  ticketsOne: "1 ingresso",
  ticketsMany: "{n} ingressos",
  orderIdLabel: "Pedido",
  amountLabel: "Valor a devolver",
  ctaLabel: "Abrir minha conta",
};

export const PurchaseCancellationReceived: FC<PurchaseCancellationReceivedProps> = ({
  theme,
  brand,
  buyerName,
  eventName,
  orderId,
  ticketCount,
  purchasedAtFormatted,
  refund,
  accountUrl,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const paragraph = { margin: "0 0 12px", fontSize: "14px", lineHeight: "22px", color: muted };
  const tickets =
    ticketCount === 1 ? c.ticketsOne : c.ticketsMany.replace("{n}", String(ticketCount));

  return (
    <EmailLayout previewText={`${eventName} — ${c.subjectPreview}`}>
      <HeaderLogo brand={brand} theme={theme} headline={eventName} />
      <Text style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={paragraph}>{c.greeting.replace("{name}", buyerName)}</Text>
      <Text style={paragraph}>
        {c.body
          .replace("{tickets}", tickets)
          .replace("{event}", eventName)
          .replace("{date}", purchasedAtFormatted)}
      </Text>
      <Text style={paragraph}>
        {c.refundLine
          .replace("{amount}", refund.amountFormatted)
          .replace("{to}", refundDestination(refund, copy))}
      </Text>
      <Text style={{ ...paragraph, margin: "0 0 20px" }}>{c.followUp}</Text>
      <EmailDetailList
        rows={[
          { title: c.orderIdLabel, value: orderId },
          { title: c.amountLabel, value: refund.amountFormatted },
        ]}
        sectionStyle={{ marginBottom: "16px" }}
      />
      {accountUrl ? <PrimaryButton href={accountUrl} label={c.ctaLabel} theme={theme} /> : null}
      <FooterLegal legalFooter={brand.legalFooter} supportEmail={brand.supportEmail} />
    </EmailLayout>
  );
};
