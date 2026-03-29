export interface UserContext {
  id: string;
  traits?: Record<string, string | number | boolean>;
}

export interface BooleanFlag {
  type: 'boolean';
  enabled: boolean;
}

export interface PercentageRolloutFlag {
  type: 'percentage';
  percentage: number; // 0-100
}

export interface UserTargetingFlag {
  type: 'targeting';
  rules: TargetingRule[];
  defaultEnabled: boolean;
}

export interface TargetingRule {
  trait: string;
  operator: 'eq' | 'ne' | 'in' | 'gt' | 'lt';
  value: string | number | boolean | (string | number | boolean)[];
  enabled: boolean;
}

export type FlagConfig = BooleanFlag | PercentageRolloutFlag | UserTargetingFlag;

export interface FlagConfigSchema {
  flags: Record<string, FlagConfig>;
  environment?: string;
}
