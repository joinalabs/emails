export type { ProducerInviteCopy, ProducerInviteProps } from "./ProducerInvite.js";
export { ProducerInvite } from "./ProducerInvite.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { ProducerInviteProps } from "./ProducerInvite.js";
import { ProducerInvite } from "./ProducerInvite.js";

const previewProps = {
  theme: previewTheme,
  inviteUrl: "https://example.com/backoffice/convite?token=preview",
  organizationOrProducerName: "Produtora Example",
  inviteeEmail: "novo.membro@example.com",
  inviterName: "João Admin",
} satisfies ProducerInviteProps;

function Email(props: ProducerInviteProps) {
  return <ProducerInvite {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
