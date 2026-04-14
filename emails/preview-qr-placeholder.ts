/**
 * PNG QR legível para previews (React Email dev, `npm run preview:html`).
 * Em produção a API deve enviar o próprio `qrImageSrc` (HTTPS, `cid:...` ou `data:image/png;base64,...`).
 */
export const previewQrPlaceholderSrc =
  "https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=JoinaPreview&margin=4&format=png";
