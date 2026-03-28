import type { FlagConfig, UserContext, TargetingRule } from './types';
import { getPercentageBucket } from './hash';

function evaluateTargetingRule(rule: TargetingRule, user: UserContext): boolean {
  const traitValue = user.traits?.[rule.trait];
  
  if (traitValue === undefined) {
    return false;
  }

  switch (rule.operator) {
    case 'eq':
      return traitValue === rule.value;
    
    case 'ne':
      return traitValue !== rule.value;
    
    case 'in':
      return Array.isArray(rule.value) && rule.value.includes(traitValue);
    
    case 'gt':
      return typeof traitValue === 'number' && typeof rule.value === 'number' && traitValue > rule.value;
    
    case 'lt':
      return typeof traitValue === 'number' && typeof rule.value === 'number' && traitValue < rule.value;
    
    default:
      return false;
  }
}

export function evaluateFlag(flagKey: string, config: FlagConfig, user: UserContext): boolean {
  switch (config.type) {
    case 'boolean':
      return config.enabled;

    case 'percentage': {
      const bucket = getPercentageBucket(user.id, flagKey);
      return bucket < config.percentage;
    }

    case 'targeting': {
      for (const rule of config.rules) {
        if (evaluateTargetingRule(rule, user)) {
          return rule.enabled;
        }
      }
      return config.defaultEnabled;
    }

    default:
      return false;
  }
}
