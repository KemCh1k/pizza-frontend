<template>
  <div
    v-if="cart.items.length === 0 && ordersStore.isCompleteOrder === false"
    class="cart-empty"
  >
    <div class="cart-empty__icon">🛒</div>
    <h2 class="cart-empty__title">Корзина пуста</h2>
    <p class="cart-empty__text">
      Похоже, вы ещё не добавили ни одной пиццы. <br />
      Самое время это исправить!
    </p>
    <NuxtLink class="cart-empty__button" to="/">
      Перейти к выбору пиццы
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from "~/stores/cart";
import { useOrdersStore } from "~/stores/orders";

const ordersStore = useOrdersStore();
const cart = useCartStore();
</script>

<style scoped>
/* Пустая корзина */
.cart-empty {
  @apply flex flex-col items-center justify-center text-center bg-white rounded-3xl shadow-md p-10 w-full sm:w-3/4 lg:w-2/4;
  animation: fadeIn 0.4s ease;
}

.cart-empty__icon {
  @apply text-6xl mb-4;
}

.cart-empty__title {
  @apply text-2xl font-semibold text-indigo-800 mb-2;
}

.cart-empty__text {
  @apply text-gray-600 mb-6 leading-relaxed;
}

.cart-empty__button {
  @apply bg-indigo-800 text-white font-semibold text-lg px-6 py-3 rounded-2xl hover:bg-indigo-700 active:bg-indigo-900 transition-all;
}

/* Простая анимация появления */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
