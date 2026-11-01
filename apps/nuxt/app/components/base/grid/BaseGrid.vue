<template>
  <div class="grid" :class="classes">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { BaseGridProps } from './types'

const props = withDefaults(defineProps<BaseGridProps>(), {
  cols: true,
  colSpacing: true,
  px: true,
  py: false,
  rowSpacing: false,
})

const classes = computed(() => ({
  'grid-cols': props.cols,
  'grid-col-spacing': props.colSpacing,
  'grid-px': props.px,
  'grid-py': props.py,
  'grid-row-spacing': props.rowSpacing,
}))
</script>
