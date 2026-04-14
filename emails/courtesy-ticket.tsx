/** Cortesia — variante só com link autenticado para a tela do ingresso (sem QR no e-mail). */
import { Text } from "@react-email/components";
import type { FC } from "react";
import {
  buildTicketIngressoDetailRows,
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
  type TicketFareKind,
} from "../src/components/index.js";
import type { EmailTheme } from "../src/theme/types.js";
import { defaultEmailThemeTokens } from "../src/theme/types.js";
import { previewTheme } from "./_preview-fixtures.js";

export type { TicketFareKind };

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

export interface CourtesyTicketEmailProps {
  theme: EmailTheme;
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

export const CourtesyTicketEmail: FC<CourtesyTicketEmailProps> = ({
  theme,
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
      <Text style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <EmailDetailList theme={theme} rows={detailRows} />
      <PrimaryButton href={ctaUrl} label={c.ctaLabel} theme={theme} />
      <Text style={{ margin: "16px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.footnote}
      </Text>
      <FooterLegal theme={theme} />
    </EmailLayout>
  );
};

const courtesyTicketPreviewProps = {
  theme: previewTheme,
  eventName: "Show ao vivo",
  eventDate: "20/04/2026",
  eventTime: "21:00",
  venue: "Arena Example, São Paulo",
  venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
  lotName: "Cortesias",
  ownerName: "João Convidado",
  ownerEmail: "convidado@example.com",
  ctaUrl: "https://example.com/ingresso/cortesia-preview",
} satisfies CourtesyTicketEmailProps;

function Email(props: CourtesyTicketEmailProps) {
  return <CourtesyTicketEmail {...props} />;
}

export default Object.assign(Email, { PreviewProps: courtesyTicketPreviewProps });
