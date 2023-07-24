<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { GetGlobalsDocument } from '@/graphql'

const config = useRuntimeConfig()
const siteName = config.public.siteName
const siteUrl = config.public.siteUrl
const themeColour = '#000000'

const { data } = await useAsyncQuery<PayloadQuery>(GetGlobalsDocument)
const { Seo } = data.value!

useHead({
  bodyAttrs: {
    class: 'min-h-full font-body antialiased',
  },
  htmlAttrs: {
    class: 'h-full',
    lang: 'en',
  },
  titleTemplate(titleChunk) {
    return titleChunk ? `${titleChunk} | ${siteName}` : `${siteName}`
  },
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: Seo?.meta.description ?? '' },
    { property: 'og:title', content: siteName },
    { property: 'og:site_name', content: siteName },
    { property: 'og:description', content: Seo?.opengraph.description ?? '' },
    { property: 'og:url', content: siteUrl },
    {
      property: 'og:image',
      content: Seo?.opengraph.image?.sizes?.opengraph?.url ?? '',
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_image_large' },
    { name: 'twitter:url', content: siteUrl },
    { name: 'twitter:title', content: siteName },
    { name: 'twitter:description', content: Seo?.opengraph.description ?? '' },
    { name: 'apple-mobile-web-app-title', content: siteName },
    { name: 'msapplication-TileColor', content: themeColour },
    { name: 'msapplication-config', content: '/browserconfig.xml' },
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
    { rel: 'manifest', href: '/site.webmanifest' },
    {
      rel: 'mask-icon',
      href: '/favicon/safari-pinned-tab.svg',
      color: themeColour,
    },
  ],
})
</script>
