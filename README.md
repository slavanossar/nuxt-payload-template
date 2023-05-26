# nuxt-payload-template

> ⚠️ Work In Progress

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

# Create .env
pnpm configure-env

# Update root packages
pnpm up

# Update Nuxt packages
pnpm up --filter nuxt

# Update Payload packages
pnpm up --filter payload

# Start dev server
pnpm run dev

# Generate gql exports, possibleTypes, and Payload types
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

You will need to set up a custom local hostname for local development, using NGINX and the provided `nginx-local-example.conf` config. If you use [`mkcert`](https://github.com/FiloSottile/mkcert) for local SSL certificates, you can use the provided `nginx-local-mkcert-example.conf`.

Make sure the update the `server_name` directive, any changes to the default ports, and the `ssl_certificate` and `ssl_certificate_key` paths if required.

You will also need our hosts file so the custom hostname resolves to `127.0.0.1`:

```
# /private/etc/hosts

127.0.0.1       example.test
::1             example.test
```

## Thanks

[@sifferhans](https://github.com/sifferhans) for telling me about Turborepo and Nitro proxies.
