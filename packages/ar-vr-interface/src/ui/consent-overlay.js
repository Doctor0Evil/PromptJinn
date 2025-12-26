// /packages/ar-vr-interface/src/ui/consent-overlay.js
export function buildConsentOverlay({ title, description, options }) {
  return {
    type: "overlay",
    title,
    description,
    options: options || [
      { id: "proceed", label: "Proceed", value: "proceed" },
      { id: "reduce_intensity", label: "Reduce intensity", value: "reduce_intensity" },
      { id: "stop_now", label: "Stop / disconnect now", value: "stop" },
    ],
  };
}
