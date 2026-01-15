import { resolve } from 'path'

// import possibleTypes from './graphql/possibleTypes.json'

const { NODE_ENV, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_PAYLOAD_API_ROUTE } =
  process.env

const isDev = NODE_ENV !== 'production'

export default defineNuxtConfig({
  modules: ['@nuxtjs/apollo', '@pinia/nuxt', '@nuxtjs/seo'],
  alias: {
    // '#graphql-exports': resolve(__dirname, './graphql/index.js'),
    '#payload-config': resolve(
      __dirname,
      '../../../payloadcms/src/payload.config.ts',
    ),
    '#payload-types': resolve(
      __dirname,
      '../../../payloadcms/payload-types.d.ts',
    ),
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: [
          NEXT_PUBLIC_SITE_URL,
          NEXT_PUBLIC_PAYLOAD_API_ROUTE,
          '/graphql',
        ].join(''),
        // inMemoryCacheOptions: { possibleTypes },
        connectToDevTools: isDev,
      },
    },
  },
  robots: {
    disallow: ['/admin', '/api', NEXT_PUBLIC_PAYLOAD_API_ROUTE],
  },
  sitemap: {
    exclude: [],
    sources: ['/api/__sitemap__/urls'],
  },
  runtimeConfig: {
    public: {
      payloadApiRoute: NEXT_PUBLIC_PAYLOAD_API_ROUTE,
    },
  },
})
