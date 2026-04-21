export type { EventMagicLinkCopy, EventMagicLinkProps } from "./EventMagicLink.js";
export { EventMagicLink } from "./EventMagicLink.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { EventMagicLinkProps } from "./EventMagicLink.js";
import { EventMagicLink } from "./EventMagicLink.js";

const previewProps = {
  theme: previewTheme,
  magicLinkUrl: "https://example.com/auth/magic?token=preview_token",
  eventOrBrandName: "Show ao vivo",
} satisfies EventMagicLinkProps;

function Email(props: EventMagicLinkProps) {
  return <EventMagicLink {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
