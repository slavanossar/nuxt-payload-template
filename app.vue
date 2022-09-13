<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const title = '{{ SITE_TITLE }}'
const description = '{{ SITE_DESCRIPTION }}'
const url = '{{ SITE_URL }}'
const themeColour = '#000000'

useHead({
  titleTemplate(titleChunk) {
    return titleChunk ? `${titleChunk} | ${title}` : `${title}`
  },
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
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:site_name', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: '/opengraph.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_image_large' },
    { name: 'twitter:url', content: url },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'apple-mobile-web-app-title', content: title },
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
