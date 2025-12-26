// /packages/cognitive-safety-cli/bin/promptjinn-safety-check.js
#!/usr/bin/env node
import { runSafetyCheck } from "../src/run-safety-check.js";

runSafetyCheck()
  .then((result) => {
    if (!result.passed) {
      console.error("❌ Cognitive safety checks failed:");
      result.reasons.forEach((r) => console.error(` - ${r}`));
      process.exit(1);
    }
    console.log("✅ Cognitive safety checks passed.");
  })
  .catch((err) => {
    console.error("❌ Cognitive safety checks crashed:", err);
    process.exit(1);
  });
