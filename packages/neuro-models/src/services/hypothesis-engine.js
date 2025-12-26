// /packages/neuro-models/src/services/hypothesis-engine.js
export function generateSafetyHypotheses(unknownFunction, hardwareProfile) {
  const hypotheses = [];

  if (hardwareProfile.class === "implant") {
    hypotheses.push(
      "Continuous monitoring for unintended closed-loop behavior."
    );
  }

  if (unknownFunction.outputModalities.includes("affective_state")) {
    hypotheses.push(
      "Independent assessment of mood manipulation and dependency risk."
    );
  }

  if (unknownFunction.reversible !== true) {
    hypotheses.push(
      "Disallow deployment until a validated rollback path is engineered."
    );
  }

  if (unknownFunction.requiresOversight === true) {
    hypotheses.push("Require human clinical oversight for all deployments.");
  }

  return hypotheses;
}
