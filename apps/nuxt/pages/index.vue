<template>
  <div v-if="fields">
    <p v-text="fields.myTextField" />
  </div>
</template>

<script lang="ts" setup>
const doc = await usePayloadPage('Home')
const fields = doc.value?.homeFields
</script>
