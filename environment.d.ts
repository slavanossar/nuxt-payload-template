declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NITRO_HOST: string
    NITRO_PORT: string
    SERVER_URL: string
    MONGODB_URL: string
    PAYLOAD_SECRET_KEY: string
  }
}
