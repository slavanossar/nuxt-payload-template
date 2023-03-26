import possibleTypes from './graphql/possibleTypes.json'

const { SITE_NAME, SITE_DESCRIPTION, SITE_URL } = process.env
const isDev = process.env.NODE_ENV !== 'production'

const payloadProxyRoutes = ['/_payload', '/admin', '/media']
const payloadUrl = 'http://localhost:3001'

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
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${SITE_URL}/_payload/graphql`,
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
    },
  },
  nitro: {
    devProxy: payloadProxyRoutes.reduce((routeRules, route) => {
      return {
        ...routeRules,
        [route]: `${payloadUrl}${route}`,
      }
    }, {}),
    routeRules: payloadProxyRoutes.reduce((routeRules, route) => {
      return {
        ...routeRules,
        [route]: { proxy: `${payloadUrl}${route}` },
      }
    }, {}),
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
