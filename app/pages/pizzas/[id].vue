<template>
  <div class="p-4 gap-4 bg-indigo-50 h-screen">
    <NuxtLink class="text-blue-600 hover:underline" to="/"
      >← Назад к меню</NuxtLink
    >
    <div v-if="pizza" class="flex gap-2 mb-4">
      <img :alt="pizza.name" :src="pizza.image" class="pizza-card__image" />
      <div class="flex flex-col rounded-2xl p-4 bg-white transition w-full">
        <h1 class="text-3xl font-bold mb-1">{{ pizza.name }}</h1>
        <p class="text-gray-600 mb-2">{{ pizza.description }}</p>
        <p class="text-2xl font-semibold mb-6">{{ pizza.price }} ₽</p>
      </div>
    </div>

    <div v-else>
      <p>Пицца не найдена 😢</p>
    </div>
    <div>
      <CardsList />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetchPizza, pizzasL } from "~/data/pizzas.js";
import type { IPizza } from "~/types/pizza";
import { useRoute } from "#vue-router";
import CardsList from "~/components/CardsList.vue";

const route = useRoute();
const id = Number(route.params.id);

onMounted(() => {
  fetchPizza();
});

const pizza = computed(
  () => pizzasL.value.find((p: any) => p.id === id) as IPizza | undefined,
);
</script>

<style scoped>
.pizza-card__image {
  @apply rounded-xl mb-3 w-full h-80 object-cover bg-indigo-50;
}
</style>
