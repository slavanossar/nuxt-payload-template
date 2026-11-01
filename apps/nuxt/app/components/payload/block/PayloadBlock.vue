<template>
  <Component
    :is="BlockComponents[props.block.blockType]"
    :block="props.block"
    :sizes="props.block.blockType === 'imageBlock' ? props.sizes : undefined"
    :min-resolution="
      props.block.blockType === 'videoBlock' ? props.minResolution : undefined
    "
    :max-resolution="
      props.block.blockType === 'videoBlock' ? props.maxResolution : undefined
    "
  />
</template>

<script setup lang="ts">
import type { PayloadBlockProps } from './types'

const props = defineProps<PayloadBlockProps>()

const BlockComponents = {
  imageBlock: resolveComponent('payload/block/PayloadBlockImage'),
  videoBlock: resolveComponent('payload/block/PayloadBlockVideo'),
} as const
</script>
