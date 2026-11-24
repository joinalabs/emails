import type { FC } from "react";
import { EventNotice } from "../../../../components/event-notice.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";

export interface EventAnnouncementCopy {
  previewText?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
}

export interface EventAnnouncementProps {
  theme: ThemeName;
  brand: Brand;
  eventName: string;
  /** The event's page in the store. */
  eventUrl: string;
  copy?: EventAnnouncementCopy;
}

/** News about an event's tickets (blueprint emails@0.1.0). */
export const EventAnnouncement: FC<EventAnnouncementProps> = ({
  theme,
  brand,
  eventName,
  eventUrl,
  copy,
}) => {
  const c = {
    previewText: `${eventName} - Novidade no evento`,
    title: "Novidade no evento",
    intro: `Confira as novidades sobre os ingressos de ${eventName}.`,
    ctaLabel: "Ver o evento",
    ...copy,
  };
  return <EventNotice theme={theme} brand={brand} eventName={eventName} ctaUrl={eventUrl} {...c} />;
};
