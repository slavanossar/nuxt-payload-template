declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    SITE_URL: string
    MONGODB_URI: string
    PAYLOAD_SECRET: string
  }
}
