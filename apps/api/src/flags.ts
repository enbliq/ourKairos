import { FeatureFlagEngine, type FlagConfigSchema } from '@repo/feature-flags';

const schema: FlagConfigSchema = {
  environment: process.env.NODE_ENV ?? 'development',
  flags: {
    // Phase 2 risky features – off by default, enable via env overrides or targeting
    'gift-flow': {
      type: 'boolean',
      enabled: process.env.FLAG_GIFT_FLOW === 'true',
    },
    'reminders': {
      type: 'boolean',
      enabled: process.env.FLAG_REMINDERS === 'true',
    },
    'email-delivery': {
      type: 'boolean',
      enabled: process.env.FLAG_EMAIL_DELIVERY === 'true',
    },
  },
};

export const flags = new FeatureFlagEngine(schema);

/**
 * Flags and their defaults per environment:
 *
 * | Flag            | dev   | demo  | prod  |
 * |-----------------|-------|-------|-------|
 * | gift-flow       | false | false | false |
 * | reminders       | false | false | false |
 * | email-delivery  | false | false | false |
 *
 * Enable any flag by setting the corresponding env var to "true":
 *   FLAG_GIFT_FLOW=true
 *   FLAG_REMINDERS=true
 *   FLAG_EMAIL_DELIVERY=true
 */
