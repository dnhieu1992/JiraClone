FROM node:20-alpine AS builder
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages packages
COPY apps/api apps/api

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @jira-clone/api... build

# Tạo bundle production self-contained cho riêng API
RUN pnpm --filter @jira-clone/api deploy --prod /out

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /out/ ./

EXPOSE 3001
CMD ["node", "dist/main.js"]
