import possibleTypes from './graphql/possibleTypes.json'

const { SITE_NAME, SITE_DESCRIPTION, SITE_URL } = process.env
const isDev = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
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
  runtimeConfig: {
    public: {
      siteName: SITE_NAME,
      siteUrl: SITE_URL,
      siteDescription: SITE_DESCRIPTION,
      language: 'en-AU',
      titleSeparator: '|',
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
