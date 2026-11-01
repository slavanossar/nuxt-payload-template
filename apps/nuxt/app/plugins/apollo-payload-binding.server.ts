import { NuxtApollo } from '#apollo'

import { payloadEndpoint } from '~/utils/payloadEndpoint'

/**
 * Point server-side GraphQL at the Payload service binding.
 * The browser keeps the public `/payload-api` URL from `browserHttpEndpoint`.
 * Bindings are injected at runtime, so this runs per request rather than at build.
 */
export default defineNuxtPlugin({
  name: 'apollo-payload-binding',
  enforce: 'pre',
  setup() {
    const config = useRuntimeConfig()
    const base = config.payloadcmsUrl

    if (!base) return

    const client = NuxtApollo.clients.default

    if (!client) return

    client.httpEndpoint = payloadEndpoint(
      base,
      config.public.payloadApiRoute,
      'graphql',
    )
  },
})
