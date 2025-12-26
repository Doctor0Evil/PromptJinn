// /packages/pattern-intel/src/detectors/dark-patterns.detector.js
export function detectDarkPatterns(interactionLog) {
  const findings = [];

  const repeatedForcedChoice = interactionLog.filter(
    (e) => e.type === "choice" && e.options.every((o) => o.isOptIn === true)
  );

  if (repeatedForcedChoice.length > 3) {
    findings.push({
      code: "NO_TRUE_OPT_OUT",
      severity: "HIGH",
      message: "User was not presented with a genuine opt-out option.",
    });
  }

  return findings;
}
