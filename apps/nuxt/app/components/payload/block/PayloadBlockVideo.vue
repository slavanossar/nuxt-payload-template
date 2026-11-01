<template>
  <PayloadMuxVideo autoplay loop muted playsinline :video="props.block.video" />
</template>

<script setup lang="ts">
import type { VideoBlock } from '#payload-types'

interface Props {
  block: VideoBlock
}

const props = defineProps<Props>()
</script>
