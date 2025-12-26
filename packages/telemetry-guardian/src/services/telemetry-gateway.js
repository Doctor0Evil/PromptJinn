// /packages/telemetry-guardian/src/services/telemetry-gateway.js
import { neurodataStrictPolicy } from "../policies/neurodata-strict.policy.js";
import { extractSafeFeatures } from "./feature-extractor.js";

export class TelemetryGateway {
  constructor({ consentSession }) {
    this.consentSession = consentSession;
  }

  exportRawNeuralData() {
    throw new Error("Raw neurodata export is disabled by strict policy.");
  }

  exportDerivedFeatures(rawWindow) {
    if (!this.consentSession || this.consentSession.revoked) {
      throw new Error("No active consent session for neurodata export.");
    }
    if (!this.consentSession.scopes.includes("neurodata_features")) {
      throw new Error("Consent does not include neurodata_features scope.");
    }

    const features = extractSafeFeatures(rawWindow);

    return {
      truncated: true,
      temporalResolutionMs: neurodataStrictPolicy.maxTemporalResolutionMs,
      features
    };
  }
}
