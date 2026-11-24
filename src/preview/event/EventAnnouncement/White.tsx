import type { EventAnnouncementProps } from "../../../templates/namespaces/event/EventAnnouncement/index.js";
import { EventAnnouncement } from "../../../templates/namespaces/event/EventAnnouncement/index.js";
import { previewBrandProducerColor } from "../../_fixtures.js";

const previewProps = {
  theme: "White",
  brand: previewBrandProducerColor,
  eventName: "Show ao vivo",
  eventUrl: "https://loja.joina.cc/show-ao-vivo",
} satisfies EventAnnouncementProps;

function Email(props: EventAnnouncementProps) {
  return <EventAnnouncement {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
