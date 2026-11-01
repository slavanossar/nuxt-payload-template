<template>
  <div v-if="show" class="pointer-events-none absolute inset-0 z-9999">
    <div class="vertical-grid absolute inset-0 opacity-10" />
    <div class="fixed inset-0 opacity-10">
      <BaseGrid class="h-full">
        <div v-for="n in cols" :key="n" class="h-full bg-[#ff0000]" />
      </BaseGrid>
    </div>
  </div>
</template>

<script setup lang="ts">
const show = ref(false)
const controlState = useKeyModifier('Control')

const { md } = useTailwindBreakpoints()
const cols = computed(() => (md.value ? 12 : 4))

onKeyStroke('g', () => {
  if (controlState.value) {
    show.value = !show.value
  }
})
</script>

<style scoped>
.vertical-grid {
  background-image: url("data:image/svg+xml,%3Csvg width='1' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23F00' d='M0 0h1v4H0z'/%3E%3C/svg%3E");
}
</style>
