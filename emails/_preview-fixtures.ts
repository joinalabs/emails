import type { EmailTheme } from "../src/theme/types.js";
import { previewQrPlaceholderSrc } from "./preview-qr-placeholder.js";

/** Shared props for React Email `PreviewProps` in dev — not part of the public package API. */
/** Example producer logo for local preview (optional `logoUrl` from API). */
export const previewProducerLogoUrl = "https://placehold.co/40x40/006fee/ffffff/png?text=P";

export const previewTheme = {
  primaryColor: "#006FEE",
  brandName: "Produtora Example",
  logoUrl: previewProducerLogoUrl,
} satisfies EmailTheme;

export const placeholderQrSrc = previewQrPlaceholderSrc;
