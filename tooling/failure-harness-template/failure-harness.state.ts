import type { HarnessState } from "./failure-harness.types";

export const createHarnessState = (): HarnessState => ({
  enabled: false,
  activeScenario: null,
  scenarios: {
    "flaky-network": [
      {
        pathPattern: ".*",
        probability: 0.2,
        modes: ["latency-spike", "dropped-response"]
      }
    ],
    "partial-outage": [
      {
        pathPattern: "^/(?!health).*",
        probability: 0.5,
        modes: ["random-500", "timeout"]
      }
    ]
  }
});
