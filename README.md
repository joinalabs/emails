# @joinalabs/emails

Joina email templates for event workflows (React Email + TypeScript). The main API imports the `render*Html` helpers and sends the returned HTML through your email provider.

**Language policy:** repository documentation (this README, Cursor rules, developer-oriented comments) is **English**. **Default copy inside templates** (preheaders, headings, buttons, hints) is **Portuguese (Brazil)** for end users; the API should still pass locale-appropriate values for dynamic fields (`brandName`, `legalFooter`, formatted prices, etc.).

### Rendering vs sending

- **React Email** (and this package) **only render** React to HTML (via `@react-email/render` / `render*Html`). They do **not** send mail.
- **Send from your backend** (Joina API, worker, serverless function): call `render*Html`, then pass the string to your provider (Resend, SES, SendGrid, SMTP via Nodemailer, etc.). That keeps API keys off the client and matches how providers expect traffic (authenticated server, SPF/DKIM on your domain).
- **Do not use the React Email preview CLI** (`email dev` / local preview app) as a mail-delivery path. It is **development-only** (hot reload, local static assets). It is not a production MTA or transactional email service.

## Requirements

- Node.js 20+
- `react` and `react-dom` matching the `peerDependencies` in `package.json` (provided by the consumer or installed locally for development)

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Outputs `dist/` (ESM + `.d.ts`) via `tsup` |
| `npm run check` | `biome check .` |
| `npm run check:write` | Format and apply safe Biome fixes |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run preview:html` | Builds the package and writes sample HTML for every template under `preview-output/` (gitignored) |
| `npm run dev` | Starts the [React Email](https://react.email/) preview app (hot reload, sidebar) for files under [`emails/`](emails/) |

The Husky `pre-commit` hook runs `npm run check` and `npm run typecheck`.

## Testing emails

### 1. Static HTML in the browser (fastest)

Run:

```bash
npm run preview:html
```

This runs `npm run build`, then [`scripts/render-email-samples.mjs`](scripts/render-email-samples.mjs), which calls each `render*Html` with fixture props and writes one `.html` file per template into `preview-output/`. Open those files in Chrome, Firefox, or Safari to eyeball layout, typography, and links.

Local QR samples use a small **HTTPS PNG** (`emails/preview-qr-placeholder.ts`) so the image is visible when remote images load; in production pass your own `qrImageSrc` (`data:image/png;base64,...`, `cid:...`, or HTTPS) from your API.

### 2. Programmatic checks in your app or tests

Import the same `render*Html` helpers (or the `*Email` components plus `render` from `@react-email/render`) in integration tests: assert that the returned string includes expected copy, URLs, or order IDs. Keep fixtures minimal and stable.

### 3. React Email preview server (recommended for day-to-day dev)

This repo follows the same idea as the official [Automatic setup](https://react.email/docs/getting-started/automatic-setup): a local **preview** app (not an SMTP relay). It is the supported way to iterate on layout with hot reload and a template list.

1. Install dependencies (includes `react-email` and `@react-email/preview-server` as dev tools — see also [monorepo / npm workspace notes](https://react.email/docs/getting-started/monorepo-setup/npm)).
2. Run:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) and pick a file under [`emails/`](emails/). Each file contains the **full template** (named export for the API package) plus a **default export** for the preview sidebar, with `PreviewProps` defined in the same module. Shared preview-only constants live in [`emails/_preview-fixtures.ts`](emails/_preview-fixtures.ts) (underscore prefix so the React Email CLI [ignores](https://react.email/docs/cli) that file in the sidebar).

**Important:** this server **does not send** email to the internet. It only renders templates in the browser for development. To see messages inside Gmail/Outlook/Apple Mail inboxes, you still need your API (or a script) to call a real provider after `render*Html`. For local SMTP capture without leaving this repo, use tools such as [Mailpit](https://mailpit.axllent.org/) from the Joina API, not `email dev`.

CLI details (`email dev`, `--dir`, `static/`, ignoring `_`-prefixed folders): [React Email CLI](https://react.email/docs/cli).

### 4. Real SMTP / inbox capture

Point a staging mailer or local tool ([Mailpit](https://mailpit.axllent.org/), [MailHog](https://github.com/mailhog/MailHog), [Ethereal](https://ethereal.email/), etc.) at your API and trigger flows that call `render*Html`. That validates headers, multipart HTML, and how the message looks inside a real mailbox UI.

### 5. Client regression (optional, paid or self-hosted)

For Outlook/Gmail-specific quirks, use a service such as [Litmus](https://www.litmus.com/) or [Email on Acid](https://www.emailonacid.com/) with HTML exported from `render*Html` or from step (1).

## Whitelabel theme (`EmailTheme`)

Every template accepts `theme: EmailTheme`:

| Field | Required | Description |
| --- | --- | --- |
| `primaryColor` | yes | Buttons, links, and accents |
| `brandName` | yes | Shown in the header when there is no logo |
| `logoUrl` | no | HTTPS URL for the logo image |
| `fontFamily` | no | Font stack (layout includes a safe fallback) |
| `legalFooter` | no | Short legal line above the end of the template |
| `surfaceColor` | no | Main card background |
| `textColor` / `mutedTextColor` | no | Primary and secondary text colors |

Default layout tokens (neutral background, borders) are exported as `defaultEmailThemeTokens`.

## Internationalisation and copy

End-user defaults in the JSX are **Portuguese (Brazil)**. To ship another language, pass the optional `copy` object per template (exported `*Copy` types) and/or localised subject lines from the API.

## QR codes and images

This package **does not** generate QR codes. Your API (or another service) should:

1. Build the QR payload (for example a signed URL or token).
2. Render a PNG (or host the image) and pass it to `TicketQrCodeEmail` or `CourtesyTicketQrEmail` as `qrImageSrc`: HTTPS URL, `cid:...` for inline attachments, or `data:image/png;base64,...`.

Set `copy.qrAlt` when you need a translated or more specific image `alt` text.

## Templates and render helpers

| Flow | React component | `render*Html` |
| --- | --- | --- |
| Ticket purchase receipt | `TicketPurchaseReceiptEmail` | `renderTicketPurchaseReceiptHtml` |
| Ticket — QR in email | `TicketQrCodeEmail` | `renderTicketQrCodeHtml` |
| Ticket — link to authenticated screen only | `TicketPortalEmail` | `renderTicketPortalHtml` |
| Magic link (logged-in event area) | `EventMagicLinkEmail` | `renderEventMagicLinkHtml` |
| Complimentary ticket — link only | `CourtesyTicketEmail` | `renderCourtesyTicketHtml` |
| Complimentary ticket — QR in email | `CourtesyTicketQrEmail` | `renderCourtesyTicketQrHtml` |
| Producer — primeiro acesso (pós-contrato) | `ProducerFirstAccountInviteEmail` | `renderProducerFirstAccountInviteHtml` |
| Producer — convite de membro do time | `ProducerInviteEmail` | `renderProducerInviteHtml` |
| Producer password reset | `ProducerPasswordResetEmail` | `renderProducerPasswordResetHtml` |

**Primeiro produtor (pós-contrato):** use `renderProducerFirstAccountInviteHtml` quando o link for gerado pelo backoffice após contrato comercial — destinatário ainda **sem** conta; o texto padrão fala em criar a primeira conta e cadastrar dados da empresa. **`inviteeEmail`** (opcional, recomendado) aparece no cartão. **`copy.footerNote`** aceita `{brandName}` para interpolar `theme.brandName`. Preheader: `{organizationOrProducerName} — {subjectPreview}`.

**Convite de time:** use `renderProducerInviteHtml` quando **alguém que já tem conta** no backoffice convidar outro e-mail para a mesma produtora. Passe **`inviterName`** quando souber quem enviou (`copy.inviterLine` com `{name}`). **`onboardingHint`** descreve aceitar o convite e definir senha no fluxo de membro; ajuste via `copy` para outros idiomas. Preheader: `{organizationOrProducerName} — {subjectPreview}`.

Each `render*Html(props)` returns `Promise<string>` (HTML) using `@react-email/render`.

**Header (`HeaderLogo`):** With optional `headline` (tickets, courtesy, magic link, **ticket purchase receipt**), the **event name is left-aligned** on the first line. The **second line** is always `theme.brandName` (producer); if `theme.logoUrl` is set, a **small logo** (thumbnail) appears beside that name. Without `headline`, the block is left-aligned **producer branding only**: optional larger `logoUrl` above, then `brandName`. **Backoffice producer mail** (`ProducerInviteEmail`, `ProducerFirstAccountInviteEmail`, `ProducerPasswordResetEmail`) **does not render `HeaderLogo`** — the body starts with the title; `theme` still drives colours, links, and buttons. Local previews use a sample `logoUrl` in [`emails/_preview-fixtures.ts`](emails/_preview-fixtures.ts). Preheaders still prefix `{eventName} —` / `{eventOrBrandName} —` where the template passes a headline or receipt `eventName`.

### Ticket email variants

Ingresso-related flows ship as **two variants** each:

- **QR no e-mail** — `TicketQrCodeEmail` / `CourtesyTicketQrEmail`: the API supplies `qrImageSrc`; optional `ctaUrl` opens the same ticket in the browser.
- **Só portal** — `TicketPortalEmail` / `CourtesyTicketEmail`: no image in the message; the API supplies a single authenticated URL (`ticketUrl` or `ctaUrl`) so the user opens their ticket on your site.

All four ingresso templates share the same **detail card** (via `buildTicketIngressoDetailRows` if you extend layouts yourself):

| Data | Props / notes |
| --- | --- |
| Titular | First row: **`ownerName`** (bold) and **`ownerEmail`** (muted) inline. Event title stays in **`HeaderLogo`** only. |
| Hora e local | Prefer **`eventDate`** + **`eventTime`** (renders `Data, Horário · nome do local`). Otherwise **`eventDateFormatted`** is the left segment before ` · `. Optional **`venue`** + **`venueMapsUrl`** (venue name is a **link** with `theme.primaryColor`). Row omitted if nothing to show. |
| Lote | Optional **`lotName`** (shown before tipo). |
| Tipo do ingresso | Only **`fareKind`**: `full` \| `half` \| `courtesy` → copy `fareFullLabel` / `fareHalfLabel` / `fareCourtesyLabel` (e.g. Inteira, Meia, Cortesia). Courtesy templates default **`fareKind`** to `courtesy` when omitted. |

**Copy keys** include `titularLabel` and `horaLocalLabel` (defaults: Titular, Hora e local). **`issuedBy`** was removed from courtesy templates. Ticket ingresso emails do **not** show a public ticket code in the detail card.

For the ticket purchase receipt, each `TicketPurchaseReceiptLineItem` includes `eventName` (for keys and multi-event data; not shown in the item row). Optional **`lotName`** sets the bold row title (e.g. `1º lote`); otherwise the title falls back to **`ticketTypeName`**. The subtitle shows **`fareCategoryLabel`** (e.g. `Inteira`, `Meia`) with `quantity×` unit price — **`ticketTypeName`** (e.g. access `Pista`) is not shown in the email. The line total is right-aligned on the same row as the lot title. Pass top-level **`eventName`** for the header and preheader; for carts with several events, supply a summary string from your domain logic. An optional **`id`** per line is recommended when lines could collide. The first detail card lists order id, purchase date, and optional **`paymentMethod`** (no primary CTA in this template). For card charges, pass **`paymentCardLast4`** (digits only, or a longer masked string from your vault — only the last four digits are shown, appended as `•••• 1234` in the theme’s muted text color after the method label). Optional **`payer`** adds a second card (heading from `copy.payerSectionHeading`) with **`name`**, optional **`email`**, and optional **`taxIdFormatted`**: digits in the string are shown as `•` for all but the **last two**, which use body text color (label from `copy.payerTaxIdLabel`). Prefer supplying a masked or truncated value from the API rather than the full raw id in the mail payload.

### Example (API)

```typescript
import {
  renderTicketPurchaseReceiptHtml,
  type TicketPurchaseReceiptEmailProps,
} from "@joinalabs/emails";

const props: TicketPurchaseReceiptEmailProps = {
  theme: {
    primaryColor: "#006FEE",
    brandName: "Produtora",
    logoUrl: "https://cdn.example.com/logo.png",
  },
  eventName: "Show ao vivo",
  orderId: "ord_123",
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
    taxIdFormatted: "***********09",
  },
};

const html = await renderTicketPurchaseReceiptHtml(props);
// send `html` through your mail provider
```

Reusable blocks (`EmailLayout`, `HeaderLogo`, `EmailDetailList`, `PrimaryButton`, `FooterLegal`, **`buildTicketIngressoDetailRows`**, **`TicketFareKind`**) are also exported for internal extensions. `EmailDetailList` renders the compact title/value card used on tickets, courtesy, ticket purchase receipt order meta, and producer invite (with optional `footer` slot).

## Suggested backlog (prioritise with product)

Templates not implemented yet but useful for the same event SaaS:

- Pending payment / checkout reminder
- Refund or cancelled purchase
- Event date or venue change
- Pre-event reminder (24h / 1h)
- Team member invite (backoffice RBAC)
- Email change or 2FA confirmation (producer account)
- Waitlist (slot available)

When an item is prioritised, follow the same pattern: add a module under `emails/` (named export + default preview export), wire `render*Html` in `src/render/renderers.tsx`, and re-export from `src/index.ts`.
