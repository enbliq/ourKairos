export type FailureMode =
  | "latency-spike"
  | "random-500"
  | "timeout"
  | "dropped-response"
  | "malformed-json";

export interface HarnessRule {
  pathPattern: string;
  probability: number;
  modes: FailureMode[];
}

export interface HarnessState {
  enabled: boolean;
  activeScenario: string | null;
  scenarios: Record<string, HarnessRule[]>;
}
