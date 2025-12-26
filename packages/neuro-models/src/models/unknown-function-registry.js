// /packages/neuro-models/src/models/unknown-function-registry.js
import { unknownFunctionTemplate } from "../taxonomies/augmented-functions.taxonomy.js";

const registry = new Map();

export function registerUnknownFunction(definition) {
  const id = definition.id || `uf_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  const entry = { ...unknownFunctionTemplate, ...definition, id };
  registry.set(id, entry);
  return entry;
}

export function listUnknownFunctions() {
  return Array.from(registry.values());
}
