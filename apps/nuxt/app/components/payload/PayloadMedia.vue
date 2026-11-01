<template>
  <PayloadBlockImage v-if="block?.blockType === 'imageBlock'" :block="block" />
  <PayloadBlockVideo
    v-else-if="block?.blockType === 'videoBlock'"
    :block="block"
  />
</template>

<script setup lang="ts">
import type { ImageBlock, VideoBlock } from '#payload-types'

interface Props {
  media: (ImageBlock | VideoBlock)[]
}

const props = defineProps<Props>()
const block = computed(() => props.media[0])
</script>
