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
} from "../../../components/index.js";
import type { EmailTheme } from "../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../theme/types.js";

export interface ProducerFirstAccountInviteCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  /** Paragraph after the detail card, before the CTA (first account + company data). */
  onboardingHint?: string;
  organizationLabel?: string;
  inviteeEmailLabel?: string;
  /** Shown in the card footer; use `{brandName}` for `theme.brandName` (platform). */
  footerNote?: string;
  ctaLabel?: string;
  fallbackPrompt?: string;
  securityNote?: string;
}

export interface ProducerFirstAccountInviteProps {
  theme: EmailTheme;
  /** Signed or time-limited URL for first signup (password + producer/company profile). */
  inviteUrl: string;
  /** Producer / organization name (shown in the card and preheader). */
  organizationOrProducerName: string;
  /** E-mail this invite was sent to (recommended). */
  inviteeEmail?: string;
  copy?: ProducerFirstAccountInviteCopy;
}

const defaultCopy: Required<ProducerFirstAccountInviteCopy> = {
  subjectPreview: "✨ Seu convite na Joina",
  title: "🎉 Vamos configurar sua produtora na Joina?",
  intro:
    "Boas notícias: você recebeu um convite para abrir a primeira conta da produtora na plataforma Joina. Ficamos muito felizes em ter vocês por aqui — quando quiser começar, é só usar o botão abaixo.",
  onboardingHint:
    "Na primeira vez você escolhe uma senha e preenche os dados da empresa e da sua conta. Em poucos minutos você já deixa tudo pronto para brilhar com os eventos na Joina — muito bom ter vocês com a gente!",
  organizationLabel: "Produtora / organização",
  inviteeEmailLabel: "Convite enviado para",
  footerNote: "Com carinho, equipe Joina ✨",
  ctaLabel: "Quero começar!",
  fallbackPrompt: "Se o botão não funcionar, copie e cole este endereço no navegador:",
  securityNote:
    "Se você não reconhece este convite ou não esperava um acesso à Joina, sem problema — pode ignorar este e-mail.",
};

export const ProducerFirstAccountInvite: FC<ProducerFirstAccountInviteProps> = ({
  theme,
  inviteUrl,
  organizationOrProducerName,
  inviteeEmail,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = theme.mutedTextColor ?? defaultEmailThemeTokens.mutedTextColor;
  const previewText = `${organizationOrProducerName} — ${c.subjectPreview}`;
  const footerText = c.footerNote.replace("{brandName}", theme.brandName);

  const rows: EmailDetailRow[] = [
    { id: "org", title: c.organizationLabel, value: organizationOrProducerName },
  ];
  const trimmedInvitee = inviteeEmail?.trim();
  if (trimmedInvitee) {
    rows.push({ id: "invitee-email", title: c.inviteeEmailLabel, value: trimmedInvitee });
  }

  return (
    <EmailLayout previewText={previewText} theme={theme}>
      <Text style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <EmailDetailList
        theme={theme}
        rows={rows}
        sectionStyle={{ marginBottom: "16px" }}
        footer={
          <Text style={{ margin: 0, fontSize: "13px", lineHeight: "20px", color: muted }}>
            {footerText}
          </Text>
        }
      />
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
          color: theme.primaryColor,
          wordBreak: "break-all" as const,
        }}
      >
        {inviteUrl}
      </Link>
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal theme={theme} />
    </EmailLayout>
  );
};
