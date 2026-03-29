import type { NextFunction, Request, Response } from "express";
import { AppError } from "./app-error";

export const handleErrors =
  (write: (message: string) => void = console.error) =>
  (
    error: unknown,
    request: Request,
    response: Response,
    _next: NextFunction
  ) => {
    const requestId = response.getHeader("x-request-id") ?? request.header("x-request-id");

    if (error instanceof AppError) {
      response.status(error.statusCode).json({
        error: {
          code: error.code,
          message: error.message,
          details: error.details ?? null,
          requestId
        }
      });
      return;
    }

    write(
      JSON.stringify({
        level: "error",
        requestId,
        message: error instanceof Error ? error.message : "Unexpected error"
      })
    );

    response.status(500).json({
      error: {
        code: "internal_error",
        message: "An unexpected error occurred",
        requestId
      }
    });
  };
