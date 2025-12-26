// /apps/pattern-review-ui/src/ui/pattern-card.js
import { saveDecision } from "../api/persist-decisions.js";

export function renderPatternCard(entry) {
  const { pattern, score } = entry;

  const card = document.createElement("article");
  card.style.border = "1px solid #ccc";
  card.style.margin = "8px";
  card.style.padding = "8px";

  const title = document.createElement("h3");
  title.textContent = `${pattern.label} [${pattern.id}]`;

  const risk = document.createElement("p");
  risk.textContent = `Risk bucket: ${score.bucket} (score ${score.score})`;

  const tags = document.createElement("p");
  tags.textContent = `Domains: ${pattern.domains.join(
    ", "
  )} | Risk tags: ${pattern.riskTags.join(", ")}`;

  const desc = document.createElement("p");
  desc.textContent = pattern.description || "(no description)";

  const actions = document.createElement("div");

  const approveBtn = document.createElement("button");
  approveBtn.textContent = "Approve / Promote";
  approveBtn.onclick = async () => {
    approveBtn.disabled = true;
    denyBtn.disabled = true;
    await saveDecision({ id: pattern.id, decision: "approve" });
    card.style.opacity = "0.4";
  };

  const denyBtn = document.createElement("button");
  denyBtn.textContent = "Reject / Remove";
  denyBtn.onclick = async () => {
    approveBtn.disabled = true;
    denyBtn.disabled = true;
    await saveDecision({ id: pattern.id, decision: "reject" });
    card.style.opacity = "0.4";
  };

  actions.appendChild(approveBtn);
  actions.appendChild(denyBtn);

  card.appendChild(title);
  card.appendChild(risk);
  card.appendChild(tags);
  card.appendChild(desc);
  card.appendChild(actions);

  return card;
}
