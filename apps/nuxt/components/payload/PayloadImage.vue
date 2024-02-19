<template>
  <img
    v-if="image"
    ref="root"
    :class="hasLoaded || !props.lazy ? '' : 'opacity-0'"
    :srcset="isPreloading ? srcset : ''"
    :sizes="props.sizes"
    :alt="image.description || ''"
    class="block w-full transition-opacity duration-500"
    @load="onLoad"
  />
</template>

<script lang="ts" setup>
import type { Image } from '#payload/types'

interface Props {
  image: string | Image
  lazy?: boolean
  sizes?: string
}

const props = withDefaults(defineProps<Props>(), {
  lazy: false,
  sizes: '100vw',
})

const image = checkRelationship<Image>(props.image)
const srcset = image ? generateSrcset(image) : ''

const root = ref<HTMLImageElement | null>(null)
const emit = defineEmits(['load'])
const hasLoaded = ref(false)
const isPreloading = ref(!props.lazy)

function onLoad() {
  hasLoaded.value = true
  emit('load')
}

onMounted(() => {
  const { top } = useElementBounding(root.value)

  watchEffect(() => {
    if (props.lazy && !isPreloading.value && top.value) {
      isPreloading.value = hasLoaded.value || top.value < window.innerHeight * 2
    }
  })

  if (!props.lazy && root.value?.complete) {
    onLoad()
  }
})
</script>
