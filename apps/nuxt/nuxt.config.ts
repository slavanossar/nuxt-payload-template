import { resolve } from 'path'

import introspectionResult from './graphql/introspection.json'
import { tailwindBreakpoints } from './app/utils/tailwindBreakpoints'

/** Vite Plugins */
import tailwindPlugin from '@tailwindcss/vite'

const {
  NODE_ENV,
  SITE_NAME,
  NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_PAYLOAD_API_ROUTE,
  BLOB_STORE_ID,
  VERCEL_URL,
  VERCEL_BRANCH_URL,
} = process.env

const isDev = NODE_ENV !== 'production'
const siteUrl = NEXT_PUBLIC_SITE_URL

const blobHostname = BLOB_STORE_ID
  ? `${BLOB_STORE_ID.replace(/^store_/, '')}.public.blob.vercel-storage.com`
  : undefined

const getHostname = (value: string | undefined): string | undefined => {
  if (!value) return undefined

  try {
    return new URL(value).hostname
  } catch {
    return undefined
  }
}

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
    '@nuxt/image',
    '@nuxtjs/apollo',
    '@pinia/nuxt',
    '@nuxtjs/seo',
    '@vercel/analytics/nuxt',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    'nuxt-svgo',
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
        inMemoryCacheOptions: {
          possibleTypes: introspectionResult.possibleTypes,
        },
        connectToDevTools: isDev,
        tokenName: 'payload-token',
      },
    },
  },
  image: {
    provider: process.env.VERCEL ? 'vercel' : 'ipx',
    domains: [
      getHostname(NEXT_PUBLIC_SITE_URL),
      getHostname(VERCEL_URL && `https://${VERCEL_URL}`),
      getHostname(VERCEL_BRANCH_URL && `https://${VERCEL_BRANCH_URL}`),
      blobHostname,
    ].filter((hostname): hostname is string => Boolean(hostname)),
    densities: [1, 2],
    quality: 75,
    screens: tailwindBreakpoints,
    vercel: {
      formats: ['image/webp'],
      minimumCacheTTL: 60 * 60 * 24 * 30,
    },
  },
  robots: {
    disallow: ['/admin', NEXT_PUBLIC_PAYLOAD_API_ROUTE],
  },
  site: {
    url: siteUrl,
    name: SITE_NAME,
    defaultLocale: 'en-AU',
  },
  sitemap: {
    exclude: [],
    sources: ['/api/__sitemap__/urls'],
  },
  svgo: {
    autoImportPath: ['./assets/svgs/'],
    componentPrefix: 'svg',
    dts: true,
  },
  runtimeConfig: {
    // Overridden at runtime by the Vercel binding env `NUXT_PAYLOADCMS_URL`.
    // Leave unset locally; nginx still exposes Payload on the public site URL.
    payloadcmsUrl: '',
    public: {
      siteName: SITE_NAME,
      siteUrl,
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
      origin: siteUrl,
      ws: {
        protocol: 'wss',
        host: 'nuxt-payload.test',
        clientPort: 443,
      },
    },
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('mux-'),
    },
  },
})
