import type { NextFunction, Request, Response } from "express";

export const requireAuth = (request: Request, response: Response, next: NextFunction) => {
  if (!("principal" in request) || !request.principal) {
    response.status(401).json({
      error: {
        code: "unauthorized",
        message: "Authentication is required"
      }
    });
    return;
  }

  next();
};
