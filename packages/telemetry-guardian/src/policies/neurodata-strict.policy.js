// /packages/telemetry-guardian/src/policies/neurodata-strict.policy.js
export const neurodataStrictPolicy = {
  allowRawExport: false,
  allowStreamingToCloud: false,
  allowedDerivedFeatures: ["bandpower", "coherence", "event_rate"],
  maxTemporalResolutionMs: 200,
  requireExplicitConsent: true,
  blockBehavioralPrediction: true
};
