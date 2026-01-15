<template>
  <Component :is="props.tag" class="whitespace-pre-wrap">
    {{ props.content }}
  </Component>
</template>

<script setup lang="ts">
import type { PayloadTextAreaProps } from './types'

const props = withDefaults(defineProps<PayloadTextAreaProps>(), { tag: 'p' })
</script>
