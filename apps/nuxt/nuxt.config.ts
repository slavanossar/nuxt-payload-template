import { resolve } from 'path'

import possibleTypes from './graphql/possibleTypes.json'

const {
  NODE_ENV,
  SITE_NAME,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PAYLOAD_API_ROUTE,
} = process.env

const isDev = NODE_ENV !== 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-03-03',
  telemetry: {
    enabled: false,
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [],
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
  ],
  alias: {
    '#payload-config': resolve(
      __dirname,
      '../payloadcms/src/payload.config.ts',
    ),
    '#payload-types': resolve(__dirname, '../payloadcms/payload-types.d.ts'),
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: [
          NEXT_PUBLIC_SITE_URL,
          NEXT_PUBLIC_PAYLOAD_API_ROUTE,
          '/graphql',
        ].join(''),
        inMemoryCacheOptions: { possibleTypes },
        connectToDevTools: isDev,
      },
    },
  },
  robots: {
    disallow: ['/admin', '/api', NEXT_PUBLIC_PAYLOAD_API_ROUTE],
  },
  site: {
    url: NEXT_PUBLIC_SITE_URL,
    name: SITE_NAME,
    defaultLocale: 'en-AU',
  },
  sitemap: {
    exclude: [],
    sources: ['/api/__sitemap__/urls'],
  },
  tailwindcss: {
    exposeConfig: true,
  },
  runtimeConfig: {
    public: {
      siteName: SITE_NAME,
      siteUrl: NEXT_PUBLIC_SITE_URL,
      payloadApiRoute: NEXT_PUBLIC_PAYLOAD_API_ROUTE,
      language: 'en-AU',
      isDev,
    },
  },
  build: { transpile: [] },
  vite: {
    plugins: [],
  },
})
