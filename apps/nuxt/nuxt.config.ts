import { resolve } from 'path'

/** Vite Plugins */
import tailwindPlugin from '@tailwindcss/vite'

import possibleTypes from './graphql/possibleTypes.json'

const {
  NODE_ENV,
  SITE_NAME,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PAYLOAD_API_ROUTE,
} = process.env

const isDev = NODE_ENV !== 'production'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  telemetry: {
    enabled: false,
  },
  devtools: {
    enabled: isDev,
    timeline: {
      enabled: true,
    },
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'motion-v/nuxt',
  ],
  alias: {
    '#css': resolve(__dirname, './app/assets/css/main.css'),
    '#graphql': resolve(__dirname, './graphql'),
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
        browserHttpEndpoint: `${NEXT_PUBLIC_PAYLOAD_API_ROUTE}/graphql`,
        inMemoryCacheOptions: { possibleTypes },
        connectToDevTools: isDev,
        tokenName: 'payload-token',
      },
    },
  },
  robots: {
    disallow: ['/admin', NEXT_PUBLIC_PAYLOAD_API_ROUTE],
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
  runtimeConfig: {
    // Overridden at runtime by the Vercel binding env `NUXT_PAYLOADCMS_URL`.
    // Leave unset locally; nginx still exposes Payload on the public site URL.
    payloadcmsUrl: '',
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
    plugins: [tailwindPlugin()],
    optimizeDeps: {
      include: [
        '@payloadcms/live-preview',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'graphql-tag',
      ],
    },
    server: {
      origin: NEXT_PUBLIC_SITE_URL,
      ws: {
        protocol: 'wss',
        host: 'nuxt-payload.test',
        clientPort: 443,
      },
    },
  },
})
