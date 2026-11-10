<template>
  <div v-if="fields">
    <p v-text="fields.myTextField" />
  </div>
</template>

<script lang="ts" setup>
const doc = await usePayloadKeyPage('Home', { livePreview: { depth: 1 } })
const fields = computed(() => doc.value?.homeTemplateFields)
</script>
