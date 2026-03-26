<template>
  <div class="pizzas-page__content">
    <CartEmpty />

    <OrderIsComplete />

    <div v-if="cart.items.length > 0" class="pizza-cart__top">
      <b class="pizza-cart__top-text">
        {{ cart.items.length }} товаров на {{ cart.totalPrice }}₽
      </b>
    </div>

    <CardCart />
    <CartCheckout v-if="cart.items.length > 0" />
  </div>
</template>

<script lang="ts" setup>
import { useCartStore } from "~/stores/cart";
import { fetchPizza } from "~/data/pizzas";
import CardCart from "~/components/CardCart.vue";
import CartEmpty from "~/components/CartEmpty.vue";
import { useOrdersStore } from "~/stores/orders";
import OrderIsComplete from "~/components/OrderIsComplete.vue";

const ordersStore = useOrdersStore();
const cart = useCartStore();

onMounted(() => {
  fetchPizza();
  ordersStore.fetchOrder();
  cart.fetchCart();
});
</script>

<style scoped>
.pizzas-page__content {
  @apply flex flex-col bg-indigo-50 gap-2 p-6 h-screen items-center;
}

.pizza-cart__top {
  @apply flex flex-row justify-center items-center bg-white rounded-3xl p-4 w-full sm:w-3/4 lg:w-2/4;
}
.pizza-cart__top-text {
  @apply font-medium text-[--main] text-2xl;
}
</style>
