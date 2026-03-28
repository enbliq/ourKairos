export interface DependencyStatus {
  name: string;
  ok: boolean;
  details?: string;
}

export interface HealthSnapshot {
  status: "ok" | "degraded";
  service: string;
  timestamp: string;
  dependencies?: DependencyStatus[];
}

export interface ReadinessDependency {
  name: string;
  check: () => Promise<DependencyStatus>;
}
