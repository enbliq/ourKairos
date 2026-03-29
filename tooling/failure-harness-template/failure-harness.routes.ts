import { Router } from "express";
import type { HarnessState } from "./failure-harness.types";

export const createFailureHarnessRouter = (state: HarnessState) => {
  const router = Router();

  router.get("/__sandbox/failure-harness/state", (_request, response) => {
    response.json(state);
  });

  router.post("/__sandbox/failure-harness/enable", (request, response) => {
    state.enabled = Boolean(request.body?.enabled);
    response.json({ enabled: state.enabled });
  });

  router.post("/__sandbox/failure-harness/scenario", (request, response) => {
    const scenario = request.body?.scenario;
    state.activeScenario = typeof scenario === "string" ? scenario : null;
    response.json({ activeScenario: state.activeScenario });
  });

  return router;
};
