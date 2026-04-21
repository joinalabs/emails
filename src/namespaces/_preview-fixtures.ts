import type { EmailTheme } from "../theme/types.js";
import { previewQrPlaceholderSrc } from "./_preview-qr-placeholder.js";

export const previewProducerLogoUrl = "https://placehold.co/40x40/006fee/ffffff/png?text=P";

export const previewTheme = {
  primaryColor: "#006FEE",
  brandName: "Produtora Example",
  logoUrl: previewProducerLogoUrl,
} satisfies EmailTheme;

export const placeholderQrSrc = previewQrPlaceholderSrc;
