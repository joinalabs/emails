import type { Brand } from "../theme/types.js";

export const previewBrand: Brand = {
  brandName: "Produtora Example",
  logoUrl: "https://placehold.co/40x40/0E68E3/ffffff/png?text=P",
};

export const previewBrandNoLogo: Brand = {
  brandName: "Produtora Example",
};

/** A producer with a color in their space and no logo: the mark keeps their teal under any theme. */
export const previewBrandProducerColor: Brand = {
  brandName: "Produtora Example",
  color: "#036262",
};

export const placeholderQrSrc =
  "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=JoinaPreview&margin=4&format=png";
