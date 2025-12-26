// /packages/core-kernel/src/config/runtime.defaults.js
export const runtimeDefaults = {
  env: "research",
  strictMode: true,
  traceLevel: "info",
  maxConcurrentExperiments: 8,
  allowedDataOrigins: ["local", "sandbox"],
  disallowedDataOrigins: ["ad-tech", "social-graph"],
};
