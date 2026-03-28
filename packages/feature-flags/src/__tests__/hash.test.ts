import { describe, it, expect } from 'vitest';
import { hashString, getPercentageBucket } from '../hash';

describe('hashString', () => {
  it('should return consistent hash for same input', () => {
    const hash1 = hashString('test');
    const hash2 = hashString('test');
    expect(hash1).toBe(hash2);
  });

  it('should return different hashes for different inputs', () => {
    const hash1 = hashString('test1');
    const hash2 = hashString('test2');
    expect(hash1).not.toBe(hash2);
  });

  it('should return positive numbers', () => {
    const hash = hashString('test');
    expect(hash).toBeGreaterThanOrEqual(0);
  });
});

describe('getPercentageBucket', () => {
  it('should return value between 0 and 99', () => {
    const bucket = getPercentageBucket('user123', 'feature-x');
    expect(bucket).toBeGreaterThanOrEqual(0);
    expect(bucket).toBeLessThan(100);
  });

  it('should be deterministic for same user and flag', () => {
    const bucket1 = getPercentageBucket('user123', 'feature-x');
    const bucket2 = getPercentageBucket('user123', 'feature-x');
    expect(bucket1).toBe(bucket2);
  });

  it('should return different values for different users', () => {
    const bucket1 = getPercentageBucket('user1', 'feature-x');
    const bucket2 = getPercentageBucket('user2', 'feature-x');
    // Statistically very unlikely to be equal
    expect(bucket1).not.toBe(bucket2);
  });

  it('should return different values for different flags', () => {
    const bucket1 = getPercentageBucket('user123', 'feature-a');
    const bucket2 = getPercentageBucket('user123', 'feature-b');
    expect(bucket1).not.toBe(bucket2);
  });
});
