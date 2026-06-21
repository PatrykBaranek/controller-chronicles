# Build stage
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@11.6.0 --activate
WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY server/package.json ./server/
RUN pnpm install --frozen-lockfile --filter server

COPY server/ ./server/
RUN pnpm --filter server build

# Production stage
FROM node:22-alpine AS production
RUN corepack enable && corepack prepare pnpm@11.6.0 --activate
RUN apk add --no-cache chromium

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY server/package.json ./server/
RUN PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true pnpm install --frozen-lockfile --filter server --prod && \
    pnpm store prune

COPY --from=builder --chown=nestjs:nodejs /app/server/dist ./server/dist

USER nestjs
EXPOSE 3000
CMD ["node", "server/dist/main"]
