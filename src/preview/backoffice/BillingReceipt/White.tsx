import type { BillingReceiptProps } from "../../../templates/namespaces/backoffice/BillingReceipt/index.js";
import { BillingReceipt } from "../../../templates/namespaces/backoffice/BillingReceipt/index.js";

const previewProps = {
  theme: "White",
  brand: {
    brandName: "Joina",
    logoUrl: "https://joina.cc/favicon/apple-touch-icon.png",
    supportEmail: "team@joina.cc",
  },
  number: "JN-000044",
  paidAt: "5 de novembro de 2026",
  card: "Visa final 4242",
  amount: "R$ 50,00",
  accountName: "Casa Argila",
  billingUrl: "https://console.joina.cc/settings/billing",
} satisfies BillingReceiptProps;

function Email(props: BillingReceiptProps) {
  return <BillingReceipt {...props} />;
}

export default Object.assign(Email, { PreviewProps: previewProps });
