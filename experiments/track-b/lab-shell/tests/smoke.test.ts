import { describe, expect, it } from "vitest";
import { getSandboxHealth } from "../src/index.js";

describe("track-b lab shell", () => {
  it("returns a ready status payload", () => {
    const health = getSandboxHealth();
    expect(health.name).toBe("@ourkairos/lab-shell");
    expect(health.status).toBe("ready");
    expect(typeof health.timestamp).toBe("string");
  });
});
