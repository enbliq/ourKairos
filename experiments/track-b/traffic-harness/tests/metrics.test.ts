import { describe, expect, it } from "vitest";
import { calculateSuccessRate, percentile } from "../src/metrics.js";

describe("metrics", () => {
  it("calculates success rate to two decimals", () => {
    expect(calculateSuccessRate(80, 100)).toBe(80);
    expect(calculateSuccessRate(1, 3)).toBe(33.33);
    expect(calculateSuccessRate(0, 0)).toBe(0);
  });

  it("computes percentile via nearest-rank", () => {
    const samples = [12, 8, 15, 40, 24, 19, 11];
    expect(percentile(samples, 95)).toBe(40);
    expect(percentile(samples, 50)).toBe(12);
    expect(percentile([], 95)).toBe(0);
  });
});
