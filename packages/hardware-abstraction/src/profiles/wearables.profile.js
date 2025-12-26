// /packages/hardware-abstraction/src/profiles/wearables.profile.js
export const wearableHardwareProfile = {
  id: "wearable_eeg_v1",
  class: "wearable",
  latencyMs: 25,
  bandwidthKbps: 64,
  channelTypes: ["surface_potential"],
  closedLoopCapable: false,
  invasive: false
};
