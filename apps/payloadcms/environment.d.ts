declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PAYLOAD_PUBLIC_SITE_NAME: string
    PAYLOAD_PUBLIC_SITE_URL: string
    PORT: string
    PAYLOAD_PUBLIC_API_ROUTE: string
    PAYLOAD_PUBLIC_UPLOAD_ROUTE: string
    DATABASE_NAME: string
    PAYLOAD_SECRET: string
  }
}
