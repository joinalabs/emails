/**
 * Named themes matching the Joina platform palette.
 * Each theme maps to a CSS linear-gradient (top-right direction) and provides
 * a solid fallback color for contexts where gradients cannot be applied
 * (Outlook desktop, text/link colors).
 */

export type ThemeName =
  | "White"
  | "Peach"
  | "Snow"
  | "Wave"
  | "Rainbow"
  | "CrystalBall"
  | "Flower"
  | "World"
  | "Alien"
  | "Vulkan";

interface ThemeSpec {
  from: string;
  to: string;
  /** Solid color for links and text accents (used where gradient cannot be applied). */
  solidColor: string;
  /** Foreground color for text rendered on top of the gradient (e.g. button label). */
  onGradientText: string;
  /**
   * Border color for the button. Transparent for colored themes; set explicitly
   * for light themes (e.g. White) where the button background blends into the canvas.
   */
  borderColor?: string;
}

const themeMap: Record<ThemeName, ThemeSpec> = {
  White: {
    from: "#ffffff",
    to: "#ffffff",
    // Outlook (no CSS): white button, dark text — acceptable fallback.
    // Light/dark mode appearance is handled by a CSS class injected via EmailLayout.
    solidColor: "#ffffff",
    onGradientText: "#18181b",
  },
  Peach: { from: "#F89C3D", to: "#E44C35", solidColor: "#E44C35", onGradientText: "#ffffff" },
  Snow: { from: "#31AAC7", to: "#0E68E3", solidColor: "#0E68E3", onGradientText: "#ffffff" },
  Wave: { from: "#0A3777", to: "#0E63DF", solidColor: "#0E63DF", onGradientText: "#ffffff" },
  Rainbow: { from: "#DC71BC", to: "#725DC5", solidColor: "#725DC5", onGradientText: "#ffffff" },
  CrystalBall: { from: "#BF4F99", to: "#15346E", solidColor: "#BF4F99", onGradientText: "#ffffff" },
  Flower: { from: "#F67469", to: "#E875B9", solidColor: "#F67469", onGradientText: "#ffffff" },
  World: { from: "#5AC0C8", to: "#22875F", solidColor: "#22875F", onGradientText: "#ffffff" },
  Alien: { from: "#1C2E50", to: "#4D5C77", solidColor: "#4D5C77", onGradientText: "#ffffff" },
  Vulkan: { from: "#A62A18", to: "#46290F", solidColor: "#A62A18", onGradientText: "#ffffff" },
};

export interface ResolvedTheme {
  /** CSS `background-image` value (linear-gradient). Use alongside `solidColor` as `background-color` for Outlook. */
  backgroundImage: string;
  /** Solid fallback for `background-color` (Outlook) and for link / text accent `color`. */
  solidColor: string;
  /** Text color to use on top of the gradient background (e.g. button label). */
  onGradientText: string;
  /** Border color for buttons on light themes; `"transparent"` for colored themes. */
  borderColor: string;
}

export function resolveTheme(name: ThemeName): ResolvedTheme {
  const { from, to, solidColor, onGradientText, borderColor } = themeMap[name];
  return {
    backgroundImage: `linear-gradient(to top right, ${from}, ${to})`,
    solidColor,
    onGradientText,
    borderColor: borderColor ?? "transparent",
  };
}
