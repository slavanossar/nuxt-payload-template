# nuxt-payload-template

A [Nuxt 3](https://nuxt.com/docs/guide/concepts/auto-imports) + TypeScript starter template, with [Payload CMS](https://payloadcms.com/docs).

- [Vue Macros](https://vue-macros.sxzz.moe/guide/getting-started.html)
- [VueUse](https://vueuse.org/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Pinia](https://pinia.vuejs.org/introduction.html)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/getting-started)

## Usage

```bash
# Install packages
pnpm install

# Update root packages
pnpm up

# Update workspace packages
pnpm up --filter nuxt payload

# Start dev server
pnpm run dev

# Generate gql exports, possibleTypes, and Payload types
pnpm run generate

# Build for production
pnpm run build

# Start server
pnpm run start
```
