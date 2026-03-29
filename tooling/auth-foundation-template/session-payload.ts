import type { AuthSessionPayload, SenderIdentity } from "./auth.types";

export const createSessionPayload = (
  identity: SenderIdentity
): AuthSessionPayload => ({
  sub: identity.userId,
  email: identity.email,
  issuedAt: new Date().toISOString()
});
