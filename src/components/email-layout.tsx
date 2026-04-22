import type { FC, ReactNode } from "react";
import { Body, Container, Head, Html, Preview } from "react-email";
import type { ThemeName } from "../theme/gradient-themes.js";
import { defaultEmailThemeTokens } from "../theme/types.js";

const WHITE_THEME_STYLES = `
  .joina-btn-white {
    background-color: #18181b !important;
    background-image: none !important;
    color: #ffffff !important;
    border-color: transparent !important;
  }
  @media (prefers-color-scheme: dark) {
    .joina-btn-white {
      background-color: #ffffff !important;
      background-image: none !important;
      color: #18181b !important;
      border-color: transparent !important;
    }
  }
`.trim();

export interface EmailLayoutProps {
  previewText: string;
  /** Pass the template theme so EmailLayout can inject CSS for adaptive themes (e.g. White). */
  theme?: ThemeName;
  children: ReactNode;
}

export const EmailLayout: FC<EmailLayoutProps> = ({ previewText, theme, children }) => {
  return (
    <Html lang="pt-BR">
      <Head>{theme === "White" && <style>{WHITE_THEME_STYLES}</style>}</Head>
      <Preview>{previewText}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "24px 12px",
          backgroundColor: defaultEmailThemeTokens.canvasBackground,
          fontFamily: defaultEmailThemeTokens.fontStack,
          color: defaultEmailThemeTokens.textColor,
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: defaultEmailThemeTokens.surfaceColor,
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
