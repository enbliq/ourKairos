import { FeatureFlagEngine, type FlagConfigSchema } from '../src/index';

// Example configuration
const config: FlagConfigSchema = {
  environment: 'production',
  flags: {
    // Simple boolean flag
    'maintenance-mode': {
      type: 'boolean',
      enabled: false
    },

    // Percentage rollout - 30% of users
    'new-dashboard': {
      type: 'percentage',
      percentage: 30
    },

    // User targeting - admins only
    'admin-tools': {
      type: 'targeting',
      rules: [
        {
          trait: 'role',
          operator: 'eq',
          value: 'admin',
          enabled: true
        }
      ],
      defaultEnabled: false
    },

    // Complex targeting - premium or enterprise users
    'advanced-analytics': {
      type: 'targeting',
      rules: [
        {
          trait: 'tier',
          operator: 'in',
          value: ['premium', 'enterprise'],
          enabled: true
        },
        {
          trait: 'accountAge',
          operator: 'gt',
          value: 365,
          enabled: true
        }
      ],
      defaultEnabled: false
    }
  }
};

// Initialize engine
const engine = new FeatureFlagEngine(config);

// Example users
const users = [
  {
    id: 'user-001',
    traits: { role: 'admin', tier: 'enterprise', accountAge: 500 }
  },
  {
    id: 'user-002',
    traits: { role: 'user', tier: 'free', accountAge: 30 }
  },
  {
    id: 'user-003',
    traits: { role: 'user', tier: 'premium', accountAge: 400 }
  }
];

// Check flags for each user
console.log('Feature Flag Demo\n');

users.forEach(user => {
  console.log(`User: ${user.id} (${user.traits.role}, ${user.traits.tier})`);
  console.log('Enabled flags:', engine.getEnabledFlags(user));
  console.log('---');
});

// Demonstrate deterministic behavior
console.log('\nDeterministic Rollout Test:');
const testUser = { id: 'test-user-123' };
console.log('First check:', engine.isEnabled('new-dashboard', testUser));
console.log('Second check:', engine.isEnabled('new-dashboard', testUser));
console.log('Third check:', engine.isEnabled('new-dashboard', testUser));

// Test percentage distribution
console.log('\nPercentage Distribution (1000 users):');
let enabledCount = 0;
for (let i = 0; i < 1000; i++) {
  if (engine.isEnabled('new-dashboard', { id: `user-${i}` })) {
    enabledCount++;
  }
}
console.log(`Expected: ~30%, Actual: ${(enabledCount / 10).toFixed(1)}%`);
