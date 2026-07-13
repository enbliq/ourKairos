export interface AuthUser {
  id: string;
  email: string;
  name: string;
}

export interface SessionTokenPayload {
  sub: string;
}
