// /apps/unknown-functions-ui/src/ui/detail-view.js
import { renderAntiCoercionPanel } from "./anti-coercion-panel.js";

export function renderDetailView(root, report) {
  root.innerHTML = "";
  const container = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = `Function: ${report.unknownFunction.label}`;

  const risk = document.createElement("p");
  risk.textContent = `Projected Risk: ${report.projectedRisk}`;

  const ethics = document.createElement("pre");
  ethics.textContent = JSON.stringify(report.ethics, null, 2);

  container.appendChild(title);
  container.appendChild(risk);
  container.appendChild(ethics);

  const antiCoercion = renderAntiCoercionPanel(report);
  container.appendChild(antiCoercion);

  root.appendChild(container);
}
