<template>
  <PayloadImage :image="block.image" />
</template>

<script setup lang="ts">
import type { ImageBlockFragment } from '#graphql/exports'

interface Props {
  block: ImageBlockFragment
}

const props = defineProps<Props>()
</script>
