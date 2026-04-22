import type { FC } from "react";
import { Link, Text } from "react-email";
import {
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
} from "../../../../components/index.js";
import { resolveTheme, type ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface CustomerAuthMagicLinkCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
  fallbackPrompt?: string;
  securityNote?: string;
}

export interface CustomerAuthMagicLinkProps {
  theme: ThemeName;
  brand: Brand;
  magicLinkUrl: string;
  eventOrBrandName: string;
  copy?: CustomerAuthMagicLinkCopy;
}

const defaultCopy: Required<CustomerAuthMagicLinkCopy> = {
  subjectPreview: "✨ Seu link de acesso",
  title: "🔓 Acesse sua área do evento",
  intro:
    "Clique no botão abaixo para acessar com um link seguro e exclusivo. Neste acesso você não precisa informar senha.",
  ctaLabel: "Entrar agora",
  fallbackPrompt: "📋 Se o botão não funcionar, copie e cole este endereço no navegador:",
  securityNote: "🔒 Se você não solicitou este acesso, ignore este e-mail.",
};

export const CustomerAuthMagicLink: FC<CustomerAuthMagicLinkProps> = ({
  theme,
  brand,
  magicLinkUrl,
  eventOrBrandName,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const { solidColor } = resolveTheme(theme);
  const previewText = `${eventOrBrandName} — ${c.subjectPreview}`;

  return (
    <EmailLayout previewText={previewText}>
      <HeaderLogo brand={brand} headline={eventOrBrandName} />
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
          color: solidColor,
          wordBreak: "break-all" as const,
        }}
      >
        {magicLinkUrl}
      </Link>
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
