/**
 * The producer's mark: the tile behind their initial, in their own color (their space's), never the email theme's.
 * Mirrors the design system (`@joinalabs/bastidor`'s `ProducerHeader`): the ink is white or black, whichever reads on
 * the tile, decided by the color's OKLCH lightness (white under 0.68, black from it).
 */

/** Joina's default primary (`oklch(0.452 0.241 296)`), the tile of a producer with no color saved. */
export const joinaPrimaryColor = "#690bc8";

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

/** The color as `#rrggbb`, or `undefined` when it isn't a hex color. */
function normalizeHex(value: string | undefined): string | undefined {
  const match = value?.trim().match(HEX);
  if (!match) return undefined;
  const digits = match[1].length === 3 ? [...match[1]].map((d) => d + d).join("") : match[1];
  return `#${digits.toLowerCase()}`;
}

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);

/** OKLCH lightness of a `#rrggbb` color (Björn Ottosson's OKLab). */
export function oklchLightness(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(Number.parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
}

export interface ProducerMarkColors {
  /** The tile: the producer's color, or Joina's primary without one. */
  background: string;
  /** The initial on it: white or black, whichever reads. */
  ink: string;
}

/** The tile and ink for a producer's color (`Brand.color`); Joina's primary when it is missing or not a hex color. */
export function resolveProducerMark(color: string | undefined): ProducerMarkColors {
  const background = normalizeHex(color) ?? joinaPrimaryColor;
  return { background, ink: oklchLightness(background) < 0.68 ? "#ffffff" : "#000000" };
}
