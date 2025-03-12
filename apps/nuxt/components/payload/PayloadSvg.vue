<template>
  <component v-if="svgComponent" :is="svgComponent" />
</template>

<script setup lang="ts">
import type { SVG } from '#payload-types'

interface PayloadSvgProps {
  svg: string | SVG
}

const props = defineProps<PayloadSvgProps>()
const svg = useRelationshipField(props.svg)
const svgComponent = ref<ReturnType<typeof h> | null>(null)

async function fetchSvg() {
  if (svg.value) {
    const svgString = await $fetch<Blob>(svg.value.url!)
      .then((res) => res.text())
      .catch(() => '')

    if (svgString) {
      const div = document.createElement('div')
      div.innerHTML = svgString
      const svgElement = div.querySelector('svg')

      if (svgElement) {
        const attrs: Record<string, string> = {}
        Array.from(svgElement.attributes).forEach((attr) => {
          attrs[attr.name] = attr.value
        })

        svgComponent.value = h('svg', {
          ...attrs,
          innerHTML: svgElement.innerHTML,
        })
      }
    } else {
      svgComponent.value = null
    }
  }
}

onMounted(fetchSvg)
watch(toRef(props, 'svg'), fetchSvg)
</script>

<style scoped lang="postcss">
:deep(svg) {
  @apply h-auto max-w-full;
}
</style>
