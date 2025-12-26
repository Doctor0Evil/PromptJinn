// /packages/reporting-engine/src/index.js
import {
  generateSafetyHypotheses,
  getUnknownFunction
} from "@promptjinn/neuro-models";
import { validateSessionConfig } from "@promptjinn/neuro-ethics-guard";
import {
  simulateClosedLoopUnknown,
  projectRiskFromTimeline
} from "@promptjinn/simulation-lab";

export async function buildEthicalSimulationReport({
  unknownFunctionId,
  hardwareProfile,
  neurodataPlan,
  durationSec
}) {
  const uf = getUnknownFunction(unknownFunctionId);
  if (!uf) {
    throw new Error(`Unknown function not found: ${unknownFunctionId}`);
  }

  const sessionConfig = {
    context: {
      modality: "neuroadaptive",
      hardwareClass: hardwareProfile.class,
      dataSensitivity: "neurodata_raw"
    },
    neurodataPlan
  };

  const ethics = validateSessionConfig(sessionConfig);

  const timeline = simulateClosedLoopUnknown({
    unknownFunction: uf,
    hardwareProfile,
    durationSec
  });

  const projectedRisk = projectRiskFromTimeline(timeline);
  const hypotheses = generateSafetyHypotheses(uf, hardwareProfile);

  return {
    unknownFunction: uf,
    hardwareProfile,
    ethics,
    projectedRisk,
    hypotheses,
    timelineSummary: {
      steps: timeline.length,
      anomalyRate:
        timeline.filter((p) => p.anomalyScore > 0.8).length / timeline.length
    }
  };
}
