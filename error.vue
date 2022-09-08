<template>
  <div>
    <button @click="handleError">Clear errors</button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  error: object
}
const props = defineProps<Props>()

const handleError = () => clearError({ redirect: '/' })
</script>
