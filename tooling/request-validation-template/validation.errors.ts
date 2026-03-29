import type { ValidationIssue } from "./validation.types";

export interface ValidationErrorPayload {
  error: "validation_error";
  issues: ValidationIssue[];
}

export const toValidationErrorPayload = (
  issues: ValidationIssue[]
): ValidationErrorPayload => ({
  error: "validation_error",
  issues
});
