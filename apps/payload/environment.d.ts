declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    PAYLOAD_PUBLIC_SITE_URL: string
    MONGODB_URI: string
    PAYLOAD_SECRET: string
  }
}
