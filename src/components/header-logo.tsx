import type { FC } from "react";
import { Column, Img, Row, Section, Text } from "react-email";
import type { EmailTheme } from "../theme/types.js";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface HeaderLogoProps {
  theme: EmailTheme;
  /**
   * Primary line: **event** (or campaign) name for attendee-facing mail, left-aligned.
   * When omitted, the block shows producer `logoUrl` (if any) + `theme.brandName` only.
   */
  headline?: string;
}

/** Producer logo rounding: same for thumb (event mail) and header logo (admin / receipt). */
const producerLogoBorderRadius = "3px";

/** Producer “icon” beside name when `headline` is set (attendee mail). */
const producerThumbSize = 16;
const producerNameGap = 3;

export const HeaderLogo: FC<HeaderLogoProps> = ({ theme, headline }) => {
  const text = theme.textColor ?? defaultEmailThemeTokens.textColor;
  const muted = theme.mutedTextColor ?? defaultEmailThemeTokens.mutedTextColor;
  const trimmed = headline?.trim();
  const hasHeadline = Boolean(trimmed && trimmed.length > 0);

  const producerSublineStyle = {
    margin: 0,
    fontSize: "11px",
    lineHeight: "16px",
    color: muted,
  } as const;

  return (
    <Section style={{ marginBottom: "32px", textAlign: "left" }}>
      {hasHeadline ? (
        <>
          <Text
            style={{
              margin: "0 0 6px",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: text,
            }}
          >
            {trimmed}
          </Text>
          {theme.logoUrl ? (
            <Row>
              <Column
                style={{
                  width: `${producerThumbSize + producerNameGap}px`,
                  verticalAlign: "middle" as const,
                  paddingRight: `${producerNameGap}px`,
                }}
              >
                <Img
                  alt={theme.brandName}
                  height={producerThumbSize}
                  src={theme.logoUrl}
                  style={{ display: "block", borderRadius: producerLogoBorderRadius }}
                  width={producerThumbSize}
                />
              </Column>
              <Column style={{ verticalAlign: "middle" as const }}>
                <Text style={producerSublineStyle}>{theme.brandName}</Text>
              </Column>
            </Row>
          ) : (
            <Text style={producerSublineStyle}>{theme.brandName}</Text>
          )}
        </>
      ) : (
        <>
          {theme.logoUrl ? (
            <Img
              alt={theme.brandName}
              height={32}
              src={theme.logoUrl}
              style={{
                margin: "0 0 4px",
                display: "block",
                borderRadius: producerLogoBorderRadius,
              }}
            />
          ) : null}
          <Text
            style={{
              margin: 0,
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: text,
            }}
          >
            {theme.brandName}
          </Text>
        </>
      )}
    </Section>
  );
};
