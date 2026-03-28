# Feature Flag Engine

A lightweight, deterministic feature flag library for TypeScript with support for boolean flags, percentage rollouts, and user targeting.

## Features

- **Boolean Flags**: Simple on/off switches
- **Percentage Rollout**: Hash-based deterministic rollout (0-100%)
- **User Targeting**: Rule-based targeting with trait matching
- **Type-Safe**: Full TypeScript support
- **Zero Dependencies**: Pure TypeScript implementation
- **Deterministic**: Same user + flag always returns same result

## Installation

```bash
pnpm add @repo/feature-flags
```

## Usage

### Basic Example

```typescript
import { FeatureFlagEngine } from "@repo/feature-flags";

const schema = {
  flags: {
    "new-ui": { type: "boolean", enabled: true },
    "beta-feature": { type: "percentage", percentage: 25 },
    "admin-panel": {
      type: "targeting",
      rules: [{ trait: "role", operator: "eq", value: "admin", enabled: true }],
      defaultEnabled: false,
    },
  },
};

const engine = new FeatureFlagEngine(schema);

const user = {
  id: "user-123",
  traits: { role: "admin", tier: "premium" },
};

// Check individual flags
if (engine.isEnabled("new-ui", user)) {
  // Show new UI
}

// Get all enabled flags
const enabledFlags = engine.getEnabledFlags(user);
console.log(enabledFlags); // ['new-ui', 'admin-panel', ...]
```

### Flag Types

#### Boolean Flag

```typescript
{
  type: 'boolean',
  enabled: true
}
```

#### Percentage Rollout

```typescript
{
  type: 'percentage',
  percentage: 50  // 0-100
}
```

#### User Targeting

```typescript
{
  type: 'targeting',
  rules: [
    {
      trait: 'role',
      operator: 'eq',  // 'eq' | 'ne' | 'in' | 'gt' | 'lt'
      value: 'admin',
      enabled: true
    }
  ],
  defaultEnabled: false
}
```

### Operators

- `eq`: Equal to
- `ne`: Not equal to
- `in`: Value in array
- `gt`: Greater than (numbers only)
- `lt`: Less than (numbers only)

## Configuration Schema

```typescript
interface FlagConfigSchema {
  flags: Record<string, FlagConfig>;
  environment?: string;
}
```

## Testing

```bash
pnpm test
```

## Design Principles

1. **Deterministic**: Same user ID + flag key always produces same result
2. **Stateless**: No external dependencies or state management
3. **Type-Safe**: Full TypeScript support with strict types
4. **Validated**: Schema validation on initialization
5. **Minimal**: Zero runtime dependencies

## License

MIT
