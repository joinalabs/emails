/**
 * Every template, rendered from its previews: none carries the previous company's brand (blueprint emails@0.1.0,
 * EM-EMAILS-4), and the exported workflow message is current.
 */
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import type { FC } from "react";
import { render } from "../src/render.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const files = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? files(p) : [p];
  });

const FORMER_BRAND = /iventou/i;

test("no source file names the former brand", () => {
  for (const f of [...files(join(root, "src")), ...files(join(root, "exports"))]) {
    assert.doesNotMatch(readFileSync(f, "utf8"), FORMER_BRAND, f);
  }
});

const previews = files(join(root, "src/preview")).filter((f) => f.endsWith(".tsx"));

test("every preview renders without the former brand", async () => {
  assert.ok(previews.length > 20);
  for (const f of previews) {
    const mod = (await import(f)) as { default: FC<object> & { PreviewProps: object } };
    const Email = mod.default;
    const html = await render(<Email {...Email.PreviewProps} />);
    assert.ok(html.includes("<html"), f);
    assert.doesNotMatch(html, FORMER_BRAND, f);
  }
});

test("the workflow message's export is current and keeps its fields", () => {
  execFileSync(process.execPath, [
    "--import",
    "tsx",
    join(root, "scripts/export-workflow-message.tsx"),
    "--check",
  ]);
  const html = readFileSync(join(root, "exports/workflow-message.html"), "utf8");
  for (const field of [
    "{{.Body}}",
    "{{.UnsubscribeURL}}",
    "{{if .LogoURL}}",
    "{{.MarkColor}}",
    "{{.Initial}}",
  ]) {
    assert.ok(html.includes(field), field);
  }
});
