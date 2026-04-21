export type { AccountMemberInviteCopy, AccountMemberInviteProps } from "./AccountMemberInvite.js";
export { AccountMemberInvite } from "./AccountMemberInvite.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { AccountMemberInviteProps } from "./AccountMemberInvite.js";
import { AccountMemberInvite } from "./AccountMemberInvite.js";

const previewProps = {
  theme: previewTheme,
  inviteUrl: "https://example.com/backoffice/convite?token=preview",
  organizationOrProducerName: "Produtora Example",
  inviteeEmail: "novo.membro@example.com",
  inviterName: "João Admin",
} satisfies AccountMemberInviteProps;

function Email(props: AccountMemberInviteProps) {
  return <AccountMemberInvite {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
