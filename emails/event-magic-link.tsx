import { Link, Text } from "@react-email/components";
import type { FC } from "react";
import { EmailLayout, FooterLegal, HeaderLogo, PrimaryButton } from "../src/components/index.js";
import type { EmailTheme } from "../src/theme/types.js";
import { defaultEmailThemeTokens } from "../src/theme/types.js";
import { previewTheme } from "./_preview-fixtures.js";

export interface EventMagicLinkCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
  fallbackPrompt?: string;
  securityNote?: string;
}

export interface EventMagicLinkEmailProps {
  theme: EmailTheme;
  magicLinkUrl: string;
  eventOrBrandName: string;
  copy?: EventMagicLinkCopy;
}

const defaultCopy: Required<EventMagicLinkCopy> = {
  subjectPreview: "✨ Seu link de acesso",
  title: "🔓 Acesse sua área do evento",
  intro:
    "Clique no botão abaixo para acessar com um link seguro e exclusivo. Neste acesso você não precisa informar senha.",
  ctaLabel: "Entrar agora",
  fallbackPrompt: "📋 Se o botão não funcionar, copie e cole este endereço no navegador:",
  securityNote: "🔒 Se você não solicitou este acesso, ignore este e-mail.",
};

export const EventMagicLinkEmail: FC<EventMagicLinkEmailProps> = ({
  theme,
  magicLinkUrl,
  eventOrBrandName,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = theme.mutedTextColor ?? defaultEmailThemeTokens.mutedTextColor;
  const previewText = `${eventOrBrandName} — ${c.subjectPreview}`;

  return (
    <EmailLayout previewText={previewText} theme={theme}>
      <HeaderLogo theme={theme} headline={eventOrBrandName} />
      <Text
        style={{
          margin: "0 0 16px",
          fontSize: "20px",
          fontWeight: 600,
          textAlign: "left",
        }}
      >
        {c.title}
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
        {c.intro}
      </Text>
      <PrimaryButton href={magicLinkUrl} label={c.ctaLabel} theme={theme} />
      <Text style={{ margin: "0 0 8px", fontSize: "12px", color: muted }}>{c.fallbackPrompt}</Text>
      <Link
        href={magicLinkUrl}
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          color: theme.primaryColor,
          wordBreak: "break-all" as const,
        }}
      >
        {magicLinkUrl}
      </Link>
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal theme={theme} />
    </EmailLayout>
  );
};

const eventMagicLinkPreviewProps = {
  theme: previewTheme,
  magicLinkUrl: "https://example.com/auth/magic?token=preview_token",
  eventOrBrandName: "Show ao vivo",
} satisfies EventMagicLinkEmailProps;

function Email(props: EventMagicLinkEmailProps) {
  return <EventMagicLinkEmail {...props} />;
}

export default Object.assign(Email, { PreviewProps: eventMagicLinkPreviewProps });
