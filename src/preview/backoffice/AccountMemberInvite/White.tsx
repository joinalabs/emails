import type { AccountMemberInviteProps } from "../../../templates/namespaces/backoffice/AccountMemberInvite/index.js";
import { AccountMemberInvite } from "../../../templates/namespaces/backoffice/AccountMemberInvite/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "White",
  brand: previewBrand,
  inviteUrl: "https://example.com/backoffice/convite?token=preview",
  organizationOrProducerName: "Produtora Example",
  inviteeEmail: "novo.membro@example.com",
  inviterName: "João Admin",
} satisfies AccountMemberInviteProps;

function Email(props: AccountMemberInviteProps) {
  return <AccountMemberInvite {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
