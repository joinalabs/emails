import type { FC } from "react";
import { Link, Text } from "react-email";
import { EmailLayout, FooterLegal, PrimaryButton } from "../../../../components/index.js";
import { resolveTheme, type ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface AccountMemberPasswordResetCopy {
  subjectPreview?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
  fallbackPrompt?: string;
  securityNote?: string;
}

export interface AccountMemberPasswordResetProps {
  theme: ThemeName;
  brand: Brand;
  resetUrl: string;
  copy?: AccountMemberPasswordResetCopy;
}

const defaultCopy: Required<AccountMemberPasswordResetCopy> = {
  subjectPreview: "🔐 Redefinição de senha",
  title: "🔑 Redefinir sua senha",
  intro:
    "Recebemos um pedido para redefinir a senha da sua conta de produtor. Se foi você, é só seguir o botão abaixo ✨",
  ctaLabel: "Redefinir senha",
  fallbackPrompt: "📋 Se o botão não funcionar, copie e cole este endereço no navegador:",
  securityNote:
    "🔒 Se você não solicitou a redefinição, ignore este e-mail — sua senha permanece a mesma.",
};

export const AccountMemberPasswordReset: FC<AccountMemberPasswordResetProps> = ({
  theme,
  brand,
  resetUrl,
  copy,
}) => {
  const c = { ...defaultCopy, ...copy };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const { solidColor } = resolveTheme(theme);

  return (
    <EmailLayout previewText={c.subjectPreview} theme={theme}>
      <Text style={{ margin: "0 0 10px", fontSize: "20px", fontWeight: 600 }}>{c.title}</Text>
      <Text style={{ margin: "0 0 20px", fontSize: "14px", lineHeight: "22px", color: muted }}>
        {c.intro}
      </Text>
      <PrimaryButton href={resetUrl} label={c.ctaLabel} theme={theme} />
      <Text style={{ margin: "16px 0 8px", fontSize: "12px", color: muted }}>
        {c.fallbackPrompt}
      </Text>
      <Link
        href={resetUrl}
        style={{
          fontSize: "12px",
          lineHeight: "18px",
          color: solidColor,
          wordBreak: "break-all" as const,
        }}
      >
        {resetUrl}
      </Link>
      <Text style={{ margin: "20px 0 0", fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.securityNote}
      </Text>
      <FooterLegal legalFooter={brand.legalFooter} />
    </EmailLayout>
  );
};
