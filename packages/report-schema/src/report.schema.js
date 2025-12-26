// /packages/report-schema/src/report.schema.js
export const ethicalSimulationReportSchema = {
  $id: "https://promptjinn.org/schema/ethical-simulation-report.json",
  type: "object",
  required: ["unknownFunction", "hardwareProfile", "ethics", "projectedRisk"],
  properties: {
    unknownFunction: {
      type: "object",
      required: ["id", "label", "riskLevel"],
      properties: {
        id: { type: "string" },
        label: { type: "string" },
        description: { type: "string" },
        riskLevel: { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "UNKNOWN"] }
      }
    },
    hardwareProfile: {
      type: "object",
      required: ["id", "class"],
      properties: {
        id: { type: "string" },
        class: { type: "string" }
      }
    },
    ethics: {
      type: "object",
      required: ["risk", "violations", "approved"],
      properties: {
        risk: { type: "string" },
        approved: { type: "boolean" },
        violations: {
          type: "array",
          items: {
            type: "object",
            required: ["code", "severity", "message"],
            properties: {
              code: { type: "string" },
              severity: { type: "string" },
              message: { type: "string" }
            }
          }
        }
      }
    },
    projectedRisk: {
      type: "string",
      enum: ["LOW", "MEDIUM", "HIGH", "UNKNOWN"]
    },
    hypotheses: {
      type: "array",
      items: { type: "string" }
    },
    timelineSummary: {
      type: "object",
      properties: {
        steps: { type: "integer" },
        anomalyRate: { type: "number" }
      }
    }
  },
  additionalProperties: false
};
