declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NITRO_HOST: string
    NITRO_PORT: string
    SITE_NAME: string
    NEXT_PUBLIC_SITE_URL: string
    PORT: string
    NEXT_PUBLIC_PAYLOAD_API_ROUTE: string
    /**
     * Injected by the Vercel service binding from `nuxt` to `payloadcms`.
     * Do not set this in `.env`; local dev uses `NEXT_PUBLIC_SITE_URL`.
     */
    NUXT_PAYLOADCMS_URL?: string
  }
}
