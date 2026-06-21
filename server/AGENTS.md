# AGENTS.md

## Monorepo

- pnpm workspace with `client/`, `server/`, `mobile/`
- Use `pnpm --filter=<package>` for package-scoped commands
- Root scripts: `pnpm dev:server`, `pnpm start:client`, etc.

## Server (`server/`)

NestJS v11, Mongoose (MongoDB), Passport JWT, Swagger.

### Commands

```bash
pnpm --filter=server lint       # ESLint flat config (eslint.config.mjs)
pnpm --filter=server test       # Jest + ts-jest
pnpm --filter=server build      # nest build
pnpm --filter=server start      # nest start (port 3000)
pnpm --filter=server start:dev  # nest start --watch
pnpm --filter=server start:prod # node dist/main
```

### Architecture

- Feature-based modules: `src/auth/`, `src/games/`, `src/spotify/`, `src/steam/`, `src/youtube/`, `src/collections/`, `src/email/`, `src/reviews-sites/`, `src/games-update/`, `src/rawg/`, `src/users/`
- Internal per-module: `controllers/`, `services/`, `dto/`, `models/`, `guards/`, `strategies/`
- Global prefix: `api` (e.g. `POST /api/auth/login`)
- Swagger UI: `http://localhost:3000/api`
- CORS: all origins allowed with credentials
- Auth: JWT access/refresh/reset tokens via passport + bcrypt
- Env vars loaded from `.env` (16 vars, see `.env` file — **not committed**)

### TypeScript

- **Keep at 5.9.x** — TS 6.0 introduces ~254 breaking strict errors
- `tsconfig.json` has `strictNullChecks`, `esModuleInterop`, `forceConsistentCasingInFileNames`
- `skipLibCheck: true`

### ESLint

- Flat config (`eslint.config.mjs`) — **do not revert to `.eslintrc.js`**
- Key rules relaxed: `no-explicit-any` off, `no-floating-promises` off, strict-type-checked rules set to `warn`

### Local dev

```bash
docker run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo:7
pnpm --filter=server start:dev
```

### CI (`.github/workflows/main.yml`)

- Order: `lint` → `test` → `build` for server
- Node 22.x, `pnpm install --frozen-lockfile`

### Gotchas

- `@nestjs-modules/mailer` EJS adapter import: use `require('@nestjs-modules/mailer/dist/adapters/ejs.adapter')` or equivalent — no `/dist/` in import path for ESM
- `fuse.js` v7 needs `esModuleInterop: true` (already set)
- `class-validator` + `class-transformer` for DTO validation (not Zod)
- Mongoose models act as repository layer (no separate repository classes)

## Client (`client/`)

Vite + React app. See `client/README.md`.

## Mobile (`mobile/`)

Expo/React Native app. See `mobile/AGENTS.md`.
