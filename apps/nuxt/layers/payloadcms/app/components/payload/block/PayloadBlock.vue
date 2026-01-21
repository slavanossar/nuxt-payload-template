<template>
  <Component
    v-if="blockComponent"
    :is="blockComponent"
    :block="props.block"
  />
  <div v-else class="payload-block-error">
    <p>Block component not found for blockType: {{ blockType }}</p>
  </div>
</template>

<script setup lang="ts">
import type { PayloadBlockProps } from './types'

const props = defineProps<PayloadBlockProps>()

const blockType = computed(() => {
  return (props.block as { blockType?: string })?.blockType
})

// Convert blockType (e.g., 'block') to PascalCase component name (e.g., 'DefaultBlock')
const componentName = computed(() => {
  if (!blockType.value) return null
  
  // Convert kebab-case or camelCase to PascalCase
  return blockType.value
    .split(/[-_]/)
    .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
})

// Resolve component from globally registered blocks (see nuxt.config.ts components dirs)
const blockComponent = computed(() => {
  if (!componentName.value) return null
  
  const resolvedComponent = resolveComponent(componentName.value)

  return typeof resolvedComponent === 'string' ? null : resolvedComponent
})
</script>

<style scoped>
.payload-block-error {
  padding: 1rem;
  background-color: #fee;
  border: 1px solid #fcc;
  color: #c33;
  border-radius: 0.25rem;
}
</style>
