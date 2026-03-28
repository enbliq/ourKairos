import { describe, expect, it } from "vitest";
import { createPayloadFactory } from "../src/profiles.js";

describe("payload profiles", () => {
  it("creates deterministic create-capsule payloads per seed", () => {
    const firstFactory = createPayloadFactory("create-capsule", 77);
    const secondFactory = createPayloadFactory("create-capsule", 77);

    const first = firstFactory(1);
    const second = secondFactory(1);
    expect(first).toEqual(second);
    expect(first.title).toBeTypeOf("string");
    expect(first.unlockDate).toBeTypeOf("string");
  });

  it("creates update-capsule payloads with at least one field", () => {
    const updateFactory = createPayloadFactory("update-capsule", 11);
    const payload = updateFactory(9);

    expect(Object.keys(payload).length).toBeGreaterThan(0);
  });
});
