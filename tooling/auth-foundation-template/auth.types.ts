export interface SenderIdentity {
  userId: string;
  email: string;
  name?: string;
}

export interface AuthChallenge {
  identifier: string;
  code: string;
  expiresAt: string;
}

export interface AuthSessionPayload {
  sub: string;
  email: string;
  issuedAt: string;
}
