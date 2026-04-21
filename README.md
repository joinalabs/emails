# @joinalabs/emails

Joina email templates for event workflows (React Email + TypeScript). Import `render` and a namespace (`event` or `backoffice`) to get typed components and render them to HTML strings for any email provider.

**Language policy:** repository documentation (this README, developer-oriented comments) is **English**. **Default copy inside templates** (preheaders, headings, buttons, hints) is **Portuguese (Brazil)** for end users; the API should still pass locale-appropriate values for dynamic fields (`brandName`, `legalFooter`, formatted prices, etc.).

### Rendering vs sending

- **React Email** (and this package) **only render** React to HTML (via `@react-email/render`). They do **not** send mail.
- **Send from your backend** (Joina API, worker, serverless function): call `render(...)`, then pass the string to your provider (Resend, SES, SendGrid, SMTP via Nodemailer, etc.). That keeps API keys off the client and matches how providers expect traffic (authenticated server, SPF/DKIM on your domain).
- **Do not use the React Email preview CLI** (`email dev`) as a mail-delivery path. It is **development-only** (hot reload, local static assets). It is not a production MTA or transactional email service.

## Requirements

- Node.js 20+
- `react` and `react-dom` matching the `peerDependencies` in `package.json` (provided by the consumer or installed locally for development)

## Publishing and consuming from the Joina API

### Publishing (maintainers)

The package is published to the **[GitHub Packages npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)** (`https://npm.pkg.github.com`), not npmjs.com. [`publishConfig`](package.json) sets `registry` and **`access: "public"`** so new publishes are intended as **public** packages on GitHub.

CI ([`.github/workflows/publish.yml`](.github/workflows/publish.yml)) runs on every **push to `main`** and publishes with **`GITHUB_TOKEN`** (`permissions: packages: write`). You do **not** need an npmjs account, **NPM_TOKEN**, or npm "trusted publisher" setup for this repo.

#### Every release

1. Bump the **`version`** field in [`package.json`](package.json) (`npm version patch` / `minor` / `major`, or edit the field and commit). The registry rejects publishing the same version twice.
2. Merge or **push to `main`**. The workflow runs `npm ci`, then `npm publish` (`prepublishOnly` runs build, Biome, and `tsc` first).

### Installing in the Joina API

1. In the API repository, add an `.npmrc`:

   ```ini
   @joinalabs:registry=https://npm.pkg.github.com
   ```

2. Authenticate with a token that has at least **`read:packages`**:

   ```bash
   export NODE_AUTH_TOKEN=ghp_xxx
   npm install @joinalabs/emails
   ```

3. Pin or range the version as usual (e.g. `"@joinalabs/emails": "^0.2.0"`). **Node 20+** and **`react` / `react-dom`** matching `peerDependencies` are required.

### Usage (ESM)

The package is **ESM-only**. Import `render` and the namespace that matches the flow:

```typescript
import { render, event, backoffice } from "@joinalabs/emails";
import type { EmailTheme } from "@joinalabs/emails";

const theme: EmailTheme = {
  primaryColor: "#006FEE",
  brandName: "Produtora Example",
  logoUrl: "https://cdn.example.com/logo.png",
};
```

**Ticket with QR code:**

```typescript
import { render, event } from "@joinalabs/emails";
import type { TicketQrCodeProps } from "@joinalabs/emails"; // via event.TicketQrCodeProps

const html = await render(
  <event.TicketQrCode
    theme={theme}
    ownerName="Maria Silva"
    ownerEmail="maria@example.com"
    eventName="Show ao vivo"
    fareKind="full"
    qrImageSrc="https://example.com/qr.png" // or cid: / data:image/png;base64,...
    ctaUrl="https://example.com/ingresso/123"
  />,
);
// Pass `html` to Resend, SES, SendGrid, Nodemailer, etc.
```

**Ticket portal (link only):**

```typescript
const html = await render(
  <event.TicketPortal
    theme={theme}
    ownerName="Maria Silva"
    ownerEmail="maria@example.com"
    eventName="Show ao vivo"
    fareKind="full"
    ticketUrl="https://example.com/ingresso/autenticado/123"
  />,
);
```

**Producer invite (team member):**

```typescript
const html = await render(
  <backoffice.ProducerInvite
    theme={theme}
    inviteUrl="https://example.com/backoffice/convite?token=abc"
    organizationOrProducerName="Produtora Example"
    inviterName="João Admin"
    inviteeEmail="novo.membro@example.com"
  />,
);
```

**Typing props explicitly:**

```typescript
import { render, event } from "@joinalabs/emails";

// Props types live in the namespace
const props: event.TicketQrCodeProps = {
  theme,
  ownerName: "Maria Silva",
  ownerEmail: "maria@example.com",
  eventName: "Show ao vivo",
  fareKind: "full",
  qrImageSrc: "https://example.com/qr.png",
};

const html = await render(<event.TicketQrCode {...props} />);
```

**Plain text rendering** (pass `options` to `render`):

```typescript
const text = await render(<event.EventMagicLink theme={theme} magicLinkUrl="..." eventOrBrandName="..." />, {
  plainText: true,
});
```

**Email subjects** are not produced by this package — the API sets `Subject` when sending.

## Scripts

| Script | Description |
| --- | --- |
| `npm run build` | Outputs `dist/` (ESM + `.d.ts`) via `tsup` |
| `npm run check` | `biome check .` |
| `npm run check:write` | Format and apply safe Biome fixes |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run dev` | Starts the React Email preview app (hot reload, sidebar) for files under `src/namespaces/` |

The Husky `pre-commit` hook runs `npm run check` and `npm run typecheck`.

## Testing emails

### 1. Programmatic checks in your app or tests

Import the namespace components and `render` in integration tests: assert that the returned string includes expected copy, URLs, or order IDs.

```typescript
import { render, event } from "@joinalabs/emails";

const html = await render(
  <event.TicketQrCode theme={...} ownerName="Test" ownerEmail="t@t.com" eventName="Test Event" fareKind="full" qrImageSrc="data:image/png;base64,..." />,
);

expect(html).toContain("Test Event");
```

### 2. React Email preview server (recommended for day-to-day dev)

```bash
npm run dev
```

Opens [http://localhost:3000](http://localhost:3000) with a sidebar listing all templates under `src/namespaces/`. Each template folder has an `index.tsx` with a **default export** and `PreviewProps` for the sidebar. Shared preview-only constants live in [`src/namespaces/_preview-fixtures.ts`](src/namespaces/_preview-fixtures.ts) (underscore prefix so the React Email CLI ignores that file).

**This server does not send email.** For local SMTP capture use [Mailpit](https://mailpit.axllent.org/) or similar tools from the API side.

### 3. Real SMTP / inbox capture

Point a staging mailer ([Mailpit](https://mailpit.axllent.org/), [Ethereal](https://ethereal.email/), etc.) at your API and trigger flows that call `render(...)`. Validates headers, multipart HTML, and rendering inside real mailbox UIs.

### 4. Client regression (optional)

For Outlook/Gmail-specific quirks, use [Litmus](https://www.litmus.com/) or [Email on Acid](https://www.emailonacid.com/) — render HTML via `render()` in a script and feed it to those tools.

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

End-user defaults are **Portuguese (Brazil)**. To ship another language, pass the optional `copy` object per template (exported `*Copy` types from the namespace, e.g. `event.TicketQrCodeCopy`) and/or localised subject lines from the API.

## QR codes and images

This package **does not** generate QR codes. Your API should:

1. Build the QR payload (e.g. a signed URL or token).
2. Render a PNG and pass it as `qrImageSrc`: HTTPS URL, `cid:...` for inline attachments, or `data:image/png;base64,...`.

Set `copy.qrAlt` for a translated or more specific `alt` text.

## Templates

Templates are organised into two namespaces. Import them from `event` or `backoffice`.

### `event` namespace

| Flow | Component | Props type |
| --- | --- | --- |
| Ticket purchase receipt | `event.TicketPurchaseReceipt` | `event.TicketPurchaseReceiptProps` |
| Ticket — QR in email | `event.TicketQrCode` | `event.TicketQrCodeProps` |
| Ticket — link to authenticated screen | `event.TicketPortal` | `event.TicketPortalProps` |
| Ticket — transfer received (new holder) | `event.TicketTransferReceived` | `event.TicketTransferReceivedProps` |
| Magic link (event area login) | `event.EventMagicLink` | `event.EventMagicLinkProps` |
| Complimentary ticket — link only | `event.CourtesyTicket` | `event.CourtesyTicketProps` |
| Complimentary ticket — QR in email | `event.CourtesyTicketQrCode` | `event.CourtesyTicketQrCodeProps` |

### `backoffice` namespace

| Flow | Component | Props type |
| --- | --- | --- |
| Producer — first account setup (post-contract) | `backoffice.ProducerFirstAccountInvite` | `backoffice.ProducerFirstAccountInviteProps` |
| Producer — team member invite | `backoffice.ProducerInvite` | `backoffice.ProducerInviteProps` |
| Producer password reset | `backoffice.ProducerPasswordReset` | `backoffice.ProducerPasswordResetProps` |

### Full example — ticket purchase receipt

```typescript
import { render, event } from "@joinalabs/emails";
import type { EmailTheme } from "@joinalabs/emails";

const theme: EmailTheme = {
  primaryColor: "#006FEE",
  brandName: "Produtora Example",
  logoUrl: "https://cdn.example.com/logo.png",
};

const html = await render(
  <event.TicketPurchaseReceipt
    theme={theme}
    eventName="Show ao vivo"
    orderId="ord_123"
    purchasedAtFormatted="13/04/2026 15:42"
    items={[
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
    ]}
    subtotalFormatted="R$ 275,00"
    totalFormatted="R$ 275,00"
    paymentMethod="Cartão"
    paymentCardLast4="4242"
    payer={{
      name: "Maria Silva",
      email: "maria@example.com",
      taxIdFormatted: "***********09",
    }}
  />,
);
// send `html` through your mail provider
```

### Detail card (ticket flows)

All ticket templates share a detail card built by `buildTicketIngressoDetailRows`:

| Row | Props |
| --- | --- |
| Titular | `ownerName` (bold) + `ownerEmail` (muted) inline |
| Hora e local | `eventDate` + `eventTime` → `Data, Horário · local`. Or `eventDateFormatted` as the left segment. Optional `venue` + `venueMapsUrl` (venue name is a link). Omitted if nothing to show. |
| Lote | Optional `lotName` |
| Tipo do ingresso | `fareKind`: `full` \| `half` \| `courtesy` → copy labels |

**Transfer received** (`event.TicketTransferReceived`): pass `ticketUrl` and the new `ownerName` / `ownerEmail`. Optional `transferrerName` shows `copy.transferrerLine` with `{name}`.

**Header (`HeaderLogo`):** With `headline` (all ticket and event flows), the event name is left-aligned. `theme.brandName` is always on the second line with an optional small logo. Without `headline` (backoffice flows), only producer branding is shown. Backoffice templates (`ProducerInvite`, `ProducerFirstAccountInvite`, `ProducerPasswordReset`) **do not** render `HeaderLogo`.

**Primeiro produtor:** use `backoffice.ProducerFirstAccountInvite` when the link is generated by the backoffice after a commercial contract — recipient has **no account yet**. `copy.footerNote` accepts `{brandName}` to interpolate `theme.brandName`.

**Convite de time:** use `backoffice.ProducerInvite` when someone who **already has an account** invites another email. Pass `inviterName` when known (`copy.inviterLine` with `{name}`).

## Reusable components

These building-block components are also exported for internal extensions:

| Export | Description |
| --- | --- |
| `EmailLayout` | Root wrapper with theme-aware styling and preview text |
| `HeaderLogo` | Producer branding block with optional event headline |
| `EmailDetailList` | Compact title/value card with optional `footer` slot |
| `PrimaryButton` | Themed CTA button |
| `FooterLegal` | Conditional legal footer (renders when `theme.legalFooter` is set) |
| `buildTicketIngressoDetailRows` | Builds the ticket detail rows array for `EmailDetailList` |

## Suggested backlog (prioritise with product)

Templates not implemented yet:

- Pending payment / checkout reminder
- Refund or cancelled purchase
- Event date or venue change
- Pre-event reminder (24h / 1h)
- Email change or 2FA confirmation (producer account)
- Waitlist (slot available)

When an item is prioritised, add a folder under `src/namespaces/event/` or `src/namespaces/backoffice/` following the existing pattern: `ComponentName.tsx` (pure component) + `index.tsx` (re-export + `PreviewProps` default export for the dev server). Re-export from the namespace `index.ts`.
