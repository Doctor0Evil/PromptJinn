// /packages/pattern-reviewer/src/auto-review.js
import fs from "node:fs";
import path from "node:path";
import { autoScorePattern } from "./risk-scoring.js";

const canonicalPath = path.join(
  process.cwd(),
  "packages/pattern-intel/src/db/patterns.mindcontrol.js"
);

const pendingPath = path.join(
  process.cwd(),
  "packages/pattern-intel/src/db/patterns.mindcontrol.pending.js"
);

const reviewReportPath = path.join(
  process.cwd(),
  "pattern-review-report.json"
);

export async function runAutoReview() {
  const canonicalModule = await import(
    canonicalPath + "?cacheBust=" + Date.now()
  );
  const pendingModule = await import(
    pendingPath + "?cacheBust=" + Date.now()
  );

  const canonical = canonicalModule.mindControlPatterns || [];
  const pending = pendingModule.pendingMindControlPatterns || [];

  const canonicalIds = new Set(canonical.map((p) => p.id));
  const remainingPending = [];
  const promoted = [];
  const needsHumanReview = [];

  for (const pattern of pending) {
    if (!pattern.id || canonicalIds.has(pattern.id)) {
      continue;
    }

    const score = autoScorePattern(pattern);

    // Auto-complete basic mitigation / hints if missing
    if (!pattern.mitigation || pattern.mitigation.length === 0) {
      pattern.mitigation = [
        "Flag any usage of this pattern for human review before deployment.",
        "Provide a clear, always-available opt-out for affected users."
      ];
    }
    if (!pattern.detectionHints || pattern.detectionHints.length === 0) {
      pattern.detectionHints = [
        "Search code and content for phrases and flows that match this pattern."
      ];
    }

    if (score.bucket === "LOW") {
      promoted.push({ pattern, score });
      canonicalIds.add(pattern.id);
    } else {
      needsHumanReview.push({ pattern, score });
      remainingPending.push(pattern);
    }
  }

  writeCanonical(canonical, promoted);
  writePending(remainingPending);
  writeReviewReport(promoted, needsHumanReview);

  return {
    promotedCount: promoted.length,
    humanReviewCount: needsHumanReview.length
  };
}

function writeCanonical(existing, promoted) {
  const all = [...existing, ...promoted.map((p) => p.pattern)];
  const exportString = `export const patternMeta = {
  version: "0.1.0",
  lastUpdated: "${new Date().toISOString()}",
  description: "Continuously expanding database of mind-control, hypnosis, and coercive influence patterns, optimized for games and XR.",
  sourcesHint: [
    "academic dark-patterns research",
    "neurorights & mental privacy guidance",
    "VR/MR/XR safety studies"
  ]
};

export const mindControlPatterns = ${JSON.stringify(all, null, 2)};

export function registerMindControlPattern(pattern) {
  mindControlPatterns.push(pattern);
}

export function listMindControlPatterns() {
  return mindControlPatterns.slice();
}
`;

  fs.writeFileSync(canonicalPath, exportString, "utf8");
}

function writePending(remaining) {
  const pendingString = `export const pendingMindControlPatterns = ${JSON.stringify(
    remaining,
    null,
    2
  )};
`;
  fs.writeFileSync(pendingPath, pendingString, "utf8");
}

function writeReviewReport(promoted, needsHumanReview) {
  const report = {
    generatedAt: new Date().toISOString(),
    promoted: promoted.map((p) => ({
      id: p.pattern.id,
      label: p.pattern.label,
      score: p.score
    })),
    needsHumanReview: needsHumanReview.map((p) => ({
      id: p.pattern.id,
      label: p.pattern.label,
      score: p.score
    }))
  };

  fs.writeFileSync(reviewReportPath, JSON.stringify(report, null, 2), "utf8");
}
