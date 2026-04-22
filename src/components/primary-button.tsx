import type { FC } from "react";
import { Button, Section } from "react-email";
import { resolveTheme, type ThemeName } from "../theme/gradient-themes.js";

export interface PrimaryButtonProps {
  theme: ThemeName;
  href: string;
  label: string;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ theme, href, label }) => {
  const { backgroundImage, solidColor, onGradientText, borderColor } = resolveTheme(theme);
  return (
    <Section style={{ textAlign: "center", margin: "24px 0" }}>
      <Button
        href={href}
        style={{
          backgroundColor: solidColor,
          backgroundImage,
          color: onGradientText,
          border: `1px solid ${borderColor}`,
          borderRadius: "10px",
          fontWeight: 600,
          fontSize: "14px",
          lineHeight: "20px",
          padding: "10px 20px",
          textDecoration: "none",
          display: "inline-block",
        }}
      >
        {label}
      </Button>
    </Section>
  );
};
