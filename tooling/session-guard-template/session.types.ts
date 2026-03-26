export interface SessionPrincipal {
  userId: string;
  email: string;
}

export interface SessionResolver {
  resolve(token: string): Promise<SessionPrincipal | null>;
}
