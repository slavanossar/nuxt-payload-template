declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PORT: string
    DOMAIN: string
    SITE_NAME: string
    NEXT_PUBLIC_PAYLOAD_API_ROUTE: string
  }
}
