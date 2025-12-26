// /packages/pattern-intel/src/detectors/mindcontrol-patterns.detector.js
import { mindControlPatterns } from "../db/patterns.mindcontrol.js";

export function analyzeDescriptionForMindControl(description, context = {}) {
  const text = (description || "").toLowerCase();
  const domain = (context.domain || "generic").toLowerCase();

  const matches = [];

  for (const pattern of mindControlPatterns) {
    if (!pattern.domains.includes(domain) && !pattern.domains.includes("generic")) {
      continue;
    }

    const signalHits = (pattern.signals || []).filter((s) => {
      const key = s.split(" ")[0].toLowerCase();
      return text.includes(key);
    });

    if (signalHits.length > 0) {
      matches.push({
        patternId: pattern.id,
        label: pattern.label,
        riskTags: pattern.riskTags,
        signalHits
      });
    }
  }

  return matches;
}
