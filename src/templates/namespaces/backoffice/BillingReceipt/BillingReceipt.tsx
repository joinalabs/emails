import type { FC } from "react";
import { Text } from "react-email";
import {
  EmailDetailList,
  EmailLayout,
  FooterLegal,
  HeaderLogo,
  PrimaryButton,
} from "../../../../components/index.js";
import type { ThemeName } from "../../../../theme/gradient-themes.js";
import type { Brand } from "../../../../theme/types.js";
import { defaultEmailThemeTokens } from "../../../../theme/types.js";

export interface BillingReceiptCopy {
  previewText?: string;
  title?: string;
  intro?: string;
  numberLabel?: string;
  paidAtLabel?: string;
  cardLabel?: string;
  amountLabel?: string;
  ctaLabel?: string;
  legalFooter?: string;
}

export interface BillingReceiptProps {
  theme: ThemeName;
  /** Joina's brand: this is a backoffice e-mail. */
  brand: Brand;
  /** "JN-000044". */
  number: string;
  /** Formatted: "5 de novembro de 2026". */
  paidAt: string;
  /** "Visa final 4242". */
  card: string;
  /** Formatted: "R$ 50,00". */
  amount: string;
  accountName: string;
  billingUrl: string;
  copy?: BillingReceiptCopy;
}

/** A paid charge's receipt (blueprint billing@0.4.0); the PDF is attached by the API. */
export const BillingReceipt: FC<BillingReceiptProps> = ({
  theme,
  brand,
  number,
  paidAt,
  card,
  amount,
  accountName,
  billingUrl,
  copy,
}) => {
  const c = {
    previewText: `Recebemos ${amount} no ${card}.`,
    title: "Recebemos seu pagamento",
    intro: `Cobramos ${amount} no ${card} pelos serviços pagos da Joina que ${accountName} usou. O recibo está em anexo.`,
    numberLabel: "Recibo",
    paidAtLabel: "Pago em",
    cardLabel: "Cartão",
    amountLabel: "Valor",
    ctaLabel: "Ver cobranças",
    legalFooter: "Este recibo não é uma nota fiscal.",
    ...copy,
  };
  const t = defaultEmailThemeTokens;
  return (
    <EmailLayout previewText={c.previewText}>
      <HeaderLogo brand={brand} theme={theme} />
      <Text style={{ margin: "0 0 12px", fontSize: "22px", fontWeight: 600, color: t.textColor }}>
        {c.title}
      </Text>
      <Text
        style={{ margin: "0 0 20px", fontSize: "15px", lineHeight: "24px", color: t.textColor }}
      >
        {c.intro}
      </Text>
      <EmailDetailList
        rows={[
          { id: "number", title: c.numberLabel, value: number },
          { id: "paidAt", title: c.paidAtLabel, value: paidAt },
          { id: "card", title: c.cardLabel, value: card },
          { id: "amount", title: c.amountLabel, value: amount },
        ]}
        sectionStyle={{ marginBottom: 24 }}
      />
      <PrimaryButton theme={theme} href={billingUrl} label={c.ctaLabel} />
      <FooterLegal legalFooter={c.legalFooter} supportEmail={brand.supportEmail} />
    </EmailLayout>
  );
};
