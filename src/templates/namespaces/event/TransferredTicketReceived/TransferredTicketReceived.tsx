/** Ticket — email to the new holder after a transfer: link (CTA) only, no QR in the email. */

import type { FC } from "react";
import { Link, Text } from "react-email";
import {
  buildTicketIngressoDetailRows,
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
  type TicketFareKind,
} from "../../../../components/index.js";
import { resolveTheme, type ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface TransferredTicketReceivedCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  /** Shown when `transferrerName` is set; `{name}` is replaced with the value. */
  transferrerLine?: string;
  titularLabel?: string;
  horaLocalLabel?: string;
  ticketTypeFareLabel?: string;
  lotLabel?: string;
  fareCourtesyLabel?: string;
  fareFullLabel?: string;
  fareHalfLabel?: string;
  ctaLabel?: string;
  fallbackPrompt?: string;
  securityNote?: string;
}

export interface TransferredTicketReceivedProps {
  theme: ThemeName;
  brand: Brand;
  /** New holder (recipient of the transfer), shown in the detail card. */
  ownerName: string;
  ownerEmail: string;
  eventName: string;
  eventDate?: string;
  eventTime?: string;
  eventDateFormatted?: string;
  venue?: string;
  venueMapsUrl?: string;
  fareKind: TicketFareKind;
  lotName?: string;
  /** Authenticated URL to open the ticket (same pattern as `Ticket` `ticketUrl`). */
  ticketUrl: string;
  /** Previous holder name, if the API can share it (optional). */
  transferrerName?: string;
  copy?: TransferredTicketReceivedCopy;
}

const defaultCopy: Required<TransferredTicketReceivedCopy> = {
  subjectPreview: "Ingresso transferido para você",
  title: "Você recebeu um ingresso por transferência",
  intro:
    "Um ingresso deste evento foi transferido para o seu e-mail. Para acessar, use o botão abaixo.",
  transferrerLine: "Transferência enviada por {name}.",
  titularLabel: "Titular",
  horaLocalLabel: "Hora e local",
  ticketTypeFareLabel: "Tipo do ingresso",
  lotLabel: "Lote",
  fareCourtesyLabel: "Cortesia",
  fareFullLabel: "Inteira",
  fareHalfLabel: "Meia",
  ctaLabel: "Acessar ingresso",
  fallbackPrompt: "Se o botão não funcionar, copie e cole este endereço no navegador:",
  securityNote:
    "Se você não esperava este ingresso ou não reconhece o evento, pode ignorar este e-mail.",
};

export const TransferredTicketReceived: FC<TransferredTicketReceivedProps> = ({
  theme,
  brand,
  ownerName,
  ownerEmail,
  eventName,
  eventDate,
  eventTime,
  eventDateFormatted,
  venue,
  venueMapsUrl,
  fareKind,
  lotName,
  ticketUrl,
  transferrerName,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const { solidColor } = resolveTheme(theme);
  const previewText = `${eventName} — ${c.subjectPreview}`;
  const trimmedTransferrer = transferrerName?.trim();
  const transferrerText = trimmedTransferrer
    ? c.transferrerLine.replace("{name}", trimmedTransferrer)
    : null;

  const detailRows = buildTicketIngressoDetailRows({
    theme,
    labels: {
      titular: c.titularLabel,
      horaLocal: c.horaLocalLabel,
      ticketTypeFare: c.ticketTypeFareLabel,
      lot: c.lotLabel,
    },
    fareLabels: {
      courtesy: c.fareCourtesyLabel,
      full: c.fareFullLabel,
      half: c.fareHalfLabel,
    },
    eventDate,
    eventTime,
    eventDateFormatted,
    venue,
    venueMapsUrl,
    fareKind,
    lotName,
    ownerName,
    ownerEmail,
  });

  return (
    <EmailLayout previewText={previewText} theme={theme}>
      <HeaderLogo brand={brand} headline={eventName} />
      <Text style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      {transferrerText ? (
        <Text style={{ margin: "0 0 20px", fontSize: "13px", lineHeight: "20px", color: muted }}>
          {transferrerText}
        </Text>
      ) : null}
      <EmailDetailList rows={detailRows} sectionStyle={{ marginBottom: "16px" }} />
      <PrimaryButton href={ticketUrl} label={c.ctaLabel} theme={theme} />
      <Text style={{ margin: "16px 0 8px", fontSize: "12px", color: muted }}>
        {c.fallbackPrompt}
      </Text>
      <Link
        href={ticketUrl}
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          color: solidColor,
          wordBreak: "break-all" as const,
        }}
      >
        {ticketUrl}
      </Link>
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
