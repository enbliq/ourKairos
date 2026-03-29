import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

export const attachRequestId = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const requestId = request.header("x-request-id") ?? randomUUID();
  request.headers["x-request-id"] = requestId;
  response.setHeader("x-request-id", requestId);
  next();
};
