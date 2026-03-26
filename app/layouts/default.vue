<template>
  <div>
    <Header />

    <main class="pt-20 bg-indigo-50">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from "~/components/Header.vue";
</script>

<style scoped></style>
