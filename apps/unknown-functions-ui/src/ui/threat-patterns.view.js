// /apps/unknown-functions-ui/src/ui/threat-patterns.view.js
export function renderThreatPatterns(root, report, mindControlMatches = []) {
  const section = document.createElement("section");
  const heading = document.createElement("h3");
  heading.textContent = "Mind-Control & Hypnosis Risk Signals (Games / XR)";

  const intro = document.createElement("p");
  intro.textContent =
    "This view highlights patterns associated with covert influence, mind-control, or hypnosis-like effects, especially common in games and VR/MR/XR contexts.";

  section.appendChild(heading);
  section.appendChild(intro);

  if (mindControlMatches.length === 0) {
    const ok = document.createElement("p");
    ok.textContent =
      "No known mind-control patterns were detected for this function, but treat unknown functions with caution.";
    section.appendChild(ok);
    root.appendChild(section);
    return;
  }

  const list = document.createElement("ul");
  mindControlMatches.forEach((match) => {
    const li = document.createElement("li");
    li.textContent = `${match.label} [${match.riskTags.join(
      ", "
    )}] — signals: ${match.signalHits.join("; ")}`;
    list.appendChild(li);
  });

  section.appendChild(list);

  const warning = document.createElement("p");
  warning.textContent =
    "If these patterns appear in game or XR code, consider them adversarial and refactor to remove any coercive or hypnosis-like behavior.";

  section.appendChild(warning);
  root.appendChild(section);
}
