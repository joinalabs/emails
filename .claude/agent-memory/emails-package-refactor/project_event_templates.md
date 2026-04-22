---
name: Event namespace templates
description: Current template names and purposes in the event namespace
type: project
---

The `event` namespace covers all templates related to events, tickets, attendees, and event lifecycle communications.

## Current templates

### `Ticket`
Ticket delivery email with a CTA link to an authenticated ticket screen. No QR code is embedded. Used when the QR is served dynamically by the portal. (Previously named `TicketPortal`.)

### `TicketWithQRCode`
Ticket delivery email with the QR code embedded directly in the email body. Used when the organizer wants the attendee to have the QR code available offline. Optionally includes a fallback link. (Previously named `TicketQrCode`.)

### `TicketPurchaseReceipt`
Order receipt sent after a successful purchase. Lists line items (lot, fare category, quantity, unit price, line total), subtotal, optional taxes, total, payment method (with optional last 4 card digits), and optional payer details.

### `TransferredTicketReceived`
Sent to the **new** ticket holder after a transfer. Shows the new owner details in the detail card and a CTA link to access the ticket. Optionally shows the previous holder name. (Previously named `TicketTransferReceived`.)

### `CustomerAuthMagicLink`
Magic link for passwordless login to an event area. Single CTA with a short-lived URL. (Previously named `EventMagicLink`.)

### `CourtesyTicket`
Complimentary ticket email with an authenticated link only (no QR embedded). Mirrors `Ticket` but for courtesy/comped tickets.

### `CourtesyTicketWithQRCode`
Complimentary ticket email with QR code embedded. Mirrors `TicketWithQRCode` but for courtesy/comped tickets. (Previously named `CourtesyTicketQrCode`.)

## Template pairing pattern

Several event templates come in pairs — a portal/link variant and a QR code variant:

| Link-only variant | QR code variant |
|---|---|
| `Ticket` | `TicketWithQRCode` |
| `CourtesyTicket` | `CourtesyTicketWithQRCode` |

When adding a new ticket delivery template, consider whether it also needs a QR variant. If the use case involves offline access, a QR variant is likely needed.

## Rename history (2026-04-21)

| Old name | New name |
|---|---|
| `CourtesyTicketQrCode` | `CourtesyTicketWithQRCode` |
| `EventMagicLink` | `CustomerAuthMagicLink` |
| `TicketPortal` | `Ticket` |
| `TicketQrCode` | `TicketWithQRCode` |
| `TicketTransferReceived` | `TransferredTicketReceived` |

All renames were applied uniformly: folder name, file name, component export, Props type, and Copy type.
