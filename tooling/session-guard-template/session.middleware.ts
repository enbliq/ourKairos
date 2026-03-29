import type { NextFunction, Request, Response } from "express";
import { getBearerToken } from "./token";
import type { SessionResolver } from "./session.types";

export const attachSession =
  (resolver: SessionResolver) =>
  async (request: Request, _response: Response, next: NextFunction) => {
    const token = getBearerToken(request.header("authorization"));
    if (!token) {
      next();
      return;
    }

    const principal = await resolver.resolve(token);
    if (principal) {
      Object.assign(request, { principal });
    }

    next();
  };
