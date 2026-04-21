export type {
  ProducerPasswordResetCopy,
  ProducerPasswordResetProps,
} from "./ProducerPasswordReset.js";
export { ProducerPasswordReset } from "./ProducerPasswordReset.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { ProducerPasswordResetProps } from "./ProducerPasswordReset.js";
import { ProducerPasswordReset } from "./ProducerPasswordReset.js";

const previewProps = {
  theme: previewTheme,
  resetUrl: "https://example.com/backoffice/redefinir?token=preview",
} satisfies ProducerPasswordResetProps;

function Email(props: ProducerPasswordResetProps) {
  return <ProducerPasswordReset {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
