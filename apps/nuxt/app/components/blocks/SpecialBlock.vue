<template>
  <div>
    <p>Special Block</p>
    <PayloadTextArea v-if="props.block.superSpecialTextArea" :content="props.block.superSpecialTextArea" />
    <p v-else>No super special text area 😔</p>
  </div>
</template>

<script lang="ts" setup>
import type { SpecialBlock } from '#payload-types'

interface Props {
  block: SpecialBlock
}

const props = defineProps<Props>()
</script>