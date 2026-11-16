import type { CSSProperties, FC } from "react";
import { Column, Img, Row, Section, Text } from "react-email";
import type { ThemeName } from "../theme/gradient-themes.js";
import { resolveProducerMark } from "../theme/producer-mark.js";
import type { Brand } from "../theme/types.js";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface HeaderLogoProps {
  brand: Brand;
  /** The email's theme. The header doesn't use it: the producer's mark is in their own color (`brand.color`). */
  theme: ThemeName;
  /**
   * Primary line: **event** (or campaign) name for attendee-facing mail, left-aligned.
   * When omitted, the block shows producer logo/initial + `brand.brandName` only.
   */
  headline?: string;
}

const producerLogoBorderRadius = "3px";
const producerThumbSize = 16;
const producerNameGap = 3;

/** The producer's initial on a flat tile of their color, with the ink that reads on it. */
function BrandInitial({
  letter,
  size,
  background,
  ink,
  extraStyle,
}: {
  letter: string;
  size: number;
  background: string;
  ink: string;
  extraStyle?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: background,
        color: ink,
        borderRadius: producerLogoBorderRadius,
        display: "inline-block",
        textAlign: "center",
        lineHeight: `${size}px`,
        fontSize: `${Math.round(size * 0.56)}px`,
        fontWeight: 700,
        ...extraStyle,
      }}
    >
      {letter}
    </div>
  );
}

export const HeaderLogo: FC<HeaderLogoProps> = ({ brand, headline }) => {
  const text = defaultEmailThemeTokens.textColor;
  const muted = defaultEmailThemeTokens.mutedTextColor;
  // The producer's color, never the theme's (blueprint store@0.5.0, ST-EMAILS-2).
  const { background, ink } = resolveProducerMark(brand.color);

  const trimmed = headline?.trim();
  const hasHeadline = Boolean(trimmed && trimmed.length > 0);
  const initial = (brand.brandName.trim()[0] ?? "?").toUpperCase();

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
          <Row>
            <Column
              style={{
                width: `${producerThumbSize + producerNameGap}px`,
                verticalAlign: "middle" as const,
                paddingRight: `${producerNameGap}px`,
              }}
            >
              {brand.logoUrl ? (
                <Img
                  alt={brand.brandName}
                  height={producerThumbSize}
                  src={brand.logoUrl}
                  style={{ display: "block", borderRadius: producerLogoBorderRadius }}
                  width={producerThumbSize}
                />
              ) : (
                <BrandInitial
                  letter={initial}
                  size={producerThumbSize}
                  background={background}
                  ink={ink}
                  extraStyle={{ display: "block" }}
                />
              )}
            </Column>
            <Column style={{ verticalAlign: "middle" as const }}>
              <Text style={producerSublineStyle}>{brand.brandName}</Text>
            </Column>
          </Row>
        </>
      ) : (
        <>
          {brand.logoUrl ? (
            <Img
              alt={brand.brandName}
              height={32}
              src={brand.logoUrl}
              style={{
                margin: "0 0 4px",
                display: "block",
                borderRadius: producerLogoBorderRadius,
              }}
            />
          ) : (
            <BrandInitial
              letter={initial}
              size={32}
              background={background}
              ink={ink}
              extraStyle={{ margin: "0 0 4px", display: "block" }}
            />
          )}
          <Text
            style={{
              margin: 0,
              fontSize: "17px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: text,
            }}
          >
            {brand.brandName}
          </Text>
        </>
      )}
    </Section>
  );
};
