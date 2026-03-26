<template>
  <div class="pizzas-page__content">
    <div v-for="pizza in pizzasL" :key="pizza.id" class="pizza-card">
      <NuxtLink :to="`/pizzas/${pizza.id}`">
        <img :alt="pizza.name" :src="pizza.image" class="pizza-card__image" />
        <h2 class="pizza-card__name">{{ pizza.name }}</h2>
        <p class="pizza-card_description">{{ pizza.description }}</p>
        <p class="pizza-card_price">{{ pizza.price }} ₽</p>
      </NuxtLink>
      <div
        v-if="cart.pizzaById(pizza.id)"
        class="bg-indigo-200 text-white text-xl font-semibold rounded-2xl flex flex-row items-center justify-between"
      >
        <button
          class="pizza-card_button_remove"
          @click="cart.delFromCart(pizza.id)"
        >
          -
        </button>
        <button class="pizza-card_button__counter">
          {{ cart.pizzaById(pizza.id)?.quantity }}
        </button>
        <button
          class="pizza-card_button pizza-card_button--add"
          @click="cart.addToCart(pizza)"
        >
          +
        </button>
      </div>
      <button
        v-else
        :disabled="loadingId === pizza.id"
        class="pizza-card_button"
        @click="handleAdd(pizza)"
      >
        <template v-if="loadingId === pizza.id">
          <Loading
            class="flex flex-row items-center justify-between"
            size="sm"
          />
        </template>

        <template v-else> Добавить </template>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { fetchPizza, pizzasL } from "~/data/pizzas";
import { useCartStore } from "~/stores/cart";
import Loading from "~/components/Loading.vue";
import { useOrdersStore } from "~/stores/orders";

const loadingId = ref<number | null>(null);

const handleAdd = async (pizza: any) => {
  loadingId.value = pizza.id;
  try {
    await cart.addToCart(pizza);
  } finally {
    loadingId.value = null;
  }
};

onMounted(() => {
  fetchPizza();
  cart.fetchCart();
  ordersStore.fetchOrder();
  ordersStore.updateOrder();
});

const cart = useCartStore();
const ordersStore = useOrdersStore();
</script>

<style lang="scss" scoped>
.pizzas-page__content {
  @apply grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1;
}

.pizza-card {
  @apply rounded-2xl p-4 bg-white transition flex flex-col justify-between;
}

.pizza-card__image {
  @apply rounded-xl mb-3 w-full h-48 object-cover bg-indigo-50;
}

.pizza-card__name {
  @apply text-[--main-text] text-xl font-semibold;
}

.pizza-card_description {
  @apply text-[--main-text] opacity-40 mb-2;
}

.pizza-card_price {
  @apply text-[--main-text] font-bold text-xl mb-2;
}

.pizza-card_button {
  @apply bg-indigo-800 flex justify-center  text-white text-xl font-semibold w-full rounded-2xl p-2 hover:bg-indigo-700 active:bg-indigo-900 items-center;

  &--add {
    @apply bg-indigo-200 text-indigo-400 text-xl w-full font-semibold rounded-tr-2xl rounded-br-2xl hover:bg-indigo-300 active:bg-indigo-400;
  }
}

.pizza-card_button_remove {
  @apply bg-indigo-200 text-indigo-400 text-xl w-full font-semibold rounded-tl-2xl rounded-bl-2xl p-2 hover:bg-indigo-300 active:bg-indigo-400;
}

.pizza-card_button__counter {
  @apply bg-indigo-200 text-indigo-400 text-xl w-full font-semibold p-2 border-r border-l;
}
</style>
