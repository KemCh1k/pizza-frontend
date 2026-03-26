<template>
  <div class="fixed top-4 left-4 right-4 z-50">
    <div class="pizza-page__header">
      <NuxtLink to="/">
        <div class="pizza-header__logo">
          <icon-logo-pizza-text />
        </div>
      </NuxtLink>
      <ul class="pizza-header__nav">
        <NuxtLink to="/">
          <li
            :class="[
              'pizza-header__text',
              route.path === '/' ? 'pizza-header__text__active' : '',
            ]"
            @click="ordersStore.updateOrder()"
          >
            <p>Главная</p>
          </li>
        </NuxtLink>

        <li>
          <p>/</p>
        </li>
        <NuxtLink to="/profile">
          <li
            :class="[
              'pizza-header__text',
              route.path === '/profile' ? 'pizza-header__text__active' : '',
            ]"
            @click="ordersStore.updateOrder()"
          >
            <p>Профиль</p>
          </li>
        </NuxtLink>

        <li>
          <p>/</p>
        </li>
        <NuxtLink to="/cart">
          <li
            :class="[
              'pizza-header__text',
              route.path === '/cart' ? 'pizza-header__text__active' : '',
            ]"
          >
            <p>Корзина</p>
            <div v-if="cart.items.length === 0"></div>
            <div
              v-else
              class="bg-indigo-800 text-white h-6 w-6 rounded-full flex flex-col justify-center items-center"
            >
              {{ cart.items.length }}
            </div>
          </li>
        </NuxtLink>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconLogoPizzaText from "~/components/icons/icon-logoPizzaText.vue";
import { useCartStore } from "~/stores/cart";
import { useOrdersStore } from "~/stores/orders";

const route = useRoute();

const cart = useCartStore();
const ordersStore = useOrdersStore();
</script>

<style scoped>
.pizza-page__header {
  @apply flex flex-row justify-between bg-white shadow-sm p-6 rounded-3xl;
}

.pizza-header__logo {
  @apply h-6 bg-indigo-800 fill-indigo-800;
}

.pizza-header__nav {
  @apply flex flex-row gap-2 text-base text-[--main-text];
}

.pizza-header__text {
  @apply text-[--main-text] hover:text-indigo-400 flex flex-row gap-1;
}

.pizza-header__text__active {
  @apply text-indigo-800 hover:text-indigo-400 flex flex-row gap-1;
}
</style>
