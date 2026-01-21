<template>
  <div v-if="fields">
    <p v-text="fields.myTextField" />
    <PayloadBlock v-for="block in fields.blocks" :key="block.id!" :block="block" />
  </div>
</template>

<script lang="ts" setup>
const initialData = await usePayloadPage('Home')
const { data: doc } = useLivePreview({ initialData, depth: 1 })
const fields = doc.value?.homeTemplateFields
</script>
