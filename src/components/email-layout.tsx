import type { FC, ReactNode } from "react";
import { Body, Container, Head, Html, Preview } from "react-email";
import type { EmailTheme } from "../theme/types.js";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface EmailLayoutProps {
  theme: EmailTheme;
  previewText: string;
  children: ReactNode;
}

const fontStack = (theme: EmailTheme) => theme.fontFamily ?? defaultEmailThemeTokens.fontStack;

export const EmailLayout: FC<EmailLayoutProps> = ({ theme, previewText, children }) => {
  const surface = theme.surfaceColor ?? defaultEmailThemeTokens.surfaceColor;
  const text = theme.textColor ?? defaultEmailThemeTokens.textColor;
  const canvas = defaultEmailThemeTokens.canvasBackground;

  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>{previewText}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "24px 12px",
          backgroundColor: canvas,
          fontFamily: fontStack(theme),
          color: text,
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: surface,
            borderRadius: "8px",
            border: `1px solid ${defaultEmailThemeTokens.borderColor}`,
            padding: "24px 20px",
          }}
        >
          {children}
        </Container>
      </Body>
    </Html>
  );
};
