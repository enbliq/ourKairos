#!/usr/bin/env node
import { parseArgs, usage } from "./args.js";
import { writeReports } from "./report.js";
import { runTraffic } from "./runner.js";

const main = async (): Promise<void> => {
  const argv = process.argv.slice(2);

  if (argv.includes("--help")) {
    console.log(usage());
    return;
  }

  const config = parseArgs(argv);
  console.log("[traffic-harness] starting run...");
  console.log(
    `[traffic-harness] target=${config.url} profile=${config.profile} concurrency=${config.concurrency} durationSec=${config.durationSec}`,
  );

  const result = await runTraffic(config);
  const reportPaths = await writeReports(result, config.outputDir);

  console.log("[traffic-harness] completed.");
  console.log(
    `[traffic-harness] total=${result.totalRequests} successRate=${result.successRate}% p95=${result.p95LatencyMs}ms`,
  );
  console.log(`[traffic-harness] json report: ${reportPaths.jsonPath}`);
  console.log(`[traffic-harness] md report:   ${reportPaths.markdownPath}`);
};

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[traffic-harness] failed: ${message}`);
  process.exit(1);
});
