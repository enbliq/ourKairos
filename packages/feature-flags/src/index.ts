import type { FlagConfigSchema, UserContext } from './types';
import { validateSchema } from './validator';
import { evaluateFlag } from './engine';

export * from './types';
export { ValidationError } from './validator';

export class FeatureFlagEngine {
  private schema: FlagConfigSchema;

  constructor(schema: FlagConfigSchema) {
    validateSchema(schema);
    this.schema = schema;
  }

  /**
   * Check if a feature flag is enabled for a given user
   */
  isEnabled(flagKey: string, user: UserContext): boolean {
    const config = this.schema.flags[flagKey];
    
    if (!config) {
      return false; // Unknown flags default to disabled
    }

    return evaluateFlag(flagKey, config, user);
  }

  /**
   * Get all enabled flags for a user
   */
  getEnabledFlags(user: UserContext): string[] {
    return Object.keys(this.schema.flags).filter(flagKey => 
      this.isEnabled(flagKey, user)
    );
  }

  /**
   * Get environment name
   */
  getEnvironment(): string | undefined {
    return this.schema.environment;
  }
}

/**
 * Convenience function to create and use engine in one call
 */
export function isFeatureEnabled(
  schema: FlagConfigSchema,
  flagKey: string,
  user: UserContext
): boolean {
  const engine = new FeatureFlagEngine(schema);
  return engine.isEnabled(flagKey, user);
}
