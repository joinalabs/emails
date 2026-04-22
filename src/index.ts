export {
  type BuildTicketIngressoDetailRowsInput,
  buildTicketIngressoDetailRows,
  EmailDetailList,
  type EmailDetailListProps,
  type EmailDetailRow,
  EmailLayout,
  type EmailLayoutProps,
  FooterLegal,
  type FooterLegalProps,
  HeaderLogo,
  type HeaderLogoProps,
  PrimaryButton,
  type PrimaryButtonProps,
  type TicketFareKind,
  type TicketIngressoDetailLabels,
  type TicketIngressoFareLabels,
} from "./components/index.js";
export * as backoffice from "./namespaces/backoffice/index.js";
export * as event from "./namespaces/event/index.js";
export { render } from "./render.js";

export type { ResolvedTheme, ThemeName } from "./theme/gradient-themes.js";
export { resolveTheme } from "./theme/gradient-themes.js";
export type { Brand } from "./theme/types.js";
export { defaultEmailThemeTokens } from "./theme/types.js";
