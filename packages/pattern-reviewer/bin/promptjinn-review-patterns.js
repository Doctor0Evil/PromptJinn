// /packages/pattern-reviewer/bin/promptjinn-review-patterns.js
#!/usr/bin/env node
import { runAutoReview } from "../src/auto-review.js";

runAutoReview()
  .then((result) => {
    console.log(
      `Promoted ${result.promotedCount} patterns, ` +
        `${result.humanReviewCount} require manual review.`
    );
    console.log(
      "Details written to pattern-review-report.json. " +
        "High-risk XR/game patterns must be checked by a human."
    );
    process.exit(0);
  })
  .catch((err) => {
    console.error("Auto-review failed:", err);
    process.exit(1);
  });
