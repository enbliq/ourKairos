declare namespace Express {
  interface Request {
    principal?: {
      userId: string;
      email: string;
    };
  }
}
