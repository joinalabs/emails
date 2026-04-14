/**
 * Run Husky only when this repo ships `.husky` (dev clone). Published tarballs
 * only include `files` from package.json — no `.husky` — so consumers skip it.
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
if (!existsSync(join(root, ".husky"))) {
  process.exit(0);
}

const r = spawnSync("husky", [], { cwd: root, stdio: "inherit", shell: true });
process.exit(r.status ?? 1);
