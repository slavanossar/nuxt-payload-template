<template>
  <NuxtLayout>
    <SeoKit :site-description="Opengraph?.description" />
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { GetGlobalsDocument } from '@/graphql'

const config = useRuntimeConfig()
const siteName = config.public.siteName
const themeColour = '#000000'

const { data } = $(await useAsyncQuery<PayloadQuery>(GetGlobalsDocument))
const { Opengraph } = data!

defineOgImageDynamic({
  component: 'OpengraphImage',
  backgroundImage: Opengraph?.image.sizes.opengraph.url,
})

useHead({
  bodyAttrs: {
    class: 'min-h-full font-body antialiased',
  },
  htmlAttrs: {
    class: 'h-full',
    lang: 'en',
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'apple-mobile-web-app-title', content: siteName },
    { name: 'msapplication-TileColor', content: themeColour },
    { name: 'msapplication-config', content: '/favicon/browserconfig.xml' },
    { name: 'theme-color', content: themeColour },
  ],
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/favicon/site.webmanifest' },
    {
      rel: 'mask-icon',
      href: '/favicon/safari-pinned-tab.svg',
      color: themeColour,
    },
  ],
})
</script>
