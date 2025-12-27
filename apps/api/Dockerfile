FROM node:20-alpine AS builder
WORKDIR /repo

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages packages
COPY apps/api apps/api

RUN corepack enable && corepack prepare pnpm@9 --activate
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @jira-clone/api... build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /repo/apps/api/dist ./dist
COPY --from=builder /repo/apps/api/package.json ./package.json
COPY --from=builder /repo/node_modules ./node_modules
EXPOSE 3001
CMD ["node", "dist/main.js"]

