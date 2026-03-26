<template>
  <div v-if="ordersStore.isCompleteOrder === true" class="cart-complete">
    <h2 class="cart-complete__title">№{{ lastOrder?.id }}</h2>
    <p class="cart-complete__text">Заказ успешно оформлен. <br /></p>
    <NuxtLink class="cart-complete__button" to="/" @click="closeOrder">
      Перейти к выбору пиццы
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { useOrdersStore } from "~/stores/orders";

const ordersStore = useOrdersStore();
const closeOrder = () => {
  ordersStore.isCompleteOrder = false;
};

const lastOrder = computed(() => ordersStore.orders.at(-1));
</script>

<style scoped>
.cart-complete__title {
  @apply text-7xl text-center items-center font-semibold text-indigo-800 mb-2;
}

.cart-complete {
  @apply flex flex-col items-center justify-center text-center bg-white rounded-3xl shadow-md p-10 w-full sm:w-3/4 lg:w-1/2;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cart-complete__text {
  @apply text-gray-600 mb-6 leading-relaxed;
}

.cart-complete__button {
  @apply bg-indigo-800 w-full text-white font-semibold text-lg px-6 py-3 rounded-2xl hover:bg-indigo-700 active:bg-indigo-900 transition-all;
}
</style>
