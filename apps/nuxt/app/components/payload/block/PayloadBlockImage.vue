<template>
  <PayloadImage :image="block.image" :sizes="props.sizes" />
</template>

<script setup lang="ts">
import type { ImageBlockFragment } from '#graphql/exports'

interface Props {
  sizes?: string
  block: ImageBlockFragment
}

const props = withDefaults(defineProps<Props>(), { sizes: '100vw' })
</script>
