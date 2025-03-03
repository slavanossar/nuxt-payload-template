<template>
  <div v-if="fields">
    <p v-text="fields.myTextField" />
  </div>
</template>

<script lang="ts" setup>
const initialData = await usePayloadPage('Home')
const { data: doc } = useLivePreview({ initialData, depth: 1 })
const fields = doc.value?.homeTemplateFields
</script>
