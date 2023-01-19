declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NITRO_HOST: string
    NITRO_PORT: string
    SERVER_URL: string
  }
}
