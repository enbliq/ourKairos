import { describe, it, expect } from 'vitest';
import { FeatureFlagEngine } from '../index';
import type { FlagConfigSchema, UserContext } from '../types';

describe('FeatureFlagEngine', () => {
  describe('boolean flags', () => {
    it('should return true when flag is enabled', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'feature-a': { type: 'boolean', enabled: true }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      const user: UserContext = { id: 'user1' };
      
      expect(engine.isEnabled('feature-a', user)).toBe(true);
    });

    it('should return false when flag is disabled', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'feature-a': { type: 'boolean', enabled: false }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      const user: UserContext = { id: 'user1' };
      
      expect(engine.isEnabled('feature-a', user)).toBe(false);
    });
  });

  describe('percentage rollout', () => {
    it('should be deterministic for same user', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'feature-b': { type: 'percentage', percentage: 50 }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      const user: UserContext = { id: 'user123' };
      
      const result1 = engine.isEnabled('feature-b', user);
      const result2 = engine.isEnabled('feature-b', user);
      expect(result1).toBe(result2);
    });

    it('should enable 0% for no users', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'feature-c': { type: 'percentage', percentage: 0 }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      for (let i = 0; i < 100; i++) {
        const user: UserContext = { id: `user${i}` };
        expect(engine.isEnabled('feature-c', user)).toBe(false);
      }
    });

    it('should enable 100% for all users', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'feature-d': { type: 'percentage', percentage: 100 }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      for (let i = 0; i < 100; i++) {
        const user: UserContext = { id: `user${i}` };
        expect(engine.isEnabled('feature-d', user)).toBe(true);
      }
    });

    it('should distribute roughly according to percentage', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'feature-e': { type: 'percentage', percentage: 30 }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      let enabledCount = 0;
      const totalUsers = 1000;
      
      for (let i = 0; i < totalUsers; i++) {
        const user: UserContext = { id: `user${i}` };
        if (engine.isEnabled('feature-e', user)) {
          enabledCount++;
        }
      }
      
      const actualPercentage = (enabledCount / totalUsers) * 100;
      expect(actualPercentage).toBeGreaterThan(25);
      expect(actualPercentage).toBeLessThan(35);
    });
  });

  describe('user targeting', () => {
    it('should match eq operator', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'admin-feature': {
            type: 'targeting',
            rules: [
              { trait: 'role', operator: 'eq', value: 'admin', enabled: true }
            ],
            defaultEnabled: false
          }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      const admin: UserContext = { id: 'user1', traits: { role: 'admin' } };
      const user: UserContext = { id: 'user2', traits: { role: 'user' } };
      
      expect(engine.isEnabled('admin-feature', admin)).toBe(true);
      expect(engine.isEnabled('admin-feature', user)).toBe(false);
    });

    it('should match in operator', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'beta-feature': {
            type: 'targeting',
            rules: [
              { trait: 'tier', operator: 'in', value: ['premium', 'enterprise'], enabled: true }
            ],
            defaultEnabled: false
          }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      const premium: UserContext = { id: 'user1', traits: { tier: 'premium' } };
      const free: UserContext = { id: 'user2', traits: { tier: 'free' } };
      
      expect(engine.isEnabled('beta-feature', premium)).toBe(true);
      expect(engine.isEnabled('beta-feature', free)).toBe(false);
    });

    it('should match gt/lt operators', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'vip-feature': {
            type: 'targeting',
            rules: [
              { trait: 'score', operator: 'gt', value: 100, enabled: true }
            ],
            defaultEnabled: false
          }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      const highScore: UserContext = { id: 'user1', traits: { score: 150 } };
      const lowScore: UserContext = { id: 'user2', traits: { score: 50 } };
      
      expect(engine.isEnabled('vip-feature', highScore)).toBe(true);
      expect(engine.isEnabled('vip-feature', lowScore)).toBe(false);
    });

    it('should use default when no rules match', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'default-on': {
            type: 'targeting',
            rules: [
              { trait: 'role', operator: 'eq', value: 'admin', enabled: false }
            ],
            defaultEnabled: true
          }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      const user: UserContext = { id: 'user1', traits: { role: 'user' } };
      expect(engine.isEnabled('default-on', user)).toBe(true);
    });

    it('should return false for missing traits', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'trait-feature': {
            type: 'targeting',
            rules: [
              { trait: 'missing', operator: 'eq', value: 'value', enabled: true }
            ],
            defaultEnabled: false
          }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      
      const user: UserContext = { id: 'user1', traits: {} };
      expect(engine.isEnabled('trait-feature', user)).toBe(false);
    });
  });

  describe('unknown flags', () => {
    it('should return false for unknown flag', () => {
      const schema: FlagConfigSchema = { flags: {} };
      const engine = new FeatureFlagEngine(schema);
      const user: UserContext = { id: 'user1' };
      
      expect(engine.isEnabled('unknown-flag', user)).toBe(false);
    });
  });

  describe('getEnabledFlags', () => {
    it('should return all enabled flags for user', () => {
      const schema: FlagConfigSchema = {
        flags: {
          'flag-a': { type: 'boolean', enabled: true },
          'flag-b': { type: 'boolean', enabled: false },
          'flag-c': { type: 'percentage', percentage: 100 }
        }
      };
      const engine = new FeatureFlagEngine(schema);
      const user: UserContext = { id: 'user1' };
      
      const enabled = engine.getEnabledFlags(user);
      expect(enabled).toContain('flag-a');
      expect(enabled).toContain('flag-c');
      expect(enabled).not.toContain('flag-b');
    });
  });
});
