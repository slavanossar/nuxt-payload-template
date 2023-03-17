<template>
  <img
    ref="root"
    :class="hasLoaded || !lazy ? '' : 'opacity-0'"
    :srcset="isPreloading ? srcset : ''"
    :sizes="sizes"
    :alt="image.description || ''"
    class="block w-full transition-opacity duration-500"
    @load="onLoad"
  />
</template>

<script lang="ts" setup>
import type { Image } from '@/payload/types'

interface Props {
  image: Image
  lazy?: boolean
  sizes?: string
}

const { image, lazy = false, sizes = '100vw' } = defineProps<Props>()

const srcset = computed(() => generateSrcset(image))

const root = $ref<HTMLImageElement | null>(null)
const emit = defineEmits(['load'])
let hasLoaded = $ref(false)
let isPreloading = $ref(!lazy)

function onLoad() {
  hasLoaded = true
  emit('load')
}

onMounted(() => {
  const { top } = $(useElementBounding(root))

  watchEffect(() => {
    if (lazy) {
      isPreloading = hasLoaded || top < window.innerHeight * 2
    }
  })

  if (root!.complete) {
    onLoad()
  }
})
</script>
