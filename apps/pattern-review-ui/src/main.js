// /apps/pattern-review-ui/src/main.js
import { loadReviewReport } from "./api/load-report.js";
import { renderReviewDashboard } from "./ui/review-dashboard.js";

async function start() {
  const app = document.getElementById("app");

  const report = await loadReviewReport();
  renderReviewDashboard(app, report);
}

start().catch((err) => {
  console.error("Failed to load review UI:", err);
});
