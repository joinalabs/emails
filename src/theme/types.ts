/**
 * Whitelabel theme tokens passed from the API for every template.
 * Visual decisions mirror HeroUI-style neutrals + brand primary.
 */
export interface EmailTheme {
  /** Primary brand color (buttons, links, accents). */
  primaryColor: string;
  /** Producer or platform name; with `HeaderLogo`, shown as the producer line (and as the main title when there is no `headline`). */
  brandName: string;
  /** Producer logo: large above the title when there is no `headline`; small “icon” beside `brandName` when `headline` is set (attendee mail). */
  logoUrl?: string;
  /** Font stack for clients that honor `fontFamily` (always pair with web-safe fallbacks in layout). */
  fontFamily?: string;
  /** Small print / legal block below the footer line. */
  legalFooter?: string;
  /** Card / surface background (default applied in layout if omitted). */
  surfaceColor?: string;
  /** Main body text color. */
  textColor?: string;
  /** Secondary text (hints, table headers). */
  mutedTextColor?: string;
}

export const defaultEmailThemeTokens = {
  canvasBackground: "#fafafa",
  surfaceColor: "#ffffff",
  textColor: "#18181b",
  mutedTextColor: "#71717a",
  borderColor: "#e4e4e7",
  fontStack: 'system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;
