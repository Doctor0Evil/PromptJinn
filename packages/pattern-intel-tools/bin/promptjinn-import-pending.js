// /packages/pattern-intel-tools/bin/promptjinn-import-pending.js
#!/usr/bin/env node
import { importPendingSubmissions } from "../src/import-pending.js";

importPendingSubmissions()
  .then((count) => {
    console.log(`Imported ${count} pending pattern submissions.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Import failed:", err);
    process.exit(1);
  });
