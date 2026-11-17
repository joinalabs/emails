/**
 * Purchase — charged back (blueprint finance@0.1.0): the card's holder disputed the charge, so its
 * tickets no longer count.
 */

import type { FC } from "react";
import { Text } from "react-email";
import {
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
} from "../../../../components/index.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface PurchaseChargedBackCopy {
  subjectPreview?: string;
  title?: string;
  /** `{name}`. */
  greeting?: string;
  /** `{event}`. */
  body?: string;
  help?: string;
  orderIdLabel?: string;
}

export interface PurchaseChargedBackProps {
  theme: ThemeName;
  brand: Brand;
  buyerName: string;
  eventName: string;
  orderId: string;
  copy?: PurchaseChargedBackCopy;
}

const defaultCopy: Required<PurchaseChargedBackCopy> = {
  subjectPreview: "Contestação registrada",
  title: "Contestação registrada",
  greeting: "Olá, {name}.",
  body: "Registramos uma contestação (chargeback) do pagamento da sua compra para {event}. Os ingressos dessa compra não valem mais para entrar.",
  help: "Se você não reconhece essa contestação, fale com o produtor do evento.",
  orderIdLabel: "Pedido",
};

export const PurchaseChargedBack: FC<PurchaseChargedBackProps> = ({
  theme,
  brand,
  buyerName,
  eventName,
  orderId,
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
      <Text style={paragraph}>{c.body.replace("{event}", eventName)}</Text>
      <Text style={{ ...paragraph, margin: "0 0 20px" }}>{c.help}</Text>
      <EmailDetailList
        rows={[{ title: c.orderIdLabel, value: orderId }]}
        sectionStyle={{ marginBottom: "16px" }}
      />
      <FooterLegal legalFooter={brand.legalFooter} supportEmail={brand.supportEmail} />
    </EmailLayout>
  );
};
