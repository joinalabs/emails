export type {
  CustomerAuthMagicLinkCopy,
  CustomerAuthMagicLinkProps,
} from "./CustomerAuthMagicLink.js";
export { CustomerAuthMagicLink } from "./CustomerAuthMagicLink.js";

import { previewBrand, previewThemeName } from "../../_preview-fixtures.js";
import type { CustomerAuthMagicLinkProps } from "./CustomerAuthMagicLink.js";
import { CustomerAuthMagicLink } from "./CustomerAuthMagicLink.js";

const previewProps = {
  theme: previewThemeName,
  brand: previewBrand,
  magicLinkUrl: "https://example.com/auth/magic?token=preview_token",
  eventOrBrandName: "Show ao vivo",
} satisfies CustomerAuthMagicLinkProps;

function Email(props: CustomerAuthMagicLinkProps) {
  return <CustomerAuthMagicLink {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
