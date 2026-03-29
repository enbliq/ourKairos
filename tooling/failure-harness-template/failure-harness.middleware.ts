import type { NextFunction, Request, Response } from "express";
import type { FailureMode, HarnessState } from "./failure-harness.types";

const pickRandom = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)] as T;

const applyFailure = (
  mode: FailureMode,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  switch (mode) {
    case "latency-spike":
      setTimeout(next, 1500);
      return;
    case "random-500":
      response.status(500).json({ error: "Injected failure", mode, path: request.path });
      return;
    case "timeout":
      setTimeout(() => response.end(), 20000);
      return;
    case "dropped-response":
      request.socket.destroy();
      return;
    case "malformed-json":
      response.type("application/json").send("{\"broken\":");
      return;
  }
};

export const createFailureHarness =
  (state: HarnessState) =>
  (request: Request, response: Response, next: NextFunction) => {
    if (!state.enabled || !state.activeScenario) {
      next();
      return;
    }

    const rules = state.scenarios[state.activeScenario] ?? [];
    const rule = rules.find((candidate) => new RegExp(candidate.pathPattern).test(request.path));

    if (!rule || Math.random() > rule.probability) {
      next();
      return;
    }

    applyFailure(pickRandom(rule.modes), request, response, next);
  };
