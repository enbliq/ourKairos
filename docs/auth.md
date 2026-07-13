# Auth

`apps/api/src/auth` implements the sender authentication foundation: email + password
signup/login, bcrypt password hashing, and a JWT session carried in an httpOnly cookie.

## API

- `POST /auth/register` — `{ name, email, password }` (password ≥ 8 chars) → creates the user, sets the session cookie, returns the user
- `POST /auth/login` — `{ email, password }` → verifies credentials, sets the session cookie, returns the user
- `POST /auth/logout` — clears the session cookie
- `GET /auth/me` — returns the current session's user, or `401` if unauthenticated

The session cookie (`session`) is httpOnly, `sameSite=lax`, and `secure` in production. It is
verified on every request by `attachSession` middleware, which populates `req.user` when a
valid session is present; `requireAuth` rejects unauthenticated requests with `401`.

Set `JWT_SECRET` in `apps/api/.env`.

## Web

`apps/web/lib/auth-client.ts` wraps the API client for `login`, `register`, `logout`, and `me`.
The login and register pages under `apps/web/app/[locale]` post to those endpoints, and
`apps/web/app/[locale]/dashboard` is a client-gated page that redirects to `/login` when
`GET /auth/me` returns no user.

## Extending this

This is the foundation contributors build the rest of the product against. New protected
routes on the API should use `requireAuth`; new protected pages on the web should follow the
`DashboardGate` pattern (check `authClient.me()`, redirect if absent).
