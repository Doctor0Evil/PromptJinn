// /packages/report-schema/src/validator.js
import { ethicalSimulationReportSchema } from "./report.schema.js";

export function validateEthicalSimulationReport(report) {
  const errors = [];

  function require(path, obj, key) {
    if (!(key in obj)) {
      errors.push(`Missing required property "${path}.${key}"`);
    }
  }

  if (typeof report !== "object" || report === null) {
    errors.push("Report must be an object.");
  }

  if (report.unknownFunction) {
    require("unknownFunction", report.unknownFunction, "id");
    require("unknownFunction", report.unknownFunction, "label");
  } else {
    errors.push('Missing "unknownFunction" object.');
  }

  if (report.hardwareProfile) {
    require("hardwareProfile", report.hardwareProfile, "id");
    require("hardwareProfile", report.hardwareProfile, "class");
  } else {
    errors.push('Missing "hardwareProfile" object.');
  }

  if (!report.ethics) {
    errors.push('Missing "ethics" object.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
