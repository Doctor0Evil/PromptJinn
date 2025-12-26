// /apps/pattern-review-ui/src/ui/review-dashboard.js
import { renderPatternCard } from "./pattern-card.js";

export function renderReviewDashboard(root, report) {
  root.innerHTML = "";

  const container = document.createElement("div");

  const title = document.createElement("h1");
  title.textContent = "Pattern Review Dashboard";

  const summary = document.createElement("p");
  summary.textContent = `Promoted: ${
    report.promoted.length
  } | Needs Human Review: ${report.needsHumanReview.length}`;

  container.appendChild(title);
  container.appendChild(summary);

  const section = document.createElement("section");
  const heading = document.createElement("h2");
  heading.textContent = "Patterns Requiring Human Review";
  section.appendChild(heading);

  report.needsHumanReview.forEach((entry) => {
    const card = renderPatternCard(entry);
    section.appendChild(card);
  });

  container.appendChild(section);
  root.appendChild(container);
}
