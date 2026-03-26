<template>
  <div v-for="item in cart.items" :key="item.pizzaId" class="pizza-card">
    <div class="pizza-card__cross" @click="cart.removeFromCart(item.pizzaId)">
      <icon-close></icon-close>
    </div>
    <div class="pizza-card__list">
      <div class="pizza-card_top">
        <img :alt="item.name" :src="item.image" class="pizza-card__image" />
        <div>
          <h2 class="pizza-card__name">{{ item.name }}</h2>
          <p class="pizza-card_description">{{ item.description }}</p>
        </div>
      </div>

      <div class="pizza-card_bottom">
        <p class="pizza-card_price">{{ item.price }} ₽</p>
        <div class="pizza-card_button">
          <button
            class="pizza-card_button_remove"
            @click="cart.delFromCart(item.pizzaId)"
          >
            -
          </button>
          <button class="pizza-card_button__counter">
            {{ item.quantity }}
          </button>
          <button class="pizza-card_button__add" @click="cart.addToCart(item)">
            +
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from "~/stores/cart";
import IconClose from "~/components/icons/icon-close.vue";

const cart = useCartStore();
</script>

<style scoped>
.pizza-card {
  @apply relative rounded-2xl p-4 bg-white transition flex flex-row gap-4 w-full sm:w-3/4 lg:w-2/4;
}

.pizza-card__image {
  @apply rounded-xl w-16 h-16 object-cover bg-indigo-50;
}

.pizza-card__name {
  @apply text-[--main-text] text-xl font-semibold;
}

.pizza-card_description {
  @apply text-[--main-text] opacity-40;
}

.pizza-card_price {
  @apply text-[--main-text] font-semibold text-2xl;
}

.pizza-card_button {
  @apply text-indigo-400 text-xl font-semibold w-52 rounded-2xl items-center flex flex-row;
}

.pizza-card_button__add {
  @apply bg-indigo-200 text-indigo-400 text-xl w-full font-semibold rounded-tr-2xl rounded-br-2xl p-1 hover:bg-indigo-300 active:bg-indigo-400;
}

.pizza-card_button_remove {
  @apply bg-indigo-200 text-indigo-400 text-xl w-full font-semibold rounded-tl-2xl rounded-bl-2xl p-1 hover:bg-indigo-300 active:bg-indigo-400;
}

.pizza-card_button__counter {
  @apply bg-indigo-200 text-indigo-400 text-xl w-full font-semibold p-1  border-r border-l border-indigo-100;
}

.pizza-card_bottom {
  @apply flex flex-row items-center justify-between mt-2;
}

.pizza-card_top {
  @apply flex flex-row gap-2 border-b pb-2;
}

.pizza-card__cross {
  @apply absolute right-2 opacity-20 cursor-pointer hover:opacity-60;
}

.pizza-card__list {
  @apply flex flex-col w-full justify-between;
}
</style>
