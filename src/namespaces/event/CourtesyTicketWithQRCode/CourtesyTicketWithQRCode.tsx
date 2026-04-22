/** Complimentary ticket — variant with QR code embedded in the email (optionally with a link to the ticket screen). */

import type { FC } from "react";
import { Column, Img, Row, Section, Text } from "react-email";
import {
  buildTicketIngressoDetailRows,
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
  type TicketFareKind,
} from "../../../components/index.js";
import type { ThemeName } from "../../../theme/gradient-themes.js";
import type { Brand } from "../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../theme/types.js";

export interface CourtesyTicketWithQRCodeCopy {
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
  footnote?: string;
}

export interface CourtesyTicketWithQRCodeProps {
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
  /**
   * QR image source produced outside this package: HTTPS URL, `cid:...`, or a `data:image/png;base64,...` URL.
   */
  qrImageSrc: string;
  /** Optional link to the full ticket / wallet page (same rules as `qrImageSrc` for URLs). */
  ctaUrl?: string;
  copy?: CourtesyTicketWithQRCodeCopy;
}

const defaultCopy: Required<CourtesyTicketWithQRCodeCopy> = {
  subjectPreview: "Ingresso cortesia",
  title: "Você recebeu um ingresso cortesia",
  intro:
    "Um ingresso foi emitido em seu nome. O QR Code está abaixo para uso na entrada. Você também pode abrir o link para ver o ingresso na tela.",
  titularLabel: "Titular",
  horaLocalLabel: "Hora e local",
  ticketTypeFareLabel: "Tipo do ingresso",
  lotLabel: "Lote",
  fareCourtesyLabel: "Cortesia",
  fareFullLabel: "Inteira",
  fareHalfLabel: "Meia",
  qrAlt: "QR Code do ingresso cortesia",
  ctaLabel: "Acessar ingresso",
  footnote: "Em caso de dúvidas, fale com o organizador do evento.",
};

export const CourtesyTicketWithQRCode: FC<CourtesyTicketWithQRCodeProps> = ({
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
  qrImageSrc,
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
    <EmailLayout previewText={previewText}>
      <HeaderLogo brand={brand} headline={eventName} />
      <Text style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <Section style={{ margin: "8px 0 24px" }}>
        <Row>
          <Column
            align="center"
            style={{ width: "100%", padding: "32px 32px", boxSizing: "border-box" }}
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
      <EmailDetailList rows={detailRows} />
      {ctaUrl ? <PrimaryButton href={ctaUrl} label={c.ctaLabel} theme={theme} /> : null}
      <Text style={{ margin: "16px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.footnote}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
