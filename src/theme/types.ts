/** Producer / platform identity passed to every template. */
export interface Brand {
  /** Producer or platform name; shown in the header (and as fallback when `logoUrl` is absent). */
  brandName: string;
  /** Producer logo URL (HTTPS). When absent the header shows the initial on a tile of `color`. */
  logoUrl?: string;
  /**
   * The producer's own color (their space's, `#rrggbb`): the tile behind the initial when there is no logo. Never the
   * theme's: the theme colors the rest of the email. Without it the tile is Joina's default primary.
   */
  color?: string;
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
