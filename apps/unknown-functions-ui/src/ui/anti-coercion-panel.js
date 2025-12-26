// /apps/unknown-functions-ui/src/ui/anti-coercion-panel.js
export function renderAntiCoercionPanel(report) {
  const panel = document.createElement("section");
  const heading = document.createElement("h3");
  heading.textContent = "Cognitive Liberation & Safety";

  const info = document.createElement("p");
  info.textContent =
    "This module scans for manipulative patterns (mind-control, covert hypnosis, dark UX) and surfaces safe actions.";

  const list = document.createElement("ul");

  const violationItem = document.createElement("li");
  const hasViolations = (report.ethics.violations || []).length > 0;
  violationItem.textContent = hasViolations
    ? "⚠ Ethical violations detected. Consider halting this configuration."
    : "No explicit ethical violations recorded, but remain cautious with unknown functions.";

  const exitItem = document.createElement("li");
  exitItem.textContent = "You can stop or disconnect at any time; no process here is irreversible.";

  const logItem = document.createElement("li");
  logItem.textContent =
    "All decisions should be logged with clear consent states; disable any deployment that lacks recent, explicit consent.";

  list.appendChild(violationItem);
  list.appendChild(exitItem);
  list.appendChild(logItem);

  const stopButton = document.createElement("button");
  stopButton.textContent = "Stop / Disconnect Scenario";
  stopButton.onclick = () => {
    alert("Scenario flagged as stopped. No further automated actions will run.");
  };

  panel.appendChild(heading);
  panel.appendChild(info);
  panel.appendChild(list);
  panel.appendChild(stopButton);

  return panel;
}
