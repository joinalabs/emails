export type { AccountInviteCopy, AccountInviteProps } from "./AccountInvite.js";
export { AccountInvite } from "./AccountInvite.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { AccountInviteProps } from "./AccountInvite.js";
import { AccountInvite } from "./AccountInvite.js";

const previewProps = {
  theme: previewTheme,
  inviteUrl: "https://example.com/backoffice/primeiro-acesso?token=preview",
  organizationOrProducerName: "Produtora Example",
  inviteeEmail: "contato@produtora.example",
} satisfies AccountInviteProps;

function Email(props: AccountInviteProps) {
  return <AccountInvite {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
