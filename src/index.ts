export {
  type BuildTicketIngressoDetailRowsInput,
  buildEventInviteIcs,
  buildTicketIngressoDetailRows,
  EmailDetailList,
  type EmailDetailListProps,
  type EmailDetailRow,
  EmailLayout,
  type EmailLayoutProps,
  type EventInviteIcsInput,
  FooterLegal,
  type FooterLegalProps,
  HeaderLogo,
  type HeaderLogoProps,
  type IcsAttendee,
  type IcsEventStatus,
  type IcsMethod,
  type IcsParticipant,
  PrimaryButton,
  type PrimaryButtonProps,
  type TicketFareKind,
  type TicketIngressoDetailLabels,
  type TicketIngressoFareLabels,
} from "./components/index.js";
export { render } from "./render.js";
export * as backoffice from "./templates/namespaces/backoffice/index.js";
export * as event from "./templates/namespaces/event/index.js";

export type { ResolvedTheme, ThemeName } from "./theme/gradient-themes.js";
export { resolveTheme } from "./theme/gradient-themes.js";
export type { Brand } from "./theme/types.js";
export { defaultEmailThemeTokens } from "./theme/types.js";
