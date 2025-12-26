// /packages/hardware-abstraction/src/profiles/implants.profile.js
export const implantHardwareProfile = {
  id: "implant_generic_v1",
  class: "implant",
  latencyMs: 5,
  bandwidthKbps: 256,
  channelTypes: ["spike_train", "local_field_potential"],
  closedLoopCapable: true,
  invasive: true
};
