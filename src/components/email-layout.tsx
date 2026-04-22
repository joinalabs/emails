import type { FC, ReactNode } from "react";
import { Body, Container, Head, Html, Preview } from "react-email";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface EmailLayoutProps {
  previewText: string;
  children: ReactNode;
}

export const EmailLayout: FC<EmailLayoutProps> = ({ previewText, children }) => {
  return (
    <Html lang="pt-BR">
      <Head />
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
