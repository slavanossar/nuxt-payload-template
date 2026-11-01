declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    SITE_NAME: string
    NEXT_PUBLIC_SITE_URL: string
    PORT: string
    NEXT_PUBLIC_PAYLOAD_API_ROUTE: string
    DATABASE_MONGODB_URI: string
    DATABASE_NAME: string
    PAYLOAD_SECRET: string
    SEED_STAFF_EMAIL: string
    SEED_STAFF_PASSWORD: string
    BLOB_READ_WRITE_TOKEN: string
    MUX_TOKEN_ID: string
    MUX_TOKEN_SECRET: string
    MUX_WEBHOOK_SECRET: string
  }
}
