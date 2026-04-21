/** Ticket — variant with an authenticated link to the ticket screen only (no QR in the email). */

import type { FC } from "react";
import { Text } from "react-email";
import {
  buildTicketIngressoDetailRows,
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
  type TicketFareKind,
} from "../../../components/index.js";
import type { EmailTheme } from "../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../theme/types.js";

export interface TicketCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  titularLabel?: string;
  horaLocalLabel?: string;
  ticketTypeFareLabel?: string;
  lotLabel?: string;
  fareCourtesyLabel?: string;
  fareFullLabel?: string;
  fareHalfLabel?: string;
  ctaLabel?: string;
  securityNote?: string;
}

export interface TicketProps {
  theme: EmailTheme;
  ownerName: string;
  ownerEmail: string;
  eventName: string;
  /** Use with `eventTime` to build the `Date, Time · Venue` line. */
  eventDate?: string;
  eventTime?: string;
  /** Fallback left segment when `eventDate` + `eventTime` are not both set (e.g. `20/04/2026, 21:00`). */
  eventDateFormatted?: string;
  venue?: string;
  venueMapsUrl?: string;
  fareKind: TicketFareKind;
  lotName?: string;
  ticketUrl: string;
  copy?: TicketCopy;
}

const defaultCopy: Required<TicketCopy> = {
  subjectPreview: "Seu ingresso",
  title: "Seu ingresso",
  intro: "Use o botão abaixo para abrir seu ingresso na tela.",
  titularLabel: "Titular",
  horaLocalLabel: "Hora e local",
  ticketTypeFareLabel: "Tipo do ingresso",
  lotLabel: "Lote",
  fareCourtesyLabel: "Cortesia",
  fareFullLabel: "Inteira",
  fareHalfLabel: "Meia",
  ctaLabel: "Acessar ingresso",
  securityNote: "Se você não reconhece esta compra, pode ignorar este e-mail.",
};

export const Ticket: FC<TicketProps> = ({
  theme,
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
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = theme.mutedTextColor ?? defaultEmailThemeTokens.mutedTextColor;
  const previewText = `${eventName} — ${c.subjectPreview}`;

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
      <HeaderLogo theme={theme} headline={eventName} />
      <Text style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 24px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <EmailDetailList theme={theme} rows={detailRows} sectionStyle={{ marginBottom: "8px" }} />
      <PrimaryButton href={ticketUrl} label={c.ctaLabel} theme={theme} />
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal theme={theme} />
    </EmailLayout>
  );
};
