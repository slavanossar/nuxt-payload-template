<template>
  <video
    ref="el"
    :src="video?.url || ''"
    :poster="videoThumbnail?.sizes?.thumbnail?.url || ''"
    :muted="props.muted"
  />
</template>

<script setup lang="ts">
interface VideoThumbnail {
  sizes?: {
    thumbnail?: {
      url?: string | null
    } | null
  } | null
}

interface VideoDoc {
  url?: string | null
  thumbnail?: VideoThumbnail | null
}

interface PayloadVideoProps {
  muted?: boolean
  video: VideoDoc
}

const props = defineProps<PayloadVideoProps>()
const video = toRef(props, 'video')
const videoThumbnail = computed(() => video.value.thumbnail)

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
