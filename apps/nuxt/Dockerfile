FROM node:22

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --filter nuxt

ENV NODE_ENV=production
RUN pnpm build --filter nuxt

CMD ["pnpm", "start", "--filter", "nuxt"]