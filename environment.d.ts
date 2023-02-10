declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    NITRO_HOST: string
    NITRO_PORT: string
    SITE_URL: string
    SITE_NAME: string
    SITE_DESCRIPTION: string
  }
}
