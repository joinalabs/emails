import type { CSSProperties, FC, ReactNode } from "react";
import { Fragment } from "react";
import { Section, Text } from "react-email";
import { defaultEmailThemeTokens } from "../theme/types.js";

export interface EmailDetailRow {
  title: string;
  /** Plain string or inline markup (e.g. styled spans). Prefer `id` when `value` is not a string. */
  value: string | ReactNode;
  /** Optional stable key when `title`/`value` pairs could repeat. */
  id?: string;
}

export interface EmailDetailListProps {
  rows: EmailDetailRow[];
  /** Rendered inside the card after all rows (e.g. inviter line on producer invite). */
  footer?: ReactNode;
  /** Merged onto the outer `Section` (e.g. `marginBottom`). */
  sectionStyle?: CSSProperties;
}

const sectionBase: CSSProperties = {
  backgroundColor: defaultEmailThemeTokens.canvasBackground,
  borderRadius: "8px",
  padding: "10px 14px",
};

export const EmailDetailList: FC<EmailDetailListProps> = ({ rows, footer, sectionStyle }) => {
  const muted = defaultEmailThemeTokens.mutedTextColor;
  const text = defaultEmailThemeTokens.textColor;

  const labelStyle: CSSProperties = {
    margin: 0,
    fontSize: "12px",
    color: muted,
  };

  const valueStyle = (isLastRow: boolean): CSSProperties => ({
    margin: isLastRow && !footer ? 0 : "0 0 12px 0",
    fontSize: "14px",
    fontWeight: 500,
    color: text,
  });

  return (
    <Section style={{ ...sectionBase, ...sectionStyle }}>
      {rows.map((row, i) => {
        const isLastRow = i === rows.length - 1;
        const rowKey =
          row.id ??
          `${row.title}|${typeof row.value === "string" ? row.value : `row-${String(i)}`}`;
        return (
          <Fragment key={rowKey}>
            <Text style={labelStyle}>{row.title}</Text>
            <Text style={valueStyle(isLastRow)}>{row.value}</Text>
          </Fragment>
        );
      })}
      {footer}
    </Section>
  );
};
