<template>
  <mux-player
    ref="playerRef"
    disable-tracking
    :min-resolution="minResolution"
    :max-resolution="maxResolution"
    rendition-order="desc"
    :style="{ aspectRatio: props.video?.aspectRatio }"
    :thumbnail-time="props.video?.posterTimestamp ?? 0"
    @loadeddata.once="emit('load')"
    v-bind="{ ...props.video?.playbackOptions?.[0] }"
  />
</template>

<script setup lang="ts">
import '@mux/mux-player'

import type { MuxVideoProps } from './types'

const props = defineProps<MuxVideoProps>()
const emit = defineEmits(['load', 'play', 'pause'])

/** Template Refs */
const playerRef = useTemplateRef<HTMLVideoElement>('playerRef')

/** Resolution */
const { md, lg } = useTailwindBreakpoints()
const minResolution = computed(
  () =>
    props.minResolution ?? (lg.value ? '1080p' : md.value ? '720p' : '540p'),
)
const maxResolution = computed(
  () =>
    props.maxResolution ?? (lg.value ? '2160p' : md.value ? '1440p' : '720p'),
)

/** Lazy Loading */
// const showPlayer = useElementVisibility(playerRef, {
//   once: true,
//   rootMargin: '0 0 100vh 0',
// })
</script>

<style scoped>
mux-player {
  --controls: none;
  --media-object-fit: cover;
  --media-object-position: center;
  --media-background-color: transparent;
}
</style>
