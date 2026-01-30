<template>
  <div>
    <p v-text="props.block.test" />
  </div>
</template>

<script setup lang="ts">
import type { DefaultBlock } from '#payload-types'

interface Props {
  block: DefaultBlock
}

const props = defineProps<Props>()
</script>
