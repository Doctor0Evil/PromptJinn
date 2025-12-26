// /packages/pattern-intel-tools/src/import-pending.js
import fs from "node:fs";
import path from "node:path";

const submissionsDir = path.join(process.cwd(), "pattern-submissions");
const pendingPath = path.join(
  process.cwd(),
  "packages/pattern-intel/src/db/patterns.mindcontrol.pending.js"
);

export async function importPendingSubmissions() {
  if (!fs.existsSync(submissionsDir)) return 0;

  const files = fs
    .readdirSync(submissionsDir)
    .filter((f) => f.endsWith(".json"));

  if (!fs.existsSync(pendingPath)) {
    fs.writeFileSync(
      pendingPath,
      `export const pendingMindControlPatterns = [];\n`,
      "utf8"
    );
  }

  const pendingModule = await import(pendingPath + "?cacheBust=" + Date.now());
  const existing = new Set(
    (pendingModule.pendingMindControlPatterns || []).map((p) => p.id)
  );

  const toAppend = [];

  for (const file of files) {
    const fullPath = path.join(submissionsDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const pattern = JSON.parse(raw);

    if (!pattern.id || existing.has(pattern.id)) {
      continue;
    }

    toAppend.push(pattern);
  }

  if (toAppend.length === 0) return 0;

  let content = fs.readFileSync(pendingPath, "utf8");
  const insertPoint = content.lastIndexOf("]");
  if (insertPoint === -1) {
    throw new Error("pendingMindControlPatterns array not found.");
  }

  const before = content.slice(0, insertPoint);
  const after = content.slice(insertPoint);

  const appended = toAppend
    .map((p) => `  ${JSON.stringify(p, null, 2)}`)
    .join(",\n");

  const newContent =
    before +
    (before.trim().endsWith("[") ? "\n" : ",\n") +
    appended +
    "\n" +
    after;

  fs.writeFileSync(pendingPath, newContent, "utf8");

  return toAppend.length;
}
