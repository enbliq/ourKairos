import type { ValidationResult } from "./validation.types";

export interface CreateCapsuleShape {
  title: string;
  unlockDate: string;
}

export const validateCreateCapsule = (
  value: unknown
): ValidationResult<CreateCapsuleShape> => {
  const issues = [];

  if (typeof value !== "object" || value === null) {
    return {
      success: false,
      issues: [{ field: "body", message: "Request body must be an object" }]
    };
  }

  const record = value as Record<string, unknown>;

  if (typeof record.title !== "string" || record.title.trim().length < 3) {
    issues.push({
      field: "title",
      message: "Title must be at least 3 characters long"
    });
  }

  if (typeof record.unlockDate !== "string" || Number.isNaN(Date.parse(record.unlockDate))) {
    issues.push({
      field: "unlockDate",
      message: "Unlock date must be a valid ISO date string"
    });
  }

  if (issues.length > 0) {
    return { success: false, issues };
  }

  return {
    success: true,
    data: {
      title: record.title.trim(),
      unlockDate: record.unlockDate
    }
  };
};
