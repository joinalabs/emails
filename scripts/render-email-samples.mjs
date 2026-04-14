/**
 * Renders each public template to HTML files for local browser testing.
 * Run from repo root after `npm run build`: `npm run preview:html`
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "preview-output");

const {
  renderCourtesyTicketHtml,
  renderCourtesyTicketQrHtml,
  renderEventMagicLinkHtml,
  renderProducerFirstAccountInviteHtml,
  renderProducerInviteHtml,
  renderProducerPasswordResetHtml,
  renderTicketPurchaseReceiptHtml,
  renderTicketPortalHtml,
  renderTicketQrCodeHtml,
  renderTicketTransferReceivedHtml,
} = await import(join(root, "dist", "index.js"));

/** Visible PNG QR for HTML preview — keep in sync with `emails/preview-qr-placeholder.ts`. */
const placeholderQrSrc =
  "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=JoinaPreview&margin=4&format=png";

const theme = {
  primaryColor: "#006FEE",
  brandName: "Produtora Example",
  logoUrl: "https://placehold.co/40x40/006fee/ffffff/png?text=P",
};

const samples = [
  {
    name: "ticket-purchase-receipt",
    render: () =>
      renderTicketPurchaseReceiptHtml({
        theme,
        eventName: "Show ao vivo",
        orderId: "ord_preview_001",
        purchasedAtFormatted: "13/04/2026 15:42",
        items: [
          {
            id: "line-1",
            eventName: "Show ao vivo",
            lotName: "1º lote",
            ticketTypeName: "Pista",
            fareCategoryLabel: "Inteira",
            quantity: 2,
            unitPriceFormatted: "R$ 100,00",
            lineTotalFormatted: "R$ 200,00",
          },
          {
            id: "line-2",
            eventName: "Show ao vivo",
            lotName: "2º lote",
            ticketTypeName: "Camarote",
            fareCategoryLabel: "Meia",
            quantity: 1,
            unitPriceFormatted: "R$ 150,00",
            lineTotalFormatted: "R$ 75,00",
          },
        ],
        subtotalFormatted: "R$ 275,00",
        totalFormatted: "R$ 275,00",
        paymentMethod: "Cartão",
        paymentCardLast4: "4242",
        payer: {
          name: "Maria Silva",
          email: "maria@example.com",
          taxIdFormatted: "12345678909",
        },
      }),
  },
  {
    name: "ticket-qr",
    render: () =>
      renderTicketQrCodeHtml({
        theme,
        ownerName: "Maria Silva",
        ownerEmail: "maria@example.com",
        eventName: "Show ao vivo",
        eventDate: "20/04/2026",
        eventTime: "21:00",
        venue: "Arena Example, São Paulo",
        venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
        fareKind: "full",
        lotName: "1º lote",
        qrImageSrc: placeholderQrSrc,
        ctaUrl: "https://example.com/ingresso/TCK-preview-001",
      }),
  },
  {
    name: "ticket-portal",
    render: () =>
      renderTicketPortalHtml({
        theme,
        ownerName: "Maria Silva",
        ownerEmail: "maria@example.com",
        eventName: "Show ao vivo",
        eventDate: "20/04/2026",
        eventTime: "21:00",
        venue: "Arena Example, São Paulo",
        venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
        fareKind: "full",
        lotName: "1º lote",
        ticketUrl: "https://example.com/ingresso/autenticado/TCK-preview-001",
      }),
  },
  {
    name: "ticket-transfer-received",
    render: () =>
      renderTicketTransferReceivedHtml({
        theme,
        ownerName: "Carlos Novo",
        ownerEmail: "carlos.novo@example.com",
        eventName: "Show ao vivo",
        eventDate: "20/04/2026",
        eventTime: "21:00",
        venue: "Arena Example, São Paulo",
        venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
        fareKind: "full",
        lotName: "1º lote",
        ticketUrl: "https://example.com/ingresso/transferido/TCK-preview-002",
        transferrerName: "Maria Silva",
      }),
  },
  {
    name: "event-magic-link",
    render: () =>
      renderEventMagicLinkHtml({
        theme,
        magicLinkUrl: "https://example.com/auth/magic?token=preview_token",
        eventOrBrandName: "Show ao vivo",
      }),
  },
  {
    name: "courtesy-ticket",
    render: () =>
      renderCourtesyTicketHtml({
        theme,
        eventName: "Show ao vivo",
        eventDate: "20/04/2026",
        eventTime: "21:00",
        venue: "Arena Example, São Paulo",
        venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
        lotName: "Cortesias",
        ownerName: "João Convidado",
        ownerEmail: "convidado@example.com",
        ctaUrl: "https://example.com/ingresso/cortesia-preview",
      }),
  },
  {
    name: "courtesy-ticket-qr",
    render: () =>
      renderCourtesyTicketQrHtml({
        theme,
        eventName: "Show ao vivo",
        eventDate: "20/04/2026",
        eventTime: "21:00",
        venue: "Arena Example, São Paulo",
        venueMapsUrl: "https://www.google.com/maps/search/?api=1&query=Arena+Example+São+Paulo",
        lotName: "Cortesias",
        ownerName: "João Convidado",
        ownerEmail: "convidado@example.com",
        qrImageSrc: placeholderQrSrc,
        ctaUrl: "https://example.com/ingresso/cortesia-preview",
      }),
  },
  {
    name: "producer-invite",
    render: () =>
      renderProducerInviteHtml({
        theme,
        inviteUrl: "https://example.com/backoffice/convite?token=preview",
        organizationOrProducerName: "Produtora Example",
        inviteeEmail: "novo.membro@example.com",
        inviterName: "João Admin",
      }),
  },
  {
    name: "producer-first-account-invite",
    render: () =>
      renderProducerFirstAccountInviteHtml({
        theme,
        inviteUrl: "https://example.com/backoffice/primeiro-acesso?token=preview",
        organizationOrProducerName: "Produtora Example",
        inviteeEmail: "contato@produtora.example",
      }),
  },
  {
    name: "producer-password-reset",
    render: () =>
      renderProducerPasswordResetHtml({
        theme,
        resetUrl: "https://example.com/backoffice/redefinir?token=preview",
      }),
  },
];

await mkdir(outDir, { recursive: true });

for (const { name, render } of samples) {
  const html = await render();
  const path = join(outDir, `${name}.html`);
  await writeFile(path, html, "utf8");
  console.log(`Wrote ${path}`);
}

console.log(`\nOpen any file under ${outDir} in a browser.`);
