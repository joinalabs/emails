import type { FC } from "react";
import { Hr, Link, Text } from "react-email";
import { EmailLayout } from "../../../../components/email-layout.js";
import { HeaderLogo } from "../../../../components/header-logo.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { ProducerMarkColors } from "../../../../theme/producer-mark.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface WorkflowMessageCopy {
  /** "Você recebeu este e-mail de {producer}, enviado pela Joina." */
  sentBy?: string;
  /** "Não quer mais receber mensagens de {producer}?" */
  noMore?: string;
  unsubscribe?: string;
}

export interface WorkflowMessageProps {
  theme: ThemeName;
  brand: Brand;
  subject: string;
  /** The event's name, or the producer's when the workflow has no event. */
  headline: string;
  /** The producer's message, already rendered to HTML from their Markdown (escaped by whoever renders it). */
  bodyHtml: string;
  /** Required: no workflow e-mail leaves without its way out. */
  unsubscribeUrl: string;
  /** The mark's initial and colors, when they are resolved elsewhere (the worker's Go template). */
  initial?: string;
  mark?: ProducerMarkColors;
  copy?: WorkflowMessageCopy;
}

/**
 * A workflow's "Enviar e-mail" (blueprint emails@0.1.0): the producer's message under their mark, with Joina's footer
 * and the unsubscribe link. The worker renders it in Go from `exports/workflow-message.html`.
 */
export const WorkflowMessage: FC<WorkflowMessageProps> = ({
  theme,
  brand,
  subject,
  headline,
  bodyHtml,
  unsubscribeUrl,
  initial,
  mark,
  copy,
}) => {
  const producer = brand.brandName;
  const c = {
    sentBy: `Você recebeu este e-mail de ${producer}, enviado pela Joina.`,
    noMore: `Não quer mais receber mensagens de ${producer}?`,
    unsubscribe: "Descadastrar",
    ...copy,
  };
  const muted = defaultEmailThemeTokens.mutedTextColor;
  return (
    <EmailLayout previewText={subject}>
      <HeaderLogo brand={brand} theme={theme} headline={headline} initial={initial} mark={mark} />
      <div
        style={{ fontSize: "15px", lineHeight: "24px", color: defaultEmailThemeTokens.textColor }}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: the producer's Markdown, rendered and escaped upstream.
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      <Hr style={{ borderColor: "#e5e5e5", margin: "32px 0 16px" }} />
      <Text style={{ margin: 0, fontSize: "12px", lineHeight: "18px", color: muted }}>
        {c.sentBy}
        <br />
        {c.noMore}{" "}
        <Link href={unsubscribeUrl} style={{ color: muted, textDecoration: "underline" }}>
          {c.unsubscribe}
        </Link>
      </Text>
    </EmailLayout>
  );
};
