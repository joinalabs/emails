import { Button, Section } from "@react-email/components";
import type { FC } from "react";
import type { EmailTheme } from "../theme/types.js";

export interface PrimaryButtonProps {
  theme: EmailTheme;
  href: string;
  label: string;
}

export const PrimaryButton: FC<PrimaryButtonProps> = ({ theme, href, label }) => {
  return (
    <Section style={{ textAlign: "center", margin: "24px 0" }}>
      <Button
        href={href}
        style={{
          backgroundColor: theme.primaryColor,
          color: "#ffffff",
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
