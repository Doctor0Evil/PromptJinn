// /apps/pattern-review-ui/src/api/persist-decisions.js
export async function saveDecision(decision) {
  const res = await fetch("/api/pattern-decision", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(decision)
  });

  if (!res.ok) {
    throw new Error(`Failed to save decision: ${res.status}`);
  }

  return res.json();
}
