export type PayloadProfile = "create-capsule" | "update-capsule";

export type CliConfig = {
  url: string;
  concurrency: number;
  durationSec: number;
  profile: PayloadProfile;
  timeoutMs: number;
  seed: number;
  outputDir: string;
  headers: Record<string, string>;
};

export type TrafficPayload = Record<string, unknown>;

export type RequestSample = {
  requestId: number;
  latencyMs: number;
  ok: boolean;
  statusCode?: number;
  errorType?: string;
  timestamp: string;
};

export type TrafficResult = {
  config: CliConfig;
  startedAt: string;
  endedAt: string;
  durationMs: number;
  totalRequests: number;
  successCount: number;
  failureCount: number;
  successRate: number;
  p95LatencyMs: number;
  statusCodes: Record<string, number>;
  errorTypes: Record<string, number>;
  samples: RequestSample[];
};
