<template>
  <div class="cart-checkout">
    <div class="cart-checkout__promo">
      <div class="cart-checkout__promo-input-wrapper">
        <input
          v-model="cart.inputText"
          class="cart-checkout__promo-input"
          placeholder="Промокод"
          type="text"
        />
        <button
          v-if="cart.inputText && !cart.discountSale"
          class="cart-checkout__promo-button"
          @click="cart.getSale"
        >
          Применить
        </button>
      </div>
      <div v-if="cart.saleError" class="cart-checkout__promo-error">
        Неверный промокод
      </div>
    </div>

    <div class="cart-checkout__summary">
      <div class="cart-checkout__summary-row">
        <span>{{ cart.items.length }} товаров</span>
        <span>{{ cart.totalPrice }}₽</span>
      </div>

      <div
        v-if="cart.discountSale"
        class="cart-checkout__summary-row cart-checkout__summary-row--discount"
      >
        <span>Скидка по акции</span>
        <span class="cart-checkout__discount-value"
          >-{{ cart.discountSale }}</span
        >
      </div>
    </div>

    <button
      :disabled="ordersStore.isCreatingOrder === true"
      class="cart-checkout__button"
      @click="ordersStore.createOrder()"
    >
      <template v-if="ordersStore.isCreatingOrder">
        <Loading class="flex flex-row items-center justify-between" size="sm" />
      </template>

      <template v-else> Оформить заказ на {{ cart.salePrice }} </template>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from "~/stores/cart";
import { useOrdersStore } from "~/stores/orders";
import Loading from "~/components/Loading.vue";

const cart = useCartStore();
const ordersStore = useOrdersStore();
</script>

<style scoped>
.cart-checkout {
  @apply bg-white rounded-3xl p-4 w-full sm:w-3/4 lg:w-2/4;
}

.cart-checkout__promo {
  @apply flex flex-col pb-2 border-b border-indigo-100 mb-4;
}

.cart-checkout__promo-input-wrapper {
  @apply flex flex-row px-2;
}

.cart-checkout__button:disabled {
  @apply opacity-60 cursor-not-allowed;
}

.cart-checkout__promo-input {
  @apply w-full outline-none caret-indigo-800 font-medium;
}

.cart-checkout__promo-button {
  @apply text-indigo-800;
}

.cart-checkout__promo-error {
  @apply text-sm pl-2 text-red-600;
}

.cart-checkout__summary {
  @apply mt-4 mb-4;
}

.cart-checkout__summary-row {
  @apply flex flex-row font-semibold justify-between mb-2;
}

.cart-checkout__summary-row--discount {
  @apply mt-2;
}

.cart-checkout__discount-value {
  @apply text-indigo-800;
}

.cart-checkout__button {
  @apply bg-indigo-800 flex justify-center text-white text-xl font-semibold w-full rounded-2xl p-2 hover:bg-indigo-700 active:bg-indigo-900 items-center;
}
</style>
