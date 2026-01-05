<!-- Copilot / AI agent instructions for the CV Builder monorepo -->
# Copilot Instructions — CvBuilder

Purpose: give an AI coding agent immediate, actionable context so it can be productive.

- Big picture
  - Monorepo managed by Nx. Key projects: `apps/web` (Vite + React + MUI), `apps/server` (Node + Express + TypeScript + Mongoose), and libraries under `libs/` (notably `libs/shared-types` and `libs/shared-utils`). See [README.md](README.md).
  - `apps/server` is an API server that expects environment files in the `apps/server` folder and uses Mongoose to connect to MongoDB. Key entry points: `apps/server/src/main.ts` and `apps/server/src/server.ts`.
  - Routing pattern: route files belong in `apps/server/src/route`. The server mounts routes in `server.ts` (there's a TODO where routes are expected to be imported and mounted).

- Key files to inspect first
  - `apps/server/src/server.ts` — middleware ordering and where to mount routes (Helmet → body parsers → CORS → rateLimit → routes → 404 → error handler).
  - `apps/server/src/config/environment.config.ts` — how env files are loaded and which environment variables are required (e.g. `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `CORS_ORIGIN`).
  - `apps/server/src/db/connection.ts` — database connection behavior and graceful shutdown hooks.
  - `apps/web/src/main.tsx` — frontend entry, theme and app wiring.
  - `package.json` (workspace root) and `apps/*/project.json` — Nx scripts and project targets (serving, building, testing).

- Developer workflows (commands the agent may use)
  - Local dev (start both apps): `yarn dev` (runs `nx serve web` + `nx serve server`).
  - Start server only: `yarn dev:server`.
  - Debug server (Node inspector): `yarn dev:server:debug` → attach inspector/VSCode to Node.
  - Build: `yarn build` or `yarn build:server` / `yarn build:web`.
  - Run tests: `yarn test`, or `yarn test:server`, `yarn test:web` (Nx delegates to Jest/Vitest per project configuration).
  - E2E: `yarn e2e`, `yarn e2e:server`, `yarn e2e:web` (Playwright configured under `apps/*/e2e`).
  - Production start: `yarn start:prod` (runs `node dist/apps/server/main.js`). Deploy helper: `yarn deploy:server` (uses PM2 and expects the pm2 process name `cv-builder-server`).

- Environment & secrets
  - `apps/server/src/config/environment.config.ts` loads `.env.{env}` from the `apps/server` directory. Create `.env.local` (or `.env.development`, `.env.production`) in `apps/server` when running locally.
  - Important env keys: `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRE`, `CLIENT_URL`, `CORS_ORIGIN`, `STRIPE_SECRET_KEY` and OAuth variables (GOOGLE_*, FACEBOOK_*).

- Project-specific conventions and patterns
  - Nx-first workflow: prefer `npx nx`/`yarn nx` targets over calling project scripts directly; use `nx run <project>:<target>` for targeted operations.
  - Middleware order in `server.ts` is intentional: security middleware (Helmet) must be first; error handler must be last. Follow this ordering when adding middleware.
  - Shared types are exported from `libs/shared-types` and imported as `@cv-builder/shared-types` — use these for cross-project typings (example: `EnvironmentConfig` used in `environment.config.ts`).
  - Database connection is centralized in `apps/server/src/db/connection.ts` — avoid creating separate mongoose connections in other files.

- Integration points and external deps
  - MongoDB (via `mongoose`): connection string from `MONGODB_URI`.
  - Authentication: `passport` + JWT; config lives under `apps/server/src/config` and middleware under `apps/server/src/middleware`.
  - Frontend communicates with server using `CLIENT_URL`/`BASE_URL` and CORS origin configured in `environment.config.ts`.

- Where to make common changes
  - Add API routes: create files in `apps/server/src/route` and import/mount them inside `apps/server/src/server.ts` (see TODO in that file).
  - Add shared utilities/types: place them under `libs/*` and export from `libs/*/src/index.ts` so other projects can import via `@cv-builder/<lib>`.

- Helpful examples for the agent
  - To run the server locally with envs in `apps/server`:

```bash
cd <repo-root>
yarn dev:server
# or with debugger
yarn dev:server:debug
```

  - To build and run the server artifact:

```bash
yarn build:server
yarn start:prod
```

- Notes and gotchas
  - Package manager is Yarn v4 (see `package.json.packageManager`). Use `yarn` commands rather than npm unless asked otherwise.
  - Some npm scripts map to Nx targets that may be unimplemented (e.g. `server:seed`, `server:migrate`); search `apps/server` for implementations before assuming target behavior.

If anything here is unclear or you want more detail (example: list of required env variables, tests mapping, or route scaffolding examples), tell me which area to expand and I'll refine this file.
