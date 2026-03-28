# B-02 Capsule Replay Visualizer

React-only sandbox for replaying capsule lifecycle events from a local JSON dataset.

## Scope

- No backend calls.
- No dependency on OG app runtime.
- Deterministic replay based on `src/data/events.json`.

## Features

- Timeline replay controls: play, pause, reset.
- Replay speed: x1, x2, x4.
- Time scrubber for manual seeking.
- Event markers on a timeline track.
- Live capsule state transitions (draft, sealed, unlocked).
- Filters by `ownerId` and `status`.

## Run

```bash
cd experiments/track-b
pnpm install
pnpm dev:b02
```
