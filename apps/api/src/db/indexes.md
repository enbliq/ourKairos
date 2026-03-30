# Database Indexes

## `users` collection

| Index | Fields | Options | Query pattern |
|-------|--------|---------|---------------|
| email_unique | `{ email: 1 }` | unique | Auth lookup by email |
| provider | `{ provider: 1 }` | — | Filter users by OAuth provider |

## `capsules` collection

| Index | Fields | Options | Query pattern |
|-------|--------|---------|---------------|
| owner_dashboard | `{ ownerId: 1, createdAt: -1 }` | — | Dashboard list: all capsules for a user, newest first |
| unlock_scan | `{ status: 1, unlockDate: 1 }` | — | Unlock worker: `{ status: 'SEALED', unlockDate: { $lte: now } }` |
| status_filter | `{ status: 1 }` | — | Admin metrics: count by status |

## Notes

- The `owner_dashboard` compound index covers both the equality filter on `ownerId` and the sort on `createdAt`, avoiding a collection scan for the most common dashboard query.
- The `unlock_scan` index lets the unlock worker efficiently find due capsules without scanning all sealed records.
- Mongoose's `ensureIndexes` runs automatically on model first-use after `connectDB()`.
