declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    DOMAIN: string
    SITE_NAME: string
    PORT: string
    NEXT_PUBLIC_PAYLOAD_API_ROUTE: string
    DATABASE_NAME: string
    PAYLOAD_SECRET: string
    S3_REGION: string
    S3_BUCKET: string
    S3_ACCESS_KEY_ID: string
    S3_SECRET_ACCESS_KEY: string
    CLOUDFRONT_DOMAIN: string
  }
}
