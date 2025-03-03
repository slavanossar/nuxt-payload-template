declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NITRO_HOST: string
    NITRO_PORT: string
    SITE_NAME: string
    NEXT_PUBLIC_SITE_URL: string
    PORT: string
    NEXT_PUBLIC_PAYLOAD_API_ROUTE: string
  }
}
