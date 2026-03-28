import type { AuthChallenge, SenderIdentity } from "./auth.types";
import { createAuthChallenge } from "./one-time-code";

export interface AuthService {
  issueChallenge(identifier: string): Promise<AuthChallenge>;
  resolveIdentity(identifier: string): Promise<SenderIdentity>;
}

export const createStubAuthService = (): AuthService => ({
  async issueChallenge(identifier: string) {
    return createAuthChallenge(identifier);
  },
  async resolveIdentity(identifier: string) {
    return {
      userId: identifier,
      email: identifier
    };
  }
});
