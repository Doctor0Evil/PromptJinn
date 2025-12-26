// /apps/pattern-review-ui/src/api/load-report.js
export async function loadReviewReport() {
  const res = await fetch("/pattern-review-report.json", {
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error(`Failed to load pattern-review-report.json: ${res.status}`);
  }

  return res.json();
}
