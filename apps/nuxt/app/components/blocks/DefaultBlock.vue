<template>
  <div>
    <p v-text="block.test" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultBlock } from '#payload-types'

interface Props {
  block: DefaultBlock
}

defineProps<Props>()
</script>
