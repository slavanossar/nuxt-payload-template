import possibleTypes from './graphql/possibleTypes.json'

const { SITE_NAME, SITE_URL } = process.env

const isDev = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/apollo',
    '@vue-macros/nuxt',
    '@vueuse/nuxt',
    'nuxt-schema-org',
    'nuxt-simple-sitemap',
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${SITE_URL}/api/graphql`,
        inMemoryCacheOptions: { possibleTypes },
        connectToDevTools: isDev,
      },
    },
  },
  schemaOrg: { host: SITE_URL },
  sitemap: { hostname: SITE_URL },
  runtimeConfig: {
    public: {
      site: {
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  },
  vite: {
    server: {
      hmr: {
        protocol: 'wss',
        clientPort: 443,
        path: 'hmr/',
      },
    },
  },
  experimental: {
    reactivityTransform: true,
  },
})
