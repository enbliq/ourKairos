import type { FlagConfig, FlagConfigSchema, TargetingRule } from './types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

function validateTargetingRule(rule: TargetingRule, flagKey: string): void {
  if (!rule.trait || typeof rule.trait !== 'string') {
    throw new ValidationError(`Flag "${flagKey}": rule must have a valid trait`);
  }

  const validOperators = ['eq', 'ne', 'in', 'gt', 'lt'];
  if (!validOperators.includes(rule.operator)) {
    throw new ValidationError(`Flag "${flagKey}": invalid operator "${rule.operator}"`);
  }

  if (rule.operator === 'in' && !Array.isArray(rule.value)) {
    throw new ValidationError(`Flag "${flagKey}": "in" operator requires array value`);
  }

  if (typeof rule.enabled !== 'boolean') {
    throw new ValidationError(`Flag "${flagKey}": rule.enabled must be boolean`);
  }
}

function validateFlagConfig(flagKey: string, config: FlagConfig): void {
  if (!config.type) {
    throw new ValidationError(`Flag "${flagKey}": missing type`);
  }

  switch (config.type) {
    case 'boolean':
      if (typeof config.enabled !== 'boolean') {
        throw new ValidationError(`Flag "${flagKey}": boolean flag must have enabled property`);
      }
      break;

    case 'percentage':
      if (typeof config.percentage !== 'number' || config.percentage < 0 || config.percentage > 100) {
        throw new ValidationError(`Flag "${flagKey}": percentage must be between 0 and 100`);
      }
      break;

    case 'targeting':
      if (!Array.isArray(config.rules)) {
        throw new ValidationError(`Flag "${flagKey}": targeting flag must have rules array`);
      }
      if (typeof config.defaultEnabled !== 'boolean') {
        throw new ValidationError(`Flag "${flagKey}": targeting flag must have defaultEnabled`);
      }
      config.rules.forEach(rule => validateTargetingRule(rule, flagKey));
      break;

    default:
      throw new ValidationError(`Flag "${flagKey}": unknown type "${(config as any).type}"`);
  }
}

export function validateSchema(schema: FlagConfigSchema): void {
  if (!schema.flags || typeof schema.flags !== 'object') {
    throw new ValidationError('Schema must have a flags object');
  }

  for (const [flagKey, config] of Object.entries(schema.flags)) {
    validateFlagConfig(flagKey, config);
  }
}
