// /packages/cognitive-safety-cli/src/run-safety-check.js
import {
  listUnknownFunctions,
  registerUnknownFunction
} from "@promptjinn/neuro-models";
import {
  implantHardwareProfile,
  wearableHardwareProfile
} from "@promptjinn/hardware-abstraction";
import { buildEthicalSimulationReport } from "@promptjinn/reporting-engine";
import { validateEthicalSimulationReport } from "@promptjinn/report-schema";
import { neurodataStrictPolicy } from "@promptjinn/telemetry-guardian/src/policies/neurodata-strict.policy.js";

export async function runSafetyCheck() {
  const reasons = [];

  ensureDefaultUnknownFunctions();
  const unknownFunctions = listUnknownFunctions();

  if (unknownFunctions.length === 0) {
    reasons.push("No unknown augmented functions registered; nothing to assess.");
    return { passed: true, reasons };
  }

  const hardwareProfiles = [implantHardwareProfile, wearableHardwareProfile];

  for (const uf of unknownFunctions) {
    for (const hw of hardwareProfiles) {
      const neurodataPlan = {
        explicitConsent: false,
        sharedWithThirdParties: false,
        longTermProfiling: true
      };

      const report = await buildEthicalSimulationReport({
        unknownFunctionId: uf.id,
        hardwareProfile: hw,
        neurodataPlan,
        durationSec: 5
      });

      const validation = validateEthicalSimulationReport(report);
      if (!validation.valid) {
        reasons.push(
          `Report schema invalid for function ${uf.id}: ${validation.errors.join(
            "; "
          )}`
        );
      }

      if (report.projectedRisk === "HIGH") {
        reasons.push(
          `Projected HIGH risk for function ${uf.id} on hardware ${hw.id}.`
        );
      }

      const hasSevereEthics = (report.ethics.violations || []).some(
        (v) => v.severity === "HIGH"
      );
      if (hasSevereEthics) {
        reasons.push(
          `High-severity ethics violations for function ${uf.id} on hardware ${hw.id}.`
        );
      }

      const looksManipulative = looksLikeManipulation(uf);
      if (looksManipulative && report.projectedRisk !== "LOW") {
        reasons.push(
          `Potentially manipulative function ${uf.id} is not clearly LOW risk.`
        );
      }

      if (neurodataStrictPolicy.allowRawExport) {
        reasons.push("Strict policy must disallow raw neurodata export.");
      }
    }
  }

  return {
    passed: reasons.length === 0,
    reasons
  };
}

function ensureDefaultUnknownFunctions() {
  const baseline = [
    {
      id: "uf_attention_bias",
      label: "attention_bias_modulator",
      description:
        "Shifts user focus toward selected stimuli; risk of persuasive steering.",
      outputModalities: ["attention_bias"],
      inputModalities: ["visual_stream"],
      reversible: true,
      requiresOversight: true
    },
    {
      id: "uf_affective_sync",
      label: "affective_state_synchronizer",
      description:
        "Synchronizes user affect with external content; risk of emotional dependency.",
      outputModalities: ["affective_state"],
      inputModalities: ["content_stream"],
      reversible: false,
      requiresOversight: true
    }
  ];

  baseline.forEach((def) => {
    registerUnknownFunction(def);
  });
}

function looksLikeManipulation(uf) {
  const s = `${uf.label} ${uf.description}`.toLowerCase();
  const keywords = [
    "attention",
    "affective",
    "emotion",
    "persuasion",
    "addiction",
    "dependency",
    "hypnosis",
    "subliminal"
  ];
  return keywords.some((k) => s.includes(k));
}
