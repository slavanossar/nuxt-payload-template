import { PayloadSDK } from '@payloadcms/sdk'
import type { Config } from '#payload-types'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const payloadApi = new PayloadSDK<Config>({
    baseURL: [
      runtimeConfig.public.siteUrl,
      runtimeConfig.public.payloadApiRoute,
    ].join(''),
    fetch: $fetch,
  })

  return {
    provide: { payloadApi },
  }
})
