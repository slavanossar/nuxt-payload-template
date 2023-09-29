<template>
  <!-- eslint-disable vue/no-v-html -->
  <div v-html="$serialise(props.content as unknown as RichTextNode[])" />
  <!-- eslint-enable vue/no-v-html -->
</template>

<script lang="ts" setup>
interface Props {
  content: {
    [k: string]: unknown
  }[]
}

const props = defineProps<Props>()
</script>
