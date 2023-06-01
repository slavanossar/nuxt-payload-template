<template>
  <div>
    <p v-text="props.error.message" />
    <button @click="handleError">Clear errors</button>
  </div>
</template>

<script lang="ts" setup>
import type { H3Error } from 'h3'

interface Props {
  error: H3Error
}
const props = defineProps<Props>()

const handleError = () => clearError({ redirect: '/' })
</script>
