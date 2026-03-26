import { defineStore } from "pinia";
import type { ICreateOrder, IOrder } from "~/types/pizza";
import { useCartStore } from "~/stores/cart";

export const useOrdersStore = defineStore("orders", () => {
  const cart = useCartStore();
  const { $api } = useNuxtApp();
  const orders = ref<IOrder[]>([]);

  const fetchOrder = async () => {
    try {
      const data = await $api.pizzas.getOrder();
      orders.value = data;
    } catch (e) {
      console.error("Ошибка при загрузке корзины:", e);
    }
  };

  /**
   * @description jsdoc example
   */
  const isCreatingOrder = ref<boolean>(false);
  const isCompleteOrder = ref<boolean>(false);
  const order = ref<ICreateOrder[]>([]);

  const createOrder = async () => {
    try {
      isCreatingOrder.value = true;
      const orderData = {
        items: cart.items,
        totalPrice: cart.totalPrice,
        salePrice: cart.salePrice,
      };
      await $api.pizzas.addOrder(orderData);

      await $api.pizzas.clearCart({ items: [] });

      order.value = [orderData];
      await fetchOrder();
      await cart.fetchCart();
    } catch (e) {
      console.error(e);
    } finally {
      isCreatingOrder.value = false;
      isCompleteOrder.value = true;
    }
  };

  const updateOrder = () => {
    isCompleteOrder.value = false;
  };

  return {
    orders,
    order,
    createOrder,
    isCreatingOrder,
    fetchOrder,
    isCompleteOrder,
    updateOrder,
  };
});
