declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    SITE_NAME: string
    NEXT_PUBLIC_SITE_URL: string
    PORT: string
    NEXT_PUBLIC_PAYLOAD_API_ROUTE: string
    DATABASE_NAME: string
    PAYLOAD_SECRET: string
    SEED_STAFF_EMAIL: string
    R2_REGION: string
    R2_BUCKET: string
    R2_ACCESS_KEY_ID: string
    R2_SECRET_ACCESS_KEY: string
    R2_CUSTOM_DOMAIN: string
    MUX_TOKEN_ID: string
    MUX_TOKEN_SECRET: string
    MUX_WEBHOOK_SECRET: string
  }
}
