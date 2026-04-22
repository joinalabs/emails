import type { CustomerAuthMagicLinkProps } from "../../../templates/namespaces/event/CustomerAuthMagicLink/index.js";
import { CustomerAuthMagicLink } from "../../../templates/namespaces/event/CustomerAuthMagicLink/index.js";
import { previewBrandNoLogo } from "../../_fixtures.js";

const previewProps = {
  theme: "Snow",
  brand: previewBrandNoLogo,
  magicLinkUrl: "https://example.com/auth/magic?token=preview_token",
  eventOrBrandName: "Show ao vivo",
} satisfies CustomerAuthMagicLinkProps;

function Email(props: CustomerAuthMagicLinkProps) {
  return <CustomerAuthMagicLink {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
