# nuxt-payload-template

> ⚠️ Work In Progress
>
> This template is slightly opinionated based on my main use case for client work, but the core monorepo structure is still a good basis for any Nuxt/Payload project.
>
> I update the repo and packages manually as I continue to refine things during the course of my projects.
>
> If you have any questions/suggestions, feel free to open up an issue.

A [Nuxt 3](https://nuxt.com/docs/guide/concepts/auto-imports) + TypeScript starter template, with [Payload CMS](https://payloadcms.com/docs).

- [VueUse](https://vueuse.org/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Pinia](https://pinia.vuejs.org/introduction.html)
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen/docs/getting-started)

## Requirements

- [Node 18](https://nodejs.org/en/download)
- [PNPM](https://pnpm.io/installation)
- [MongoDB](https://www.mongodb.com/docs/manual/administration/install-community/)
- [NGINX](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/)
- [mkcert](https://github.com/FiloSottile/mkcert) (optional)

## Usage

```bash
# Install packages
pnpm install

# Create .env interactively
pnpm run configure-env

# Update packages interactively (minor versions)
pnpm run update

# Update packages interactively (major versions)
pnpm run update-latest

# Start dev server
pnpm run dev

# Generate gql exports, possibleTypes, and Payload types (run while dev server is active)
pnpm run generate

# Build for production
pnpm run build

# Start server
pnpm run start
```

## Setup

### Nitro Dev Proxy

Nitro acts as a proxy for all Payload requests during development, using the `nitro.devProxy` option in `nuxt.config.js`. If you need to proxy additional routes, you can add the to the `payloadProxyRoutes` array.

### Environment Variables

Environment variables are defined in `.env` and shared between apps with `dotenv-cli`. Variables prefixed with `PAYLOAD_PUBLIC_` are exposed to Payload's client-side app.

Running `pnpm configure-env` will guide you through creating a `.env` file.

| Variable                      | Default                   | Description                                                 |
| ----------------------------- | ------------------------- | ----------------------------------------------------------- |
| `NITRO_HOST`                  | `0.0.0.0`                 | Host for Nuxt's Nitro server                                |
| `NITRO_PORT`                  | `3000`                    | Port used by Nitro's server                                 |
| `PAYLOAD_PUBLIC_SITE_NAME`    | `Nuxt x Payload Template` | The title of the site (used for page title templates, etc.) |
| `PAYLOAD_PUBLIC_SITE_URL`     | `https://localhost:3000`  | URL of the site, including protocol                         |
| `PAYLOAD_PUBLIC_PORT`         | `3001`                    | Port used by Payload's Express app                          |
| `PAYLOAD_PUBLIC_API_ROUTE`    | `/_payload`               | Route used for Payload's API                                |
| `PAYLOAD_PUBLIC_UPLOAD_ROUTE` | `/media`                  | Route used for Payload's upload collections                 |
| `DATABASE_NAME`               | `nuxt-payload`            | The name of the MongoDB database                            |
| `PAYLOAD_SECRET`              | -                         | A secret key used for encrypting Payload data/sessions      |

### Custom Local Hostname

You will need to set up a custom local hostname for local development, using NGINX and the provided `nginx-conf-examples/local.conf` config. If you use [`mkcert`](https://github.com/FiloSottile/mkcert) for local SSL certificates, you can use the provided `nginx-conf-examples/local-mkcert.conf`.

Make sure the update the `server_name` directive, any changes to the default ports, and the `ssl_certificate` and `ssl_certificate_key` paths if required.

You will also need our hosts file so the custom hostname resolves to `127.0.0.1`:

```
# /etc/hosts

127.0.0.1       example.test
```

> 💡 [`hostctl`](https://github.com/guumaster/hostctl) is a nice CLI tool for managing your hosts file

## DX

### Payload Types

Payload types can be generated by running the `generate` command

```bash
pnpm run generate --filter payload
```

You can easily access Payload's generated types within the Nuxt workspace using the `#payload` alias

```ts
import type { Image } from '#payload/types'
```

> 💡 Type imports must be explicit since Nuxt 3.8, so make sure to use `import type ...`

### Type-safe Relationship Fields

Payload Relationship fields for GraphQL queries are typed as `string | MyCollectionType` (or `string[] | MyCollectionType[]` when the field uses the `hasMany` option). This is because querying the field without any subfields will return the document ID:

```graphql
# Will return an ID
query GetRelationship {
  doc {
    relationshipField
  }
}

# Will return an object
query GetRelationship {
  doc {
    relationshipField {
      subField
    }
  }
}
```

This can cause type issues when using these fields within Nuxt, so there are two utility functions that can be used to check the type of relationship fields.

```vue
<script lang="ts" setup>
import type { MyCollectionType } from '#payload/types'

const obj = checkRelation<MyCollectionType>(data.doc.relationshipField) // MyCollectionType | null

const arr = checkRelationArray<MyCollectionType>(data.doc.relationshipHasManyField) // MyCollectionType[]
</script>
```

### GraphQL Exports

GraphQL documents are generated from the `.gql` files in `apps/nuxt/graphql`, and output to `apps/nuxt/graphql/index.js`. You can regenerate the exports using the `generate` script

```bash
pnpm run generate --filter nuxt
```

> 💡 Nuxt's generate script will also query the Payload schema, so make sure the Payload app is running (via dev server or otherwise)

### `usePayloadPage` composable

The `Pages` collection is set up for building predefined page templates, and the `usePayloadPage` composable makes it easy to retrieve page data using Apollo, while also automatically set any SEO/Meta values provided by `@payloadcms/plugin-seo`

```vue
<script lang="ts" setup>
import { GetHomePageDocument } from '@/graphql'

const doc = await usePayloadPage(GetHomePageDocument);
</script>
```

### Globals

Globals data is located in the `@/stores/globals` store, and is preloaded during SSR (see `apps/nuxt/app.vue`).

## Thanks

[@sifferhans](https://github.com/sifferhans) for telling me about Turborepo and Nitro proxies.
