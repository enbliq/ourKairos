import { describe, it, expect } from 'vitest';
import { validateSchema, ValidationError } from '../validator';
import type { FlagConfigSchema } from '../types';

describe('validateSchema', () => {
  it('should accept valid boolean flag', () => {
    const schema: FlagConfigSchema = {
      flags: {
        'test-flag': { type: 'boolean', enabled: true }
      }
    };
    expect(() => validateSchema(schema)).not.toThrow();
  });

  it('should accept valid percentage flag', () => {
    const schema: FlagConfigSchema = {
      flags: {
        'test-flag': { type: 'percentage', percentage: 50 }
      }
    };
    expect(() => validateSchema(schema)).not.toThrow();
  });

  it('should accept valid targeting flag', () => {
    const schema: FlagConfigSchema = {
      flags: {
        'test-flag': {
          type: 'targeting',
          rules: [
            { trait: 'role', operator: 'eq', value: 'admin', enabled: true }
          ],
          defaultEnabled: false
        }
      }
    };
    expect(() => validateSchema(schema)).not.toThrow();
  });

  it('should reject percentage out of range', () => {
    const schema: FlagConfigSchema = {
      flags: {
        'test-flag': { type: 'percentage', percentage: 150 }
      }
    };
    expect(() => validateSchema(schema)).toThrow(ValidationError);
  });

  it('should reject invalid operator', () => {
    const schema: FlagConfigSchema = {
      flags: {
        'test-flag': {
          type: 'targeting',
          rules: [
            { trait: 'role', operator: 'invalid' as any, value: 'admin', enabled: true }
          ],
          defaultEnabled: false
        }
      }
    };
    expect(() => validateSchema(schema)).toThrow(ValidationError);
  });

  it('should reject "in" operator without array', () => {
    const schema: FlagConfigSchema = {
      flags: {
        'test-flag': {
          type: 'targeting',
          rules: [
            { trait: 'role', operator: 'in', value: 'admin', enabled: true }
          ],
          defaultEnabled: false
        }
      }
    };
    expect(() => validateSchema(schema)).toThrow(ValidationError);
  });
});
