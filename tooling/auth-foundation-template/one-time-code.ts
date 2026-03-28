import { randomInt } from "node:crypto";

export const generateOneTimeCode = (length = 6): string => {
  let value = "";
  while (value.length < length) {
    value += randomInt(0, 10).toString();
  }
  return value.slice(0, length);
};

export const createAuthChallenge = (identifier: string, ttlMinutes = 10) => ({
  identifier,
  code: generateOneTimeCode(),
  expiresAt: new Date(Date.now() + ttlMinutes * 60 * 1000).toISOString()
});
