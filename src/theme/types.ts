/** Producer / platform identity passed to every template. */
export interface Brand {
  /** Producer or platform name; shown in the header (and as fallback when `logoUrl` is absent). */
  brandName: string;
  /** Producer logo URL (HTTPS). When absent the brand name is rendered as text. */
  logoUrl?: string;
  /** Short legal text rendered below the footer line. */
  legalFooter?: string;
}

export const defaultEmailThemeTokens = {
  canvasBackground: "#fafafa",
  surfaceColor: "#ffffff",
  textColor: "#18181b",
  mutedTextColor: "#71717a",
  borderColor: "#e4e4e7",
  fontStack: 'system-ui, -apple-system, "Segoe UI", sans-serif',
} as const;
