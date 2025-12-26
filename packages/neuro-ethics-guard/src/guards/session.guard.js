// /packages/neuro-ethics-guard/src/guards/session.guard.js
import { classifyRisk } from "@promptjinn/core-kernel";

import { evaluateNeurodataPlan } from "../principles/neurorights.js";

export function validateSessionConfig(sessionConfig) {
  const risk = classifyRisk(sessionConfig.context);
  const neuroFindings = evaluateNeurodataPlan(sessionConfig.neurodataPlan || {});

  return {
    risk,
    violations: neuroFindings,
    approved: risk !== "HIGH" && neuroFindings.length === 0
  };
}
