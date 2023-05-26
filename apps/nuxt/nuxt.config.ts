import { resolve } from 'path'
import possibleTypes from './graphql/possibleTypes.json'

const {
  NODE_ENV,
  PAYLOAD_PUBLIC_SITE_NAME,
  PAYLOAD_PUBLIC_SITE_URL,
  PAYLOAD_PUBLIC_PORT,
  PAYLOAD_PUBLIC_API_ROUTE,
  PAYLOAD_PUBLIC_UPLOAD_ROUTE,
} = process.env

const isDev = NODE_ENV !== 'production'

const payloadProxyRoutes = [
  '/admin',
  PAYLOAD_PUBLIC_API_ROUTE,
  PAYLOAD_PUBLIC_UPLOAD_ROUTE,
]
const payloadUrl = `http://localhost:${PAYLOAD_PUBLIC_PORT}`

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
  alias: {
    '#payload': resolve(__dirname, '../payload'),
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${PAYLOAD_PUBLIC_SITE_URL}/_payload/graphql`,
        inMemoryCacheOptions: { possibleTypes },
        connectToDevTools: isDev,
      },
    },
  },
  runtimeConfig: {
    public: {
      siteName: PAYLOAD_PUBLIC_SITE_NAME,
      siteUrl: PAYLOAD_PUBLIC_SITE_URL,
    },
  },
  nitro: {
    devProxy: {
      ...payloadProxyRoutes.reduce((routeRules, route) => {
        return {
          ...routeRules,
          [route]: `${payloadUrl}${route}`,
        }
      }, {}),
      // Websockets currently unsupported https://github.com/unjs/nitro/issues/678
      // '/__webpack_hmr': {
      //   target: `${payloadUrl}/__webpack_hmr`,
      //   ws: true,
      // },
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
})
