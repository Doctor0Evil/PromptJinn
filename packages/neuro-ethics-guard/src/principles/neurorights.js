// /packages/neuro-ethics-guard/src/principles/neurorights.js
export const neurorightsPrinciples = {
  cognitiveLiberty: true,
  mentalPrivacy: true,
  mentalIntegrity: true,
  psychologicalContinuity: true,
};

export function evaluateNeurodataPlan(plan) {
  const findings = [];

  if (!plan.explicitConsent) {
    findings.push({
      code: "CONSENT_MISSING",
      severity: "HIGH",
      message: "Neurodata collection without explicit, revocable consent.",
    });
  }

  if (plan.sharedWithThirdParties === true) {
    findings.push({
      code: "THIRD_PARTY_SHARING",
      severity: "HIGH",
      message: "Neurodata sharing with third parties is disallowed by default.",
    });
  }

  if (plan.longTermProfiling === true) {
    findings.push({
      code: "LONG_TERM_PROFILING",
      severity: "MEDIUM",
      message: "Long-term profiling of cognitive states requires separate oversight.",
    });
  }

  return findings;
}
