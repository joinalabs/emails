export type {
  ProducerFirstAccountInviteCopy,
  ProducerFirstAccountInviteProps,
} from "./ProducerFirstAccountInvite.js";
export { ProducerFirstAccountInvite } from "./ProducerFirstAccountInvite.js";

import { previewTheme } from "../../_preview-fixtures.js";
import type { ProducerFirstAccountInviteProps } from "./ProducerFirstAccountInvite.js";
import { ProducerFirstAccountInvite } from "./ProducerFirstAccountInvite.js";

const previewProps = {
  theme: previewTheme,
  inviteUrl: "https://example.com/backoffice/primeiro-acesso?token=preview",
  organizationOrProducerName: "Produtora Example",
  inviteeEmail: "contato@produtora.example",
} satisfies ProducerFirstAccountInviteProps;

function Email(props: ProducerFirstAccountInviteProps) {
  return <ProducerFirstAccountInvite {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
