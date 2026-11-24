import type { WorkflowMessageProps } from "../../../templates/namespaces/event/WorkflowMessage/index.js";
import { WorkflowMessage } from "../../../templates/namespaces/event/WorkflowMessage/index.js";
import { previewBrand } from "../../_fixtures.js";

const previewProps = {
  theme: "White",
  brand: previewBrand,
  subject: "Obrigado por vir ao Show ao vivo",
  headline: "Show ao vivo",
  bodyHtml:
    '<p>Oi, Ana!</p><p>Foi muito bom ter você com a gente. As fotos já estão no <a href="https://example.com">nosso Instagram</a>.</p><p>Até a próxima!</p>',
  unsubscribeUrl: "https://api.joina.cc/unsubscribe?token=preview",
} satisfies WorkflowMessageProps;

function Email(props: WorkflowMessageProps) {
  return <WorkflowMessage {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
