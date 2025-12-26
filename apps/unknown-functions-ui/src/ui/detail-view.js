// /apps/unknown-functions-ui/src/ui/detail-view.js (updated)
import { renderAntiCoercionPanel } from "./anti-coercion-panel.js";
import { renderThreatPatterns } from "./threat-patterns.view.js";
import { analyzeDescriptionForMindControl } from "@promptjinn/pattern-intel/src/detectors/mindcontrol-patterns.detector.js";

export function renderDetailView(root, report) {
  root.innerHTML = "";
  const container = document.createElement("div");

  const title = document.createElement("h2");
  title.textContent = `Function: ${report.unknownFunction.label}`;

  const risk = document.createElement("p");
  risk.textContent = `Projected Risk: ${report.projectedRisk}`;

  container.appendChild(title);
  container.appendChild(risk);

  const antiCoercion = renderAntiCoercionPanel(report);
  container.appendChild(antiCoercion);

  const matches = analyzeDescriptionForMindControl(
    `${report.unknownFunction.label} ${report.unknownFunction.description}`,
    { domain: "vr" }
  );
  renderThreatPatterns(container, report, matches);

  root.appendChild(container);
}
