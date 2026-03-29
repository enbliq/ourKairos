import { Router } from "express";
import { createHealthController } from "./health.controller";
import type { ReadinessDependency } from "./health.types";

export const createHealthRouter = (
  serviceName: string,
  dependencies: ReadinessDependency[] = []
) => {
  const router = Router();
  const controller = createHealthController(serviceName, dependencies);

  router.get("/health/live", controller.live);
  router.get("/health/ready", controller.ready);

  return router;
};
