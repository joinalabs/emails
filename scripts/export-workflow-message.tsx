/**
 * Exports `event.WorkflowMessage` as a Go `html/template` for the workflows worker (blueprint emails@0.1.0,
 * EM-EMAILS-3), which embeds `exports/workflow-message.html`. `--check` fails when the file isn't current.
 *
 * Fields: .Subject .Headline .ProducerName .LogoURL .Initial .MarkColor .MarkInk .Body .UnsubscribeURL
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { render } from "../src/render.js";
import { WorkflowMessage } from "../src/templates/namespaces/event/WorkflowMessage/index.js";

const OUT = fileURLToPath(new URL("../exports/workflow-message.html", import.meta.url));

const common = {
  theme: "White" as const,
  subject: "{{.Subject}}",
  headline: "{{.Headline}}",
  bodyHtml: "{{.Body}}",
  unsubscribeUrl: "{{.UnsubscribeURL}}",
  initial: "{{.Initial}}",
  mark: { background: "{{.MarkColor}}", ink: "{{.MarkInk}}" },
};

/** The two renders differ only where the mark is: the logo, or the initial on its tile. */
export async function workflowMessageTemplate(): Promise<string> {
  const withLogo = await render(
    <WorkflowMessage
      {...common}
      brand={{ brandName: "{{.ProducerName}}", logoUrl: "{{.LogoURL}}" }}
    />,
  );
  const withInitial = await render(
    <WorkflowMessage {...common} brand={{ brandName: "{{.ProducerName}}" }} />,
  );
  let start = 0;
  while (start < withLogo.length && withLogo[start] === withInitial[start]) start++;
  // Back to the start of the differing tag, so each branch is whole elements.
  start = withLogo.lastIndexOf("<", start);
  let end = 0;
  while (
    end < withLogo.length - start &&
    withLogo[withLogo.length - 1 - end] === withInitial[withInitial.length - 1 - end]
  )
    end++;
  // Forward to the end of the differing tag.
  const tail = withLogo.length - end;
  const close = withLogo.indexOf(">", tail - 1) + 1;
  end = withLogo.length - close;
  const a = withLogo.slice(start, withLogo.length - end);
  const b = withInitial.slice(start, withInitial.length - end);
  return `${withLogo.slice(0, start)}{{if .LogoURL}}${a}{{else}}${b}{{end}}${withLogo.slice(withLogo.length - end)}\n`;
}

const html = await workflowMessageTemplate();
if (process.argv.includes("--check")) {
  let current = "";
  try {
    current = readFileSync(OUT, "utf8");
  } catch {}
  if (current !== html) {
    console.error("exports/workflow-message.html is stale: run `npm run export`.");
    process.exit(1);
  }
  console.log("exports/workflow-message.html is current.");
} else {
  writeFileSync(OUT, html);
  console.log(`wrote ${OUT}`);
}
