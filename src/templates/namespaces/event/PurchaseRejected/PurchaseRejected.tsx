import type { FC } from "react";
import { EventNotice } from "../../../../components/event-notice.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";

export interface PurchaseRejectedCopy {
  /** "{event} - Compra não confirmada": the subject the API sets, also the preview text. */
  previewText?: string;
  title?: string;
  intro?: string;
  ctaLabel?: string;
}

export interface PurchaseRejectedProps {
  theme: ThemeName;
  brand: Brand;
  eventName: string;
  /** The event's page in the store. */
  eventUrl: string;
  copy?: PurchaseRejectedCopy;
}

/** The payment of a purchase was refused (blueprint emails@0.1.0): nothing was charged, try again. */
export const PurchaseRejected: FC<PurchaseRejectedProps> = ({
  theme,
  brand,
  eventName,
  eventUrl,
  copy,
}) => {
  const c = {
    previewText: `${eventName} - Compra não confirmada`,
    title: "Compra não confirmada",
    intro:
      "Não conseguimos confirmar o pagamento da sua compra, e nada foi cobrado. Você pode tentar de novo na página do evento.",
    ctaLabel: "Abrir página do evento",
    ...copy,
  };
  return <EventNotice theme={theme} brand={brand} eventName={eventName} ctaUrl={eventUrl} {...c} />;
};
