/** Complimentary ticket — variant with an authenticated link to the ticket screen only (no QR in the email). */

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
} from "../../../../components/index.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface CourtesyTicketCopy {
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
  footnote?: string;
}

export interface CourtesyTicketProps {
  theme: ThemeName;
  brand: Brand;
  eventName: string;
  eventDate?: string;
  eventTime?: string;
  eventDateFormatted?: string;
  venue?: string;
  venueMapsUrl?: string;
  fareKind?: TicketFareKind;
  lotName?: string;
  ownerName: string;
  ownerEmail: string;
  ctaUrl: string;
  copy?: CourtesyTicketCopy;
}

const defaultCopy: Required<CourtesyTicketCopy> = {
  subjectPreview: "Ingresso cortesia",
  title: "Você recebeu um ingresso cortesia",
  intro:
    "Um ingresso foi emitido em seu nome. Use o botão abaixo para abrir seu ingresso na tela com o seu acesso seguro.",
  titularLabel: "Titular",
  horaLocalLabel: "Hora e local",
  ticketTypeFareLabel: "Tipo do ingresso",
  lotLabel: "Lote",
  fareCourtesyLabel: "Cortesia",
  fareFullLabel: "Inteira",
  fareHalfLabel: "Meia",
  ctaLabel: "Acessar ingresso",
  footnote: "Em caso de dúvidas, fale com o organizador do evento.",
};

export const CourtesyTicket: FC<CourtesyTicketProps> = ({
  theme,
  brand,
  eventName,
  eventDate,
  eventTime,
  eventDateFormatted,
  venue,
  venueMapsUrl,
  fareKind = "courtesy",
  lotName,
  ownerName,
  ownerEmail,
  ctaUrl,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
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
      <HeaderLogo brand={brand} headline={eventName} />
      <Text style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <EmailDetailList rows={detailRows} />
      <PrimaryButton href={ctaUrl} label={c.ctaLabel} theme={theme} />
      <Text style={{ margin: "16px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.footnote}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
