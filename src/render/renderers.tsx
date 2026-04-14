import { render } from "@react-email/render";
import type { ReactElement } from "react";
import type { CourtesyTicketEmailProps } from "../../emails/courtesy-ticket.js";
import { CourtesyTicketEmail } from "../../emails/courtesy-ticket.js";
import type { CourtesyTicketQrEmailProps } from "../../emails/courtesy-ticket-qr.js";
import { CourtesyTicketQrEmail } from "../../emails/courtesy-ticket-qr.js";
import type { EventMagicLinkEmailProps } from "../../emails/event-magic-link.js";
import { EventMagicLinkEmail } from "../../emails/event-magic-link.js";
import type { ProducerFirstAccountInviteEmailProps } from "../../emails/producer-first-account-invite.js";
import { ProducerFirstAccountInviteEmail } from "../../emails/producer-first-account-invite.js";
import type { ProducerInviteEmailProps } from "../../emails/producer-invite.js";
import { ProducerInviteEmail } from "../../emails/producer-invite.js";
import type { ProducerPasswordResetEmailProps } from "../../emails/producer-password-reset.js";
import { ProducerPasswordResetEmail } from "../../emails/producer-password-reset.js";
import type { TicketPortalEmailProps } from "../../emails/ticket-portal.js";
import { TicketPortalEmail } from "../../emails/ticket-portal.js";
import type { TicketPurchaseReceiptEmailProps } from "../../emails/ticket-purchase-receipt.js";
import { TicketPurchaseReceiptEmail } from "../../emails/ticket-purchase-receipt.js";
import type { TicketQrCodeEmailProps } from "../../emails/ticket-qr.js";
import { TicketQrCodeEmail } from "../../emails/ticket-qr.js";

async function renderEmail(element: ReactElement): Promise<string> {
  return render(element);
}

export async function renderTicketPurchaseReceiptHtml(
  props: TicketPurchaseReceiptEmailProps,
): Promise<string> {
  return renderEmail(<TicketPurchaseReceiptEmail {...props} />);
}

export async function renderTicketQrCodeHtml(props: TicketQrCodeEmailProps): Promise<string> {
  return renderEmail(<TicketQrCodeEmail {...props} />);
}

export async function renderTicketPortalHtml(props: TicketPortalEmailProps): Promise<string> {
  return renderEmail(<TicketPortalEmail {...props} />);
}

export async function renderEventMagicLinkHtml(props: EventMagicLinkEmailProps): Promise<string> {
  return renderEmail(<EventMagicLinkEmail {...props} />);
}

export async function renderCourtesyTicketHtml(props: CourtesyTicketEmailProps): Promise<string> {
  return renderEmail(<CourtesyTicketEmail {...props} />);
}

export async function renderCourtesyTicketQrHtml(
  props: CourtesyTicketQrEmailProps,
): Promise<string> {
  return renderEmail(<CourtesyTicketQrEmail {...props} />);
}

export async function renderProducerInviteHtml(props: ProducerInviteEmailProps): Promise<string> {
  return renderEmail(<ProducerInviteEmail {...props} />);
}

export async function renderProducerFirstAccountInviteHtml(
  props: ProducerFirstAccountInviteEmailProps,
): Promise<string> {
  return renderEmail(<ProducerFirstAccountInviteEmail {...props} />);
}

export async function renderProducerPasswordResetHtml(
  props: ProducerPasswordResetEmailProps,
): Promise<string> {
  return renderEmail(<ProducerPasswordResetEmail {...props} />);
}
