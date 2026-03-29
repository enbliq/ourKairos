import type { Request, Response } from "express";
import { createLivenessSnapshot, createReadinessSnapshot } from "./health.service";
import type { ReadinessDependency } from "./health.types";

export const createHealthController = (
  serviceName: string,
  dependencies: ReadinessDependency[]
) => ({
  live: (_request: Request, response: Response) => {
    response.json(createLivenessSnapshot(serviceName));
  },
  ready: async (_request: Request, response: Response) => {
    const snapshot = await createReadinessSnapshot(serviceName, dependencies);
    response.status(snapshot.status === "ok" ? 200 : 503).json(snapshot);
  }
});
