import type { NextFunction, Request, Response } from "express";
import { toValidationErrorPayload } from "./validation.errors";
import type { Validator } from "./validation.types";

type RequestTarget = "body" | "params" | "query";

export const validateRequest =
  <T>(target: RequestTarget, validator: Validator<T>) =>
  (request: Request, response: Response, next: NextFunction) => {
    const result = validator(request[target]);

    if (!result.success) {
      response.status(400).json(toValidationErrorPayload(result.issues ?? []));
      return;
    }

    request[target] = result.data as Request[typeof target];
    next();
  };
