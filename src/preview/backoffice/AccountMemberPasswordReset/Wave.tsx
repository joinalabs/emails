import type { AccountMemberPasswordResetProps } from "../../../templates/namespaces/backoffice/AccountMemberPasswordReset/index.js";
import { AccountMemberPasswordReset } from "../../../templates/namespaces/backoffice/AccountMemberPasswordReset/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Wave",
  brand: previewBrand,
  resetUrl: "https://example.com/backoffice/redefinir?token=preview",
} satisfies AccountMemberPasswordResetProps;

function Email(props: AccountMemberPasswordResetProps) {
  return <AccountMemberPasswordReset {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
