// /packages/neuro-ethics-guard/src/guards/session.guard.js
import { classifyRisk } from "../../core-kernel/src/domain/risk-levels.js";
import { evaluateNeurodataPlan } from "../principles/neurorights.js";

export function validateSessionConfig(sessionConfig) {
  const risk = classifyRisk(sessionConfig.context);
  const neuroFindings = evaluateNeurodataPlan(sessionConfig.neurodataPlan || {});

  return {
    risk,
    violations: neuroFindings,
    approved: risk !== "HIGH" && neuroFindings.length === 0,
  };
}
