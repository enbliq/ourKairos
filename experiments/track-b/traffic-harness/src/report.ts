import fs from "node:fs/promises";
import path from "node:path";
import type { TrafficResult } from "./types.js";

const safeTimestamp = (iso: string): string => iso.replaceAll(":", "-");

const renderMarkdown = (result: TrafficResult): string => {
  const statusRows = Object.entries(result.statusCodes)
    .map(([statusCode, count]) => `| ${statusCode} | ${count} |`)
    .join("\n");
  const errorRows = Object.entries(result.errorTypes)
    .map(([errorType, count]) => `| ${errorType} | ${count} |`)
    .join("\n");

  return [
    "# Synthetic API Traffic Report",
    "",
    "## Run Config",
    "",
    `- URL: \`${result.config.url}\``,
    `- Profile: \`${result.config.profile}\``,
    `- Concurrency: ${result.config.concurrency}`,
    `- Duration (sec): ${result.config.durationSec}`,
    `- Timeout (ms): ${result.config.timeoutMs}`,
    `- Seed: ${result.config.seed}`,
    "",
    "## Metrics",
    "",
    `- Started At: ${result.startedAt}`,
    `- Ended At: ${result.endedAt}`,
    `- Actual Duration (ms): ${result.durationMs}`,
    `- Total Requests: ${result.totalRequests}`,
    `- Success Count: ${result.successCount}`,
    `- Failure Count: ${result.failureCount}`,
    `- Success Rate: ${result.successRate}%`,
    `- P95 Latency (ms): ${result.p95LatencyMs}`,
    "",
    "## Status Codes",
    "",
    "| Status | Count |",
    "| --- | ---: |",
    statusRows || "| n/a | 0 |",
    "",
    "## Error Types",
    "",
    "| Error Type | Count |",
    "| --- | ---: |",
    errorRows || "| none | 0 |",
    "",
    "## Notes",
    "",
    "- Non-production synthetic harness run.",
    "- Payloads generated from local deterministic profiles.",
  ].join("\n");
};

export const writeReports = async (
  result: TrafficResult,
  outputDir: string,
): Promise<{ jsonPath: string; markdownPath: string }> => {
  await fs.mkdir(outputDir, { recursive: true });

  const baseName = `traffic-report-${safeTimestamp(result.startedAt)}`;
  const jsonPath = path.join(outputDir, `${baseName}.json`);
  const markdownPath = path.join(outputDir, `${baseName}.md`);

  await fs.writeFile(jsonPath, JSON.stringify(result, null, 2), "utf8");
  await fs.writeFile(markdownPath, renderMarkdown(result), "utf8");

  return { jsonPath, markdownPath };
};
