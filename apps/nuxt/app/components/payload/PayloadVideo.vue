<template>
  <video
    ref="el"
    :src="video?.url || ''"
    :poster="videoThumbnail?.sizes?.thumbnail?.url || ''"
    :muted="props.muted"
  />
</template>

<script setup lang="ts">
import type { Video } from '#payload-types'

interface PayloadVideoProps {
  muted?: boolean
  video: string | Video
}

const props = defineProps<PayloadVideoProps>()
const video = useRelationshipField(props.video)
const videoThumbnail = useRelationshipField(video.value?.thumbnail)

const el = ref<HTMLVideoElement | null>(null)
const mediaControls = useMediaControls(el)
mediaControls.muted.value = props.muted

const { pause } = useIntervalFn(() => {
  if (mediaControls.duration.value === 0 && el.value?.duration) {
    mediaControls.duration.value = el.value.duration
    pause()
  }
}, 100)

defineExpose({ el, mediaControls })
</script>
