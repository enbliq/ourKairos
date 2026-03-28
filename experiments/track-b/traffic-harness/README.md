# B-03 Synthetic API Traffic Generator

Non-production CLI harness for generating configurable request traffic and writing result artifacts.

## Supported Profiles

- `create-capsule`
- `update-capsule`

## Metrics

- total requests
- success count and success rate
- failure count
- p95 latency
- status code counts
- error type counts

## Run

```bash
cd experiments/track-b
pnpm install

pnpm --filter @ourkairos/traffic-harness run cli -- \
  --url http://localhost:3001/api/capsules \
  --concurrency 8 \
  --duration 30 \
  --profile create-capsule \
  --header "Authorization: Bearer local-dev-token"
```

## Report Output

Each run writes:

- `traffic-report-<timestamp>.json`
- `traffic-report-<timestamp>.md`

Default output directory:

- `experiments/track-b/traffic-harness/reports`
