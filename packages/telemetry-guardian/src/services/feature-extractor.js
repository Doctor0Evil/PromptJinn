// /packages/telemetry-guardian/src/services/feature-extractor.js
export function extractSafeFeatures(rawWindow) {
  const { channelId, samples, sampleRate } = rawWindow;
  if (!Array.isArray(samples) || samples.length === 0) {
    throw new Error("Invalid rawWindow: missing samples.");
  }

  const mean =
    samples.reduce((sum, v) => sum + v, 0) / samples.length;

  const variance =
    samples.reduce((sum, v) => sum + (v - mean) * (v - mean), 0) /
    samples.length;

  return {
    channelId,
    sampleRate,
    bandpower: variance,
    event_rate: 0
  };
}
