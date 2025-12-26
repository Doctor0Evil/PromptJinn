// /packages/telemetry-sanitizer/src/policies/neurodata-minimization.policy.js
export const neurodataMinimizationPolicy = {
  allowRawNeuralExport: false,
  allowDerivedFeatures: true,
  maxTemporalResolutionMs: 100,
  allowedFeatures: ["bandpower", "coherence", "event_rate"],
};
