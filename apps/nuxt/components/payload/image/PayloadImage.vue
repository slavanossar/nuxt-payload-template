<template>
  <img
    v-if="image"
    ref="root"
    class="block transition-opacity duration-500"
    :class="hasLoaded || !props.lazy ? '' : 'opacity-0'"
    :srcset="isPreloading ? srcset : ''"
    :sizes="sizes"
    :alt="image.description || ''"
    @load="onLoad"
  />
</template>

<script setup lang="ts">
import type { PayloadImageProps } from './types'

const props = withDefaults(defineProps<PayloadImageProps>(), {
  lazy: false,
  sizes: () => ({
    default: '100vw',
  }),
})

const image = useRelationshipField(toRef(props, 'image'))
const srcset = useSrcset(image)
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
