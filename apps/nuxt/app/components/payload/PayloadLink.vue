<template>
  <NuxtLink :to="to">
    {{ label }}
  </NuxtLink>
</template>

<script setup lang="ts">
import type { KeyPageLinkFragment } from '#graphql/exports'

type LinkDocument = {
  relationTo: string
  value: ({ __typename?: 'KeyPage' } & KeyPageLinkFragment) | null
}

const props = defineProps<{
  doc: LinkDocument
}>()

const to = computed(() => props.doc.value?.keyPageUri ?? '/')
const label = computed(() => props.doc.value?.keyPageTitle ?? '')
</script>
