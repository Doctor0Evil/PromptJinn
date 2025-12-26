// /apps/research-console/src/index.js
import {
  registerUnknownFunction,
  listUnknownFunctions
} from "@promptjinn/neuro-models";
import { implantHardwareProfile } from "@promptjinn/hardware-abstraction";
import { buildEthicalSimulationReport } from "@promptjinn/reporting-engine";

async function main() {
  const uf = registerUnknownFunction({
    label: "experimental_affective_modulator",
    description:
      "Unknown function altering affective state in response to task performance.",
    outputModalities: ["affective_state"],
    inputModalities: ["performance_metrics"],
    reversible: false,
    requiresOversight: true
  });

  console.log("Registered unknown function:");
  console.log(uf);

  const all = listUnknownFunctions();
  console.log("\nCurrent unknown functions in registry:");
  console.log(all);

  const neurodataPlan = {
    explicitConsent: false,
    sharedWithThirdParties: false,
    longTermProfiling: true
  };

  const report = await buildEthicalSimulationReport({
    unknownFunctionId: uf.id,
    hardwareProfile: implantHardwareProfile,
    neurodataPlan,
    durationSec: 10
  });

  console.log("\n=== ETHICAL SIMULATION REPORT ===");
  console.log(JSON.stringify(report, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
