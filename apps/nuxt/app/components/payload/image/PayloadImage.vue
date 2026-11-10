<template>
  <NuxtImg
    v-if="src"
    ref="imageEl"
    :alt="alt"
    class="block w-full"
    :class="{
      'transition-opacity duration-500': fadeIn,
      'opacity-0': fadeIn && !hasLoaded,
    }"
    :height="height"
    :loading="loading"
    :preload="props.priority ? { fetchPriority: 'high' } : undefined"
    :sizes="sizes"
    :src="src"
    :width="width"
    @error="onError"
    @load="onLoad"
  />
</template>

<script setup lang="ts">
import type { PayloadImageProps } from './types'

const props = withDefaults(defineProps<PayloadImageProps>(), {
  image: null,
  lazy: false,
  priority: false,
})

const emit = defineEmits<{
  load: []
}>()

const imageEl = useTemplateRef<{
  imgEl: HTMLImageElement | { value: HTMLImageElement | null } | null
}>('imageEl')

const hasLoaded = ref(false)

const positiveDimension = (value: unknown): number | undefined =>
  typeof value === 'number' && Number.isFinite(value) && value > 0
    ? Math.round(value)
    : undefined

const src = computed(() => {
  const url = props.image?.url

  return typeof url === 'string' && url.length > 0 ? url : undefined
})

const alt = computed(() => props.image?.description || '')

const width = computed(() => positiveDimension(props.image?.width))
const height = computed(() => positiveDimension(props.image?.height))

const loading = computed(() =>
  props.priority || !props.lazy ? 'eager' : 'lazy',
)

const fadeIn = computed(() => props.lazy && !props.priority)

const imageElement = (): HTMLImageElement | null => {
  const exposed = imageEl.value?.imgEl

  if (exposed instanceof HTMLImageElement) return exposed

  if (
    exposed &&
    typeof exposed === 'object' &&
    'value' in exposed &&
    exposed.value instanceof HTMLImageElement
  ) {
    return exposed.value
  }

  return null
}

const markLoaded = () => {
  if (hasLoaded.value) return

  hasLoaded.value = true
  emit('load')
}

const revealIfComplete = () => {
  const element = imageElement()

  if (!element?.complete) return

  if (element.naturalWidth > 0) {
    markLoaded()
    return
  }

  hasLoaded.value = true
}

const onLoad = () => {
  markLoaded()
}

const onError = () => {
  hasLoaded.value = true
}

onMounted(revealIfComplete)

watch(src, async () => {
  hasLoaded.value = false
  await nextTick()
  revealIfComplete()
})
</script>
