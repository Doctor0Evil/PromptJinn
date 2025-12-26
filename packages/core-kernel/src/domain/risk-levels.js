// /packages/core-kernel/src/domain/risk-levels.js
export const riskLevels = Object.freeze({
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  UNKNOWN: "UNKNOWN",
});

export function classifyRisk({ modality, hardwareClass, dataSensitivity }) {
  if (dataSensitivity === "neurodata_raw") return riskLevels.HIGH;
  if (hardwareClass === "implant" && modality === "closed_loop") {
    return riskLevels.HIGH;
  }
  if (dataSensitivity === "behavioral_derived") return riskLevels.MEDIUM;
  return riskLevels.UNKNOWN;
}
