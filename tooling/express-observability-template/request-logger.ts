import type { NextFunction, Request, Response } from "express";

export const logRequest =
  (write: (message: string) => void = console.info) =>
  (request: Request, response: Response, next: NextFunction) => {
    const startedAt = Date.now();

    response.on("finish", () => {
      const durationMs = Date.now() - startedAt;
      const requestId = response.getHeader("x-request-id") ?? "unknown";
      write(
        JSON.stringify({
          requestId,
          method: request.method,
          path: request.originalUrl || request.url,
          statusCode: response.statusCode,
          durationMs
        })
      );
    });

    next();
  };
