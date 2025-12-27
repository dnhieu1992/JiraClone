FROM node:20-alpine AS builder
WORKDIR /repo

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
COPY packages packages
COPY apps/web apps/web

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @jira-clone/web... build


FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /repo/apps/web/.next/standalone ./

COPY --from=builder /repo/apps/web/.next/static ./.next/static
COPY --from=builder /repo/apps/web/public ./public
COPY --from=builder /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /repo/apps/web/public ./apps/web/public

EXPOSE 3000

CMD ["sh","-lc","if [ -f /app/server.js ]; then node /app/server.js; else node /app/apps/web/server.js; fi"]
