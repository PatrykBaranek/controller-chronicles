# Controller Chronicles — Server

NestJS v11 API for [Controller Chronicles](https://github.com/PatrykBaranek/controller-chronicles).

## Prerequisites

- Node.js >= 20
- pnpm
- MongoDB (Docker recommended)

## Setup

```bash
pnpm install
cp .env .env.local   # or edit .env directly
```

### MongoDB

```bash
docker run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo:7
```

## Commands

| Command | Description |
|---|---|
| `pnpm start:dev` | Start with watch mode |
| `pnpm start` | Start without watch |
| `pnpm build` | Compile to `dist/` |
| `pnpm lint` | ESLint (flat config) |
| `pnpm test` | Unit tests (Jest + ts-jest) |
| `pnpm test:e2e` | End-to-end tests |
| `pnpm start:prod` | Run compiled build |

Run from root: `pnpm --filter=server <command>`

## API

- **Base URL:** `http://localhost:3000/api`
- **Swagger UI:** `http://localhost:3000/api`
- **Auth:** JWT access + refresh tokens (Passport)

### Modules

| Module | Routes |
|---|---|
| Auth | `/api/auth/signup`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`, `/api/auth/request-reset-password`, `/api/auth/reset-password` |
| Users | `/api/users` CRUD |
| Games | `/api/games` |
| Collections | `/api/collections` |
| Spotify | `/api/spotify/auth`, `/api/spotify/podcasts`, `/api/spotify/episodes`, `/api/spotify/soundtracks` |
| Steam | `/api/steam/bestsellers`, `/api/steam/:gameId/reviews` |
| YouTube | `/api/youtube` |
| Reviews | `/api/reviews-sites/:gameId` |

## Env Variables

16 variables required in `.env` — see `.env` for the full list (MongoDB URI, JWT secrets, Spotify OAuth, RAWG API key, YouTube API key, SMTP config).

## Tech Stack

- **Framework:** NestJS v11
- **Database:** MongoDB + Mongoose v9
- **Auth:** Passport.js (JWT, local), bcrypt
- **Validation:** class-validator + class-transformer
- **Docs:** Swagger / OpenAPI via `@nestjs/swagger`
- **Email:** `@nestjs-modules/mailer` + nodemailer + EJS templates
- **HTTP:** Axios, Puppeteer
