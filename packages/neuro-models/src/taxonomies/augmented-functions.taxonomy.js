// /packages/neuro-models/src/taxonomies/augmented-functions.taxonomy.js
export const augmentedFunctionTypes = [
  "sensory_extension",
  "memory_support",
  "motor_assist",
  "cognitive_scaling",
  "emotional_regulation",
  "unknown_experimental"
];

export const unknownFunctionTemplate = {
  id: null,
  label: "unlabeled_function",
  description: "",
  riskLevel: "UNKNOWN",
  inputModalities: [],
  outputModalities: [],
  reversible: true,
  requiresOversight: true
};
