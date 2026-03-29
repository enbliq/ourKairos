import type { DependencyStatus, HealthSnapshot, ReadinessDependency } from "./health.types";

const now = () => new Date().toISOString();

export const createLivenessSnapshot = (service: string): HealthSnapshot => ({
  status: "ok",
  service,
  timestamp: now()
});

export const createReadinessSnapshot = async (
  service: string,
  dependencies: ReadinessDependency[]
): Promise<HealthSnapshot> => {
  const dependencyStates: DependencyStatus[] = await Promise.all(
    dependencies.map((dependency) => dependency.check())
  );

  const status = dependencyStates.every((dependency) => dependency.ok) ? "ok" : "degraded";

  return {
    status,
    service,
    timestamp: now(),
    dependencies: dependencyStates
  };
};

export const createMongoReadinessDependency = (
  isConnected: () => boolean
): ReadinessDependency => ({
  name: "mongodb",
  check: async () => ({
    name: "mongodb",
    ok: isConnected(),
    details: isConnected() ? "connected" : "disconnected"
  })
});
