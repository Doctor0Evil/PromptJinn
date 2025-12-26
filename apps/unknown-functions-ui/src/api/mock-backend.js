// /apps/unknown-functions-ui/src/api/mock-backend.js
import {
  registerUnknownFunction,
  listUnknownFunctions
} from "@promptjinn/neuro-models";
import { implantHardwareProfile } from "@promptjinn/hardware-abstraction";
import { buildEthicalSimulationReport } from "@promptjinn/reporting-engine";
import { validateEthicalSimulationReport } from "@promptjinn/report-schema";

let initialized = false;

async function init() {
  if (initialized) return;
  registerUnknownFunction({
    id: "uf_ui_demo",
    label: "focus_bias_modulator",
    description:
      "Modulates attention around certain visual or conceptual targets; risk of covert persuasion.",
    outputModalities: ["attention_bias", "affective_state"],
    inputModalities: ["visual_stream"],
    reversible: true,
    requiresOversight: true
  });
  initialized = true;
}

export async function fetchUnknownFunctions() {
  await init();
  return listUnknownFunctions();
}

export async function fetchReport(unknownFunctionId) {
  await init();
  const neurodataPlan = {
    explicitConsent: false,
    sharedWithThirdParties: false,
    longTermProfiling: true
  };

  const report = await buildEthicalSimulationReport({
    unknownFunctionId,
    hardwareProfile: implantHardwareProfile,
    neurodataPlan,
    durationSec: 8
  });

  const validation = validateEthicalSimulationReport(report);
  if (!validation.valid) {
    console.warn("Report validation errors:", validation.errors);
  }

  return report;
}
