import { describe, expect, it } from "vitest";
import { parseArgs } from "../src/args.js";

describe("argument parser", () => {
  it("parses required and optional values", () => {
    const parsed = parseArgs([
      "--url",
      "http://localhost:3001/api/capsules",
      "--concurrency",
      "9",
      "--duration",
      "45",
      "--profile",
      "update-capsule",
      "--timeout",
      "15000",
      "--seed",
      "22",
      "--header",
      "Authorization: Bearer test-token",
    ]);

    expect(parsed.url).toContain("localhost");
    expect(parsed.concurrency).toBe(9);
    expect(parsed.durationSec).toBe(45);
    expect(parsed.profile).toBe("update-capsule");
    expect(parsed.timeoutMs).toBe(15000);
    expect(parsed.seed).toBe(22);
    expect(parsed.headers.Authorization).toContain("Bearer");
  });

  it("throws when required url is missing", () => {
    expect(() => parseArgs(["--concurrency", "4"])).toThrow("--url is required");
  });
});
