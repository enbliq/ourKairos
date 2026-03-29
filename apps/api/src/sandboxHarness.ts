import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';

type FailureMode =
  | 'latency-spike'
  | 'random-500'
  | 'timeout'
  | 'dropped-response'
  | 'malformed-json';

type ScenarioName = 'flaky-network' | 'partial-outage' | 'chaos-monkey';

interface EndpointRule {
  pattern: RegExp;
  probability: number;
  modes: FailureMode[];
}

interface Scenario {
  name: ScenarioName | string;
  rules: EndpointRule[];
}

interface HarnessStats {
  totalRequests: number;
  totalMatched: number;
  totalInjected: number;
  perMode: Record<FailureMode, number>;
}

interface HarnessState {
  enabled: boolean;
  activeScenario: string | null;
  scenarios: Record<string, Scenario>;
  stats: HarnessStats;
}

const defaultLatencyMs = 2_000;
const timeoutHoldMs = 30_000;

const createDefaultScenarios = (): Record<string, Scenario> => ({
  'flaky-network': {
    name: 'flaky-network',
    rules: [
      {
        pattern: /.*/,
        probability: 0.2,
        modes: ['latency-spike', 'dropped-response'],
      },
    ],
  },
  'partial-outage': {
    name: 'partial-outage',
    rules: [
      {
        pattern: /^\/(?!health).*$/,
        probability: 0.5,
        modes: ['random-500', 'timeout'],
      },
    ],
  },
  'chaos-monkey': {
    name: 'chaos-monkey',
    rules: [
      {
        pattern: /.*/,
        probability: 0.4,
        modes: ['latency-spike', 'random-500', 'timeout', 'dropped-response', 'malformed-json'],
      },
    ],
  },
});

const initialState: HarnessState = {
  enabled: process.env.FAILURE_HARNESS_ENABLED === 'true',
  activeScenario: process.env.FAILURE_HARNESS_SCENARIO ?? null,
  scenarios: createDefaultScenarios(),
  stats: {
    totalRequests: 0,
    totalMatched: 0,
    totalInjected: 0,
    perMode: {
      'latency-spike': 0,
      'random-500': 0,
      timeout: 0,
      'dropped-response': 0,
      'malformed-json': 0,
    },
  },
};

const state: HarnessState = initialState;

const pickRandom = <T>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)] as T;

const findMatchingRule = (path: string, scenario: Scenario | undefined): EndpointRule | null => {
  if (!scenario) return null;
  for (const rule of scenario.rules) {
    if (rule.pattern.test(path)) {
      return rule;
    }
  }
  return null;
};

const logInjection = (mode: FailureMode): void => {
  state.stats.totalInjected += 1;
  state.stats.perMode[mode] += 1;
};

const maybeInjectFailure = (
  mode: FailureMode,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  switch (mode) {
    case 'latency-spike': {
      setTimeout(() => {
        logInjection(mode);
        next();
      }, defaultLatencyMs);
      return;
    }
    case 'random-500': {
      if (res.headersSent) {
        next();
        return;
      }
      logInjection(mode);
      res.status(500).json({
        error: 'Injected failure: random-500',
        mode,
        scenario: state.activeScenario,
        path: req.path,
      });
      return;
    }
    case 'timeout': {
      if (res.headersSent) {
        next();
        return;
      }
      logInjection(mode);
      setTimeout(() => {
        if (!res.headersSent) {
          try {
            res.end();
          } catch {
            void 0;
          }
        }
      }, timeoutHoldMs);
      return;
    }
    case 'dropped-response': {
      logInjection(mode);
      const socket = req.socket;
      if (!socket.destroyed) {
        socket.destroy();
      }
      return;
    }
    case 'malformed-json': {
      if (res.headersSent) {
        next();
        return;
      }
      logInjection(mode);
      res.status(200).type('application/json').send('{"injected": true,'); // invalid JSON
      return;
    }
    default: {
      next();
    }
  }
};

export const sandboxHarnessMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  state.stats.totalRequests += 1;

  if (!state.enabled) {
    next();
    return;
  }

  const scenario = state.activeScenario
    ? state.scenarios[state.activeScenario]
    : undefined;
  const rule = findMatchingRule(req.path, scenario);

  if (!rule) {
    next();
    return;
  }

  state.stats.totalMatched += 1;

  if (Math.random() > rule.probability) {
    next();
    return;
  }

  const mode = pickRandom(rule.modes);
  maybeInjectFailure(mode, req, res, next);
};

export const sandboxHarnessRouter = (): ReturnType<typeof Router> => {
  const router = Router();

  router.get('/__sandbox/failure-harness/state', (_req, res) => {
    res.json({
      enabled: state.enabled,
      activeScenario: state.activeScenario,
      scenarios: Object.keys(state.scenarios),
      stats: state.stats,
    });
  });

  router.post('/__sandbox/failure-harness/enable', (req, res) => {
    const { enabled } = req.body ?? {};
    state.enabled = Boolean(enabled);
    res.json({ enabled: state.enabled });
  });

  router.post('/__sandbox/failure-harness/scenario', (req, res) => {
    const { scenario } = req.body ?? {};
    if (typeof scenario !== 'string' || !state.scenarios[scenario]) {
      res.status(400).json({
        error: 'Unknown scenario',
        available: Object.keys(state.scenarios),
      });
      return;
    }

    state.activeScenario = scenario;
    res.json({ activeScenario: state.activeScenario });
  });

  return router;
};

export const attachSandboxHarness = (app: import('express').Express): void => {
  if (!state.enabled) {
    return;
  }

  app.use(sandboxHarnessMiddleware);
  app.use(sandboxHarnessRouter());
};

