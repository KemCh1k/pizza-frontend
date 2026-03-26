<template>
  <div class="pizza-page">
    <div>
      <h1 class="pizzas-page__title">Меню</h1>
      <CardsList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import CardsList from "~/components/CardsList.vue";
</script>

<style scoped>
.pizza-page {
  @apply flex flex-col bg-indigo-50 gap-4 p-6;
}

.pizzas-page__title {
  @apply text-3xl font-bold mb-2 text-[--main-text];
}
</style>
