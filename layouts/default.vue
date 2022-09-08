<template>
  <div>
    <NavBar />
    <main class="pt-24">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
}
</script>
