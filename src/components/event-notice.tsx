import type { FC } from "react";
import { Text } from "react-email";
import type { ThemeName } from "../theme/gradient-themes.js";
import type { Brand } from "../theme/types.js";
import { defaultEmailThemeTokens } from "../theme/types.js";
import { EmailLayout } from "./email-layout.js";
import { FooterLegal } from "./footer-legal.js";
import { HeaderLogo } from "./header-logo.js";
import { PrimaryButton } from "./primary-button.js";

export interface EventNoticeProps {
  theme: ThemeName;
  brand: Brand;
  eventName: string;
  previewText: string;
  title: string;
  intro: string;
  ctaLabel: string;
  ctaUrl: string;
}

/** A short event e-mail: the event's header, a title, one paragraph and a button. */
export const EventNotice: FC<EventNoticeProps> = ({
  theme,
  brand,
  eventName,
  previewText,
  title,
  intro,
  ctaLabel,
  ctaUrl,
}) => (
  <EmailLayout previewText={previewText}>
    <HeaderLogo brand={brand} theme={theme} headline={eventName} />
    <Text style={{ margin: "0 0 16px", fontSize: "20px", fontWeight: 600, textAlign: "left" }}>
      {title}
    </Text>
    <Text
      style={{
        margin: "0 0 20px",
        fontSize: "14px",
        lineHeight: "22px",
        color: defaultEmailThemeTokens.mutedTextColor,
        textAlign: "left",
      }}
    >
      {intro}
    </Text>
    <PrimaryButton href={ctaUrl} label={ctaLabel} theme={theme} />
    <FooterLegal legalFooter={brand.legalFooter} supportEmail={brand.supportEmail} />
  </EmailLayout>
);
