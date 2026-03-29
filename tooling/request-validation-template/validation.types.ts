export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  issues?: ValidationIssue[];
}

export type Validator<T> = (value: unknown) => ValidationResult<T>;
