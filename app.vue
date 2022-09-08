<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  titleTemplate(titleChunk) {
    return titleChunk ? `${titleChunk} | {{ SITE_TITLE }}` : '{{ SITE_TITLE }}'
  },
})
</script>
