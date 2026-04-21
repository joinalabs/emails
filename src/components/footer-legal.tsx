import type { FC } from "react";
import { Hr, Section, Text } from "react-email";
import type { EmailTheme } from "../theme/types.js";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface FooterLegalProps {
  theme: EmailTheme;
}

export const FooterLegal: FC<FooterLegalProps> = ({ theme }) => {
  if (!theme.legalFooter) {
    return null;
  }

  const muted = theme.mutedTextColor ?? defaultEmailThemeTokens.mutedTextColor;

  return (
    <Section style={{ marginTop: "28px" }}>
      <Hr style={{ borderColor: defaultEmailThemeTokens.borderColor, margin: "0 0 16px" }} />
      <Text
        style={{
          margin: 0,
          fontSize: "11px",
          lineHeight: "16px",
          color: muted,
        }}
      >
        {theme.legalFooter}
      </Text>
    </Section>
  );
};
