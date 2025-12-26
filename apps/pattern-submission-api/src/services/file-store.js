// /apps/pattern-submission-api/src/services/file-store.js
import fs from "node:fs";
import path from "node:path";

const pendingPath = path.join(
  process.cwd(),
  "packages/pattern-intel/src/db/patterns.mindcontrol.pending.js"
);

export function appendPendingPattern(pattern) {
  if (!fs.existsSync(pendingPath)) {
    fs.writeFileSync(
      pendingPath,
      `export const pendingMindControlPatterns = [];\n`,
      "utf8"
    );
  }

  const content = fs.readFileSync(pendingPath, "utf8");
  const insertMarker = "pendingMindControlPatterns = [";
  const idx = content.indexOf(insertMarker);

  if (idx === -1) {
    throw new Error("pendingMindControlPatterns array not found.");
  }

  const before = content.slice(0, content.lastIndexOf("]"));
  const patternString = `\n  ${JSON.stringify(pattern, null, 2)},`;
  const after = content.slice(content.lastIndexOf("]"));

  fs.writeFileSync(before + patternString + "\n" + after, "utf8");
}
