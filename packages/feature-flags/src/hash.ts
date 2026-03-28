/**
 * Simple deterministic hash function for percentage rollout
 * Uses a basic string hashing algorithm to ensure consistent results
 */
export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Calculate percentage bucket (0-100) for a given user and flag
 * Deterministic: same userId + flagKey always returns same value
 */
export function getPercentageBucket(userId: string, flagKey: string): number {
  const combined = `${userId}:${flagKey}`;
  const hash = hashString(combined);
  return hash % 100;
}
