<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { useGlobalsStore } from '~/stores/globals'
import { theme } from '#tailwind-config'

import type { UseSeoMetaInput } from '@unhead/vue'

const config = useRuntimeConfig()

const globalsStore = useGlobalsStore()
await globalsStore.load()

/**
 * SEO / Meta
 */
const seoMeta: UseSeoMetaInput = {
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: 'summary_large_image',
}

seoMeta.title =
  seoMeta.ogTitle =
  seoMeta.twitterTitle =
    globalsStore.settings?.meta?.title || config.public.siteName

seoMeta.description =
  seoMeta.ogDescription =
  seoMeta.twitterDescription =
    globalsStore.settings?.meta?.description || ''

const opengraphImage = useRelationshipField(globalsStore.settings?.meta?.image)

if (opengraphImage.value?.sizes?.opengraph?.url) {
  seoMeta.ogImage = opengraphImage.value.sizes.opengraph.url
}

useSeoMeta(seoMeta)

const title = globalsStore.settings?.meta?.title || config.public.siteName
const themeColour = theme.colors.black

/**
 * Head / Favicon
 */
useHead({
  bodyAttrs: {
    class: 'min-h-full font-body antialiased',
  },
  htmlAttrs: {
    class: 'h-full',
    lang: config.public.language,
  },
  meta: [
    { charset: 'utf-8' },
    {
      name: 'viewport',
      content:
        'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
    },
    { name: 'apple-mobile-web-app-title', content: title },
    { name: 'msapplication-TileColor', content: themeColour },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
    { name: 'theme-color', content: theme.colors.black },
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
    { rel: 'manifest', href: '/site.webmanifest' },
    {
      rel: 'mask-icon',
      href: '/favicon/safari-pinned-tab.svg',
      color: themeColour,
    },
    {
      rel: 'shortcut icon',
      href: '/favicon/favicon.ico',
    },
  ],
})
</script>
