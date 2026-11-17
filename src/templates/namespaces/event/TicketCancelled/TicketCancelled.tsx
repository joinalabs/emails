/**
 * Ticket — cancelled, to the holder of a transferred ticket (blueprint finance@0.1.0, FN-EMAILS-3): the
 * purchase it came from was cancelled, so the ticket no longer counts.
 */

import type { FC } from "react";
import { Text } from "react-email";
import { EmailLayout, FooterLegal, HeaderLogo } from "../../../../components/index.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface TicketCancelledCopy {
  subjectPreview?: string;
  /** `{event}`. */
  title?: string;
  /** `{name}`. */
  greeting?: string;
  /** `{buyer}`. */
  body?: string;
  /** `{buyer}`. */
  help?: string;
}

export interface TicketCancelledProps {
  theme: ThemeName;
  brand: Brand;
  holderName: string;
  /** Who bought and transferred the ticket. */
  buyerName: string;
  eventName: string;
  copy?: TicketCancelledCopy;
}

const defaultCopy: Required<TicketCancelledCopy> = {
  subjectPreview: "Seu ingresso foi cancelado",
  title: "Seu ingresso para {event} foi cancelado",
  greeting: "Olá, {name}.",
  body: "A compra do ingresso que {buyer} transferiu para você foi cancelada, e ele não vale mais para entrar.",
  help: "Se tiver dúvidas, fale com {buyer} ou com o produtor do evento.",
};

export const TicketCancelled: FC<TicketCancelledProps> = ({
  theme,
  brand,
  holderName,
  buyerName,
  eventName,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const paragraph = { margin: "0 0 12px", fontSize: "14px", lineHeight: "22px", color: muted };

  return (
    <EmailLayout previewText={`${eventName} — ${c.subjectPreview}`}>
      <HeaderLogo brand={brand} theme={theme} headline={eventName} />
      <Text style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600 }}>
        {c.title.replace("{event}", eventName)}
      </Text>
      <Text style={paragraph}>{c.greeting.replace("{name}", holderName)}</Text>
      <Text style={paragraph}>{c.body.replace("{buyer}", buyerName)}</Text>
      <Text style={{ ...paragraph, margin: "0 0 20px" }}>
        {c.help.replace("{buyer}", buyerName)}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} supportEmail={brand.supportEmail} />
    </EmailLayout>
  );
};
