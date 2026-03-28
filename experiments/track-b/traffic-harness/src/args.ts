import path from "node:path";
import type { CliConfig, PayloadProfile } from "./types.js";

const DEFAULTS = {
  concurrency: 5,
  durationSec: 20,
  profile: "create-capsule" as PayloadProfile,
  timeoutMs: 10_000,
  seed: 1337,
  outputDir: path.resolve(process.cwd(), "reports"),
};

const allowedProfiles = new Set<PayloadProfile>([
  "create-capsule",
  "update-capsule",
]);

const parseNumber = (value: string | undefined, name: string): number => {
  if (!value) {
    throw new Error(`Missing value for ${name}`);
  }
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    throw new Error(`${name} must be a finite number`);
  }
  return numeric;
};

const parseOptionalNumber = (
  value: string | undefined,
  fallback: number,
  name: string,
): number => {
  if (value === undefined) return fallback;
  return parseNumber(value, name);
};

const parseHeaders = (headerArgs: string[]): Record<string, string> => {
  const parsed: Record<string, string> = {};

  for (const raw of headerArgs) {
    const index = raw.indexOf(":");
    if (index <= 0) {
      throw new Error(
        `Invalid --header "${raw}". Use --header 'Key: Value' format.`,
      );
    }
    const key = raw.slice(0, index).trim();
    const value = raw.slice(index + 1).trim();
    if (!key || !value) {
      throw new Error(
        `Invalid --header "${raw}". Key and value are both required.`,
      );
    }
    parsed[key] = value;
  }

  return parsed;
};

export const usage = (): string => `
Synthetic API Traffic Generator (B-03)

Required:
  --url <endpoint>                        Target endpoint URL

Optional:
  --concurrency <n>                       Parallel workers (default: ${DEFAULTS.concurrency})
  --duration <sec>                        Run duration in seconds (default: ${DEFAULTS.durationSec})
  --profile <create-capsule|update-capsule> Payload profile (default: ${DEFAULTS.profile})
  --timeout <ms>                          Request timeout in ms (default: ${DEFAULTS.timeoutMs})
  --seed <n>                              Deterministic seed (default: ${DEFAULTS.seed})
  --output-dir <path>                     Report output directory (default: ./reports)
  --header <Key: Value>                   Additional header (repeatable)
  --help                                  Show this help text

Example:
  pnpm --filter @ourkairos/traffic-harness run cli -- \\
    --url http://localhost:3001/api/capsules \\
    --concurrency 8 \\
    --duration 45 \\
    --profile create-capsule \\
    --header "Authorization: Bearer local-dev-token"
`.trim();

export const parseArgs = (argv: string[]): CliConfig => {
  const map = new Map<string, string[]>();

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token?.startsWith("--")) continue;

    const key = token.slice(2);
    if (key === "help") {
      throw new Error(usage());
    }

    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    const values = map.get(key) ?? [];
    values.push(next);
    map.set(key, values);
    index += 1;
  }

  const url = map.get("url")?.[0];
  if (!url) {
    throw new Error(`--url is required.\n\n${usage()}`);
  }

  const profileRaw = (map.get("profile")?.[0] ?? DEFAULTS.profile).trim();
  if (!allowedProfiles.has(profileRaw as PayloadProfile)) {
    throw new Error(
      `Invalid profile "${profileRaw}". Use "create-capsule" or "update-capsule".`,
    );
  }

  const concurrency = Math.max(
    1,
    Math.floor(
      parseOptionalNumber(
        map.get("concurrency")?.[0],
        DEFAULTS.concurrency,
        "--concurrency",
      ),
    ),
  );
  const durationSec = Math.max(
    1,
    Math.floor(
      parseOptionalNumber(
        map.get("duration")?.[0],
        DEFAULTS.durationSec,
        "--duration",
      ),
    ),
  );
  const timeoutMs = Math.max(
    250,
    Math.floor(
      parseOptionalNumber(
        map.get("timeout")?.[0],
        DEFAULTS.timeoutMs,
        "--timeout",
      ),
    ),
  );
  const seed = Math.floor(
    parseOptionalNumber(map.get("seed")?.[0], DEFAULTS.seed, "--seed"),
  );
  const outputDir = path.resolve(
    map.get("output-dir")?.[0] ?? DEFAULTS.outputDir,
  );
  const headers = parseHeaders(map.get("header") ?? []);

  return {
    url,
    concurrency,
    durationSec,
    profile: profileRaw as PayloadProfile,
    timeoutMs,
    seed,
    outputDir,
    headers,
  };
};
