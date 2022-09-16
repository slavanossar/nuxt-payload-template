import possibleTypes from './possibleTypes.json'

const isDev = process.env.NODE_ENV !== 'production'

export default defineNuxtConfig({
  css: [],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/apollo'],
  buildModules: ['vite-plugin-vue-type-imports/nuxt'],
  apollo: {
    clients: {
      default: {
        httpEndpoint: `${process.env.SERVER_URL}/api/graphql`,
        inMemoryCacheOptions: { possibleTypes },
        connectToDevTools: isDev,
      },
    },
  },
  publicRuntimeConfig: {
    serverUrl: process.env.SERVER_URL,
  },
  experimental: {
    reactivityTransform: true,
  },
})
