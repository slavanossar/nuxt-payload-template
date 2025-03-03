<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-if="html" v-html="html" />
</template>

<script setup lang="ts">
import type { SVG } from '#payload-types'

interface PayloadSvgProps {
  svg: string | SVG
}

const props = defineProps<PayloadSvgProps>()
const svg = useRelationshipField(props.svg)
const html = ref('')

async function fetchSvg() {
  if (svg.value) {
    html.value = await $fetch<Blob>(svg.value.url!)
      .then((res) => {
        return res.text()
      })
      .catch(() => {
        return ''
      })
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
