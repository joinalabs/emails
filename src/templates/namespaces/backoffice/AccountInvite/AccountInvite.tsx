/**
 * Producer first access on Joina: invitation to create the first account and register
 * the company (producer) and user details on the platform.
 */

import type { FC } from "react";
import { Link, Text } from "react-email";
import {
  EmailDetailList,
  type EmailDetailRow,
  EmailLayout,
  FooterLegal,
  PrimaryButton,
} from "../../../../components/index.js";
import { resolveTheme, type ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface AccountInviteCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  /** Paragraph after the detail card, before the CTA (first account + company data). */
  onboardingHint?: string;
  inviteeEmailLabel?: string;
  /** Shown below the detail card (or standalone when no inviteeEmail is set); use `{brandName}` for `brand.brandName`. */
  footerNote?: string;
  ctaLabel?: string;
  fallbackPrompt?: string;
  securityNote?: string;
}

export interface AccountInviteProps {
  theme?: ThemeName;
  brand: Brand;
  /** Signed or time-limited URL for first signup (password + producer/company profile). */
  inviteUrl: string;
  /** E-mail this invite was sent to (recommended). */
  inviteeEmail?: string;
  copy?: AccountInviteCopy;
}

const defaultCopy: Required<AccountInviteCopy> = {
  subjectPreview: "✨ Seu convite na Joina",
  title: "🎉 Vamos configurar sua produtora na Joina?",
  intro:
    "Boas notícias: você recebeu um convite para abrir a primeira conta da produtora na plataforma Joina. Ficamos muito felizes em ter vocês por aqui — quando quiser começar, é só usar o botão abaixo.",
  onboardingHint:
    "Na primeira vez você escolhe uma senha e preenche os dados da empresa e da sua conta. Em poucos minutos você já deixa tudo pronto para brilhar com os eventos na Joina — muito bom ter vocês com a gente!",
  inviteeEmailLabel: "Convite enviado para",
  footerNote: "Com carinho, equipe Joina ✨",
  ctaLabel: "Quero começar!",
  fallbackPrompt: "Se o botão não funcionar, copie e cole este endereço no navegador:",
  securityNote:
    "Se você não reconhece este convite ou não esperava um acesso à Joina, sem problema — pode ignorar este e-mail.",
};

export const AccountInvite: FC<AccountInviteProps> = ({
  theme = "White",
  brand,
  inviteUrl,
  inviteeEmail,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const { solidColor } = resolveTheme(theme);
  const footerText = c.footerNote.replace("{brandName}", brand.brandName);

  const rows: EmailDetailRow[] = [];
  const trimmedInvitee = inviteeEmail?.trim();
  if (trimmedInvitee) {
    rows.push({ id: "invitee-email", title: c.inviteeEmailLabel, value: trimmedInvitee });
  }

  const footerNote = (
    <Text style={{ margin: 0, fontSize: "13px", lineHeight: "20px", color: muted }}>
      {footerText}
    </Text>
  );

  return (
    <EmailLayout previewText={c.subjectPreview} theme={theme}>
      <Text style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      {rows.length > 0 ? (
        <EmailDetailList rows={rows} sectionStyle={{ marginBottom: "16px" }} footer={footerNote} />
      ) : (
        <div style={{ marginBottom: "16px" }}>{footerNote}</div>
      )}
      <Text style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.onboardingHint}
      </Text>
      <PrimaryButton href={inviteUrl} label={c.ctaLabel} theme={theme} />
      <Text style={{ margin: "16px 0 8px", fontSize: "12px", color: muted }}>
        {c.fallbackPrompt}
      </Text>
      <Link
        href={inviteUrl}
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          color: solidColor,
          wordBreak: "break-all" as const,
        }}
      >
        {inviteUrl}
      </Link>
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
