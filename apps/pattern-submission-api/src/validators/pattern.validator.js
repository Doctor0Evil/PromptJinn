// /apps/pattern-submission-api/src/validators/pattern.validator.js
export function validatePatternProposal(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object") {
    errors.push("Payload must be an object.");
    return { valid: false, errors };
  }

  const required = ["id", "label", "domains", "signals", "riskTags"];
  required.forEach((key) => {
    if (!payload[key]) errors.push(`Missing required field: ${key}`);
  });

  if (!Array.isArray(payload.domains) || payload.domains.length === 0) {
    errors.push("domains must be a non-empty array.");
  }

  if (!Array.isArray(payload.signals) || payload.signals.length === 0) {
    errors.push("signals must be a non-empty array.");
  }

  if (!Array.isArray(payload.riskTags) || payload.riskTags.length === 0) {
    errors.push("riskTags must be a non-empty array.");
  }

  return { valid: errors.length === 0, errors };
}
