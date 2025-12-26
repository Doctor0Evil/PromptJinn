// /packages/pattern-reviewer/src/risk-scoring.js
const HIGH_RISK_TAGS = [
  "hypnosis_like",
  "coercive",
  "high_risk",
  "addiction",
  "political_risk"
];

const XR_DOMAINS = ["vr", "xr", "mr", "ar", "games"];

export function autoScorePattern(pattern) {
  const riskTags = pattern.riskTags || [];
  const domains = pattern.domains || [];

  const hasHighRiskTag = riskTags.some((t) => HIGH_RISK_TAGS.includes(t));
  const targetsXR = domains.some((d) => XR_DOMAINS.includes(d));

  let score = 0;

  if (hasHighRiskTag) score += 2;
  if (targetsXR) score += 1;
  if (!pattern.mitigation || pattern.mitigation.length === 0) score += 1;
  if (!pattern.detectionHints || pattern.detectionHints.length === 0) score += 1;

  let bucket = "LOW";
  if (score >= 3) bucket = "HIGH";
  else if (score >= 1) bucket = "MEDIUM";

  return {
    score,
    bucket,
    reasons: {
      hasHighRiskTag,
      targetsXR,
      missingMitigation: !pattern.mitigation || pattern.mitigation.length === 0,
      missingDetectionHints:
        !pattern.detectionHints || pattern.detectionHints.length === 0
    }
  };
}
