import type { FC } from "react";
import { Hr, Section, Text } from "react-email";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface FooterLegalProps {
  legalFooter?: string;
}

export const FooterLegal: FC<FooterLegalProps> = ({ legalFooter }) => {
  if (!legalFooter) {
    return null;
  }

  return (
    <Section style={{ marginTop: "28px" }}>
      <Hr style={{ borderColor: defaultEmailThemeTokens.borderColor, margin: "0 0 16px" }} />
      <Text
        style={{
          margin: 0,
          fontSize: "11px",
          lineHeight: "16px",
          color: defaultEmailThemeTokens.mutedTextColor,
        }}
      >
        {legalFooter}
      </Text>
    </Section>
  );
};
