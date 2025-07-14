FROM node:22

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --filter payloadcms

ENV NODE_ENV=production
RUN pnpm build --filter payloadcms

CMD ["pnpm", "start", "--filter", "payloadcms"]