// /packages/hardware-abstraction/src/profiles/implants.profile.js
export const implantHardwareProfile = {
  class: "implant",
  latencyMs: 5,
  bandwidthKbps: 256,
  channelTypes: ["spike_train", "local_field_potential"],
  closedLoopCapable: true,
  invasive: true,
};
