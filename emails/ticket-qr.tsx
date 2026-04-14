/** Ingresso — variante com QR Code embutido no e-mail (opcionalmente com link adicional). */
import { Column, Img, Row, Section, Text } from "@react-email/components";
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
import { placeholderQrSrc, previewTheme } from "./_preview-fixtures.js";

export type { TicketFareKind };

export interface TicketQrCodeCopy {
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
  qrAlt?: string;
  ctaLabel?: string;
  securityNote?: string;
}

export interface TicketQrCodeEmailProps {
  theme: EmailTheme;
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
  /**
   * QR image source produced outside this package: HTTPS URL, `cid:...`, or a `data:image/png;base64,...` URL.
   */
  qrImageSrc: string;
  /** Optional deep link to wallet / ticket page (same rules as `qrImageSrc` for URLs). */
  ctaUrl?: string;
  copy?: TicketQrCodeCopy;
}

const defaultCopy: Required<TicketQrCodeCopy> = {
  subjectPreview: "Seu ingresso com QR Code",
  title: "Seu ingresso",
  intro:
    "Mostre o QR Code na entrada para validar o acesso. O link abaixo abre a página do seu ingresso com as informações completas do evento.",
  titularLabel: "Titular",
  horaLocalLabel: "Hora e local",
  ticketTypeFareLabel: "Tipo do ingresso",
  lotLabel: "Lote",
  fareCourtesyLabel: "Cortesia",
  fareFullLabel: "Inteira",
  fareHalfLabel: "Meia",
  qrAlt: "QR Code do ingresso",
  ctaLabel: "Acessar ingresso",
  securityNote: "Se você não reconhece esta compra, pode ignorar este e-mail.",
};

export const TicketQrCodeEmail: FC<TicketQrCodeEmailProps> = ({
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
  qrImageSrc,
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
      <Text style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <Section style={{ margin: "8px 0 24px" }}>
        <Row>
          <Column
            align="center"
            style={{ width: "100%", padding: "28px 32px", boxSizing: "border-box" }}
          >
            <Img
              alt={c.qrAlt}
              height={220}
              src={qrImageSrc}
              width={220}
              style={{
                margin: "0 auto",
                display: "block",
                borderRadius: "8px",
                border: "1px solid #eaeaea",
              }}
            />
          </Column>
        </Row>
      </Section>
      <EmailDetailList theme={theme} rows={detailRows} />
      {ctaUrl ? <PrimaryButton href={ctaUrl} label={c.ctaLabel} theme={theme} /> : null}
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal theme={theme} />
    </EmailLayout>
  );
};

const ticketQrPreviewProps = {
  theme: previewTheme,
  ownerName: "Maria Silva",
  ownerEmail: "maria@example.com",
  eventName: "Show ao vivo",
  eventDate: "20/04/2026",
  eventTime: "21:00",
  venue: "Arena Example, São Paulo",
  venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
  fareKind: "full" as const,
  lotName: "1º lote",
  qrImageSrc: placeholderQrSrc,
  ctaUrl: "https://example.com/ingresso/TCK-preview-001",
} satisfies TicketQrCodeEmailProps;

function Email(props: TicketQrCodeEmailProps) {
  return <TicketQrCodeEmail {...props} />;
}

export default Object.assign(Email, { PreviewProps: ticketQrPreviewProps });
