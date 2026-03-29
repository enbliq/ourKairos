import { calculateSuccessRate, percentile } from "./metrics.js";
import { createPayloadFactory } from "./profiles.js";
import type { CliConfig, RequestSample, TrafficResult } from "./types.js";

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const methodForProfile = (profile: CliConfig["profile"]): "POST" | "PATCH" =>
  profile === "update-capsule" ? "PATCH" : "POST";

export const runTraffic = async (config: CliConfig): Promise<TrafficResult> => {
  const startMs = Date.now();
  const startedAt = new Date(startMs).toISOString();
  const deadlineMs = startMs + config.durationSec * 1000;
  const requestBodyFactory = createPayloadFactory(config.profile, config.seed);

  let requestSequence = 0;
  const latencies: number[] = [];
  const samples: RequestSample[] = [];
  let successCount = 0;
  let failureCount = 0;
  const statusCodes = new Map<string, number>();
  const errorTypes = new Map<string, number>();

  const workers = Array.from({ length: config.concurrency }, async () => {
    while (Date.now() < deadlineMs) {
      requestSequence += 1;
      const requestId = requestSequence;
      const payload = requestBodyFactory(requestId);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
      const begin = performance.now();

      try {
        const response = await fetch(config.url, {
          method: methodForProfile(config.profile),
          headers: {
            "content-type": "application/json",
            ...config.headers,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        const latencyMs = Number((performance.now() - begin).toFixed(2));
        latencies.push(latencyMs);

        const statusKey = String(response.status);
        statusCodes.set(statusKey, (statusCodes.get(statusKey) ?? 0) + 1);

        if (response.ok) {
          successCount += 1;
        } else {
          failureCount += 1;
        }

        samples.push({
          requestId,
          latencyMs,
          ok: response.ok,
          statusCode: response.status,
          timestamp: new Date().toISOString(),
        });
      } catch (error: unknown) {
        const latencyMs = Number((performance.now() - begin).toFixed(2));
        latencies.push(latencyMs);
        failureCount += 1;

        const errorKey =
          error instanceof Error ? error.name : "UnknownRequestError";
        errorTypes.set(errorKey, (errorTypes.get(errorKey) ?? 0) + 1);

        samples.push({
          requestId,
          latencyMs,
          ok: false,
          errorType: errorKey,
          timestamp: new Date().toISOString(),
        });
      } finally {
        clearTimeout(timeout);
      }

      // Small yield to prevent starving event loop with very fast local endpoints.
      await sleep(0);
    }
  });

  await Promise.all(workers);

  const endMs = Date.now();
  const endedAt = new Date(endMs).toISOString();
  const totalRequests = successCount + failureCount;

  return {
    config,
    startedAt,
    endedAt,
    durationMs: endMs - startMs,
    totalRequests,
    successCount,
    failureCount,
    successRate: calculateSuccessRate(successCount, totalRequests),
    p95LatencyMs: percentile(latencies, 95),
    statusCodes: Object.fromEntries(statusCodes.entries()),
    errorTypes: Object.fromEntries(errorTypes.entries()),
    samples,
  };
};
