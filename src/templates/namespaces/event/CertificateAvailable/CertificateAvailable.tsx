/** Certificate available — delivers a tokenized download link for the participant's certificate. */

import type { FC } from "react";
import { Link, Text } from "react-email";
import {
  EmailDetailList,
  type EmailDetailRow,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
} from "../../../../components/index.js";
import { resolveTheme, type ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

/** Certificate holder (name + email), rendered as the "Titular" row. */
export interface CertificateOwner {
  name: string;
  email: string;
}

export interface CertificateAvailableProps {
  theme: ThemeName;
  brand: Brand;
  /** Certificate holder — shown in the "Titular" row (name + email). */
  owner: CertificateOwner;
  /** Event linked to the certificate — shown as the header headline (like the ticket email). */
  eventName: string;
  /** Activity/workshop the certificate is for — shown in the "Atividade" row. */
  activityName: string;
  /** Heading above the description. Defaults to "Certificado emitido". */
  title?: string;
  /** Description shown below the title. Defaults to a standard message. */
  greeting?: string;
  /** e.g. "8 horas". Optional — when absent, the "Carga horária" row is omitted. */
  workload?: string;
  /** Absolute URL of the tokenized download endpoint (primary CTA). */
  downloadUrl: string;
}

const DEFAULT_TITLE = "Certificado emitido";
const DEFAULT_GREETING =
  "Seu certificado de participação já está disponível. Use o botão abaixo para baixá-lo.";
const TITULAR_LABEL = "Titular";
const ACTIVITY_LABEL = "Atividade";
const WORKLOAD_LABEL = "Carga horária";
const CTA_LABEL = "Baixar certificado";
const FALLBACK_PROMPT = "Se o botão não funcionar, copie e cole este endereço no navegador:";
const SECURITY_NOTE = "Se você não participou deste evento, pode ignorar este email.";

export const CertificateAvailable: FC<CertificateAvailableProps> = ({
  theme,
  brand,
  owner,
  eventName,
  activityName,
  title,
  greeting,
  workload,
  downloadUrl,
}) => {
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const text = defaultEmailThemeTokens.textColor;
  const { solidColor } = resolveTheme(theme);

  const heading = title?.trim() || DEFAULT_TITLE;
  const description = greeting?.trim() || DEFAULT_GREETING;
  const trimmedWorkload = workload?.trim();

  const detailRows: EmailDetailRow[] = [
    {
      id: "titular",
      title: TITULAR_LABEL,
      value: (
        <>
          <span style={{ color: text, fontWeight: 600 }}>{owner.name.trim()}</span>
          <span style={{ color: muted }}>{` ${owner.email.trim()}`}</span>
        </>
      ),
    },
    { id: "atividade", title: ACTIVITY_LABEL, value: activityName.trim() },
  ];
  if (trimmedWorkload) {
    detailRows.push({ id: "carga-horaria", title: WORKLOAD_LABEL, value: trimmedWorkload });
  }

  return (
    <EmailLayout previewText={`${eventName} — ${description}`}>
      <HeaderLogo brand={brand} theme={theme} headline={eventName} />
      <Text style={{ margin: "0 0 12px", fontSize: "20px", fontWeight: 600, textAlign: "left" }}>
        {heading}
      </Text>
      <Text
        style={{
          margin: "0 0 20px",
          fontSize: "14px",
          lineHeight: "22px",
          color: muted,
          textAlign: "left",
        }}
      >
        {description}
      </Text>
      <EmailDetailList rows={detailRows} sectionStyle={{ marginBottom: "24px" }} />
      <PrimaryButton href={downloadUrl} label={CTA_LABEL} theme={theme} />
      <Text style={{ margin: "16px 0 8px", fontSize: "12px", color: muted }}>
        {FALLBACK_PROMPT}
      </Text>
      <Link
        href={downloadUrl}
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          color: solidColor,
          wordBreak: "break-all" as const,
        }}
      >
        {downloadUrl}
      </Link>
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {SECURITY_NOTE}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
