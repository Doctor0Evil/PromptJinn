// /packages/simulation-lab/src/engines/risk-projection.engine.js
import { riskLevels } from "@promptjinn/core-kernel";

export function projectRiskFromTimeline(timeline) {
  const anomalies = timeline.filter((p) => p.anomalyScore > 0.8);

  if (anomalies.length === 0) {
    return riskLevels.LOW;
  }

  if (anomalies.length < timeline.length * 0.1) {
    return riskLevels.MEDIUM;
  }

  return riskLevels.HIGH;
}
