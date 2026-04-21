export type {
  AccountMemberPasswordResetCopy,
  AccountMemberPasswordResetProps,
} from "./AccountMemberPasswordReset.js";
export { AccountMemberPasswordReset } from "./AccountMemberPasswordReset.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { AccountMemberPasswordResetProps } from "./AccountMemberPasswordReset.js";
import { AccountMemberPasswordReset } from "./AccountMemberPasswordReset.js";

const previewProps = {
  theme: previewTheme,
  resetUrl: "https://example.com/backoffice/redefinir?token=preview",
} satisfies AccountMemberPasswordResetProps;

function Email(props: AccountMemberPasswordResetProps) {
  return <AccountMemberPasswordReset {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
