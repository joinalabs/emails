import type { FC } from "react";
import { Hr, Link, Section, Text } from "react-email";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface FooterLegalProps {
  legalFooter?: string;
  /** Support address; renders "{supportLead} {supportEmail}." as a `mailto:` link. */
  supportEmail?: string;
  /** Text before the address. Defaults to the pt-BR copy. */
  supportLead?: string;
}

const defaultSupportLead = "Precisa de ajuda? Responda este e-mail ou escreva para";

const footerTextStyle = {
  margin: 0,
  fontSize: "11px",
  lineHeight: "16px",
  color: defaultEmailThemeTokens.mutedTextColor,
} as const;

export const FooterLegal: FC<FooterLegalProps> = ({
  legalFooter,
  supportEmail,
  supportLead = defaultSupportLead,
}) => {
  if (!legalFooter && !supportEmail) {
    return null;
  }

  return (
    <Section style={{ marginTop: "28px" }}>
      <Hr style={{ borderColor: defaultEmailThemeTokens.borderColor, margin: "0 0 16px" }} />
      {supportEmail ? (
        <Text style={{ ...footerTextStyle, marginBottom: legalFooter ? "8px" : 0 }}>
          {supportLead}{" "}
          <Link
            href={`mailto:${supportEmail}`}
            style={{ color: defaultEmailThemeTokens.mutedTextColor, textDecoration: "underline" }}
          >
            {supportEmail}
          </Link>
          .
        </Text>
      ) : null}
      {legalFooter ? <Text style={footerTextStyle}>{legalFooter}</Text> : null}
    </Section>
  );
};
