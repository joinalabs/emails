import type { ThemeName } from "../theme/gradient-themes.js";
import type { Brand } from "../theme/types.js";
import { previewQrPlaceholderSrc } from "./_preview-qr-placeholder.js";

export const previewProducerLogoUrl = "https://placehold.co/40x40/0E68E3/ffffff/png?text=P";

export const previewBrand: Brand = {
  brandName: "Produtora Example",
  logoUrl: previewProducerLogoUrl,
};

export const previewThemeName: ThemeName = "Snow";

export const placeholderQrSrc = previewQrPlaceholderSrc;
