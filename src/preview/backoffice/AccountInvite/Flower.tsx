import type { AccountInviteProps } from "../../../templates/namespaces/backoffice/AccountInvite/index.js";
import { AccountInvite } from "../../../templates/namespaces/backoffice/AccountInvite/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "Flower",
  brand: previewBrand,
  inviteUrl: "https://example.com/backoffice/primeiro-acesso?token=preview",
  inviteeEmail: "contato@produtora.example",
} satisfies AccountInviteProps;

function Email(props: AccountInviteProps) {
  return <AccountInvite {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
