<template>
  <img
    v-if="image"
    ref="root"
    :class="hasLoaded || !props.lazy ? '' : 'opacity-0'"
    :srcset="isPreloading ? srcset : ''"
    :sizes="sizes"
    :alt="image.description || ''"
    class="block w-full transition-opacity duration-500"
    @load="onLoad"
  />
</template>

<script setup lang="ts">
import type { Image } from '#payload/types'

interface PayloadImageProps {
  image: string | Image
  lazy?: boolean
  sizes?: SrcsetSizes
}

const props = withDefaults(defineProps<PayloadImageProps>(), {
  aspectRatio: 'auto',
  lazy: false,
  sizes: () => ({
    default: '100vw',
  }),
})

const image = useRelationshipField(props.image, 'images')
const srcset = generateSrcset(image)
const sizes = srcsetSizesToAttribute(props.sizes)

const root = ref<HTMLImageElement | null>(null)
const emit = defineEmits(['load'])
const hasLoaded = ref(false)
const isPreloading = ref(!props.lazy)

const onLoad = () => {
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
