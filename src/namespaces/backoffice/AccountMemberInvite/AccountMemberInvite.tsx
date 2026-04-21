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

export interface AccountMemberInviteCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  /** Shown after the detail card and before the CTA — accepting the team invite and setting password. */
  onboardingHint?: string;
  organizationLabel?: string;
  inviteeEmailLabel?: string;
  inviterLine?: string;
  ctaLabel?: string;
  fallbackPrompt?: string;
  securityNote?: string;
}

export interface AccountMemberInviteProps {
  theme: EmailTheme;
  /** Signed or time-limited URL to accept the team invite (typically set password on first join). */
  inviteUrl: string;
  /** Producer or organization name shown in the card (and in the preheader). */
  organizationOrProducerName: string;
  /** E-mail address the invite was sent to (optional but recommended for clarity). */
  inviteeEmail?: string;
  /** Name of the teammate who sent the invite. */
  inviterName?: string;
  copy?: AccountMemberInviteCopy;
}

const defaultCopy: Required<AccountMemberInviteCopy> = {
  subjectPreview: "✨ Convite — time na Joina",
  title: "🎉 Você foi convidado para o time na Joina!",
  intro:
    "O time da produtora abaixo te chamou para colaborar na plataforma Joina — boa notícia! O link é pessoal e seguro; é só usar o botão quando quiser aceitar.",
  onboardingHint:
    "Ao aceitar, você escolhe sua senha e já entra na Joina com a permissão que o time liberou para você. Em poucos passos você já está dentro.",
  organizationLabel: "Produtora / organização",
  inviteeEmailLabel: "Convite enviado para",
  inviterLine: "Convite enviado por {name} ✨",
  ctaLabel: "Quero entrar!",
  fallbackPrompt: "Se o botão não funcionar, copie e cole este endereço no navegador:",
  securityNote:
    "Se esse convite pegou você de surpresa ou não era para você, sem problema — pode ignorar este e-mail.",
};

export const AccountMemberInvite: FC<AccountMemberInviteProps> = ({
  theme,
  inviteUrl,
  organizationOrProducerName,
  inviteeEmail,
  inviterName,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = theme.mutedTextColor ?? defaultEmailThemeTokens.mutedTextColor;
  const inviterText = inviterName
    ? c.inviterLine.replace("{name}", inviterName)
    : "O convite veio de alguém do time com acesso à plataforma Joina.";

  const previewText = `${organizationOrProducerName} — ${c.subjectPreview}`;

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
            {inviterText}
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
