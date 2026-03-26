import { defineStore } from "pinia";
import type { ICartPizza } from "~/types/pizza";
import type { ISale } from "~/types/sale";
import { MSales } from "~/data/sale";

export const useCartStore = defineStore("cart", () => {
  const items = ref<ICartPizza[]>([]);

  const { $api } = useNuxtApp();

  const fetchCart = async () => {
    try {
      const data = await $api.pizzas.getPizzasCart();
      items.value = data;
    } catch (e) {
      console.error("Ошибка при загрузке корзины:", e);
    }
  };

  const addToCart = async (pizza: ICartPizza) => {
    try {
      const pizzasCart = items.value.find(
        (item) => item.pizzaId === pizza.pizzaId || item.pizzaId === pizza.id,
      );

      if (pizzasCart) {
        await $api.pizzas.addPizzaToCart(pizzasCart.id, {
          quantity: pizzasCart.quantity,
        });

        pizzasCart.quantity++;
      } else {
        const data = await $api.pizzas.addToCartNew({
          ...pizza,
          pizzaId: pizza.id,
          quantity: 1,
        });

        items.value.push(data);
      }
    } catch (e) {
      console.error("Ошибка при добавлении в корзину:", e);
    }
  };

  const delFromCart = async (pizzaId: number) => {
    try {
      const item = items.value.find((item) => item.pizzaId === pizzaId);
      if (!item) return;

      if (item.quantity > 1) {
        await $api.pizzas.deletePizza(item.id, {
          quantity: item.quantity,
        });

        item.quantity--;
      } else {
        await removeFromCart(pizzaId);
      }
    } catch (e) {
      console.error("Ошибка при уменьшении количества:", e);
    }
  };

  const removeFromCart = async (pizzaId: number) => {
    const item = items.value.find((item) => item.pizzaId === pizzaId);
    if (!item) return;

    try {
      await $api.pizzas.removePizzaFromCart(item.id);

      items.value = items.value.filter((i) => i.pizzaId !== pizzaId);
    } catch (e) {
      console.error("Ошибка при удалении из корзины:", e);
    }
  };

  const pizzaById = (pizzaId: number) => {
    return items.value.find((item) => item.pizzaId === pizzaId) ?? null;
  };

  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  // SALE //
  const inputText = ref("");
  const discountSale = ref<number>(0);
  const saleError = ref(false);
  const salePrice = ref<number>(0);
  const saleR = ref<ISale[]>([]);
  const activeSale = ref<ISale | null>(null);

  const getSale = () => {
    const text = inputText.value.trim();
    saleR.value = MSales;

    const foundSale = saleR.value.find((s) => s.name === text);
    console.log(foundSale);

    if (foundSale) {
      const discount = Math.round((totalPrice.value * foundSale.value) / 100);
      discountSale.value = discount;
      const currentPrice = totalPrice.value - discount;
      salePrice.value = currentPrice;
      saleError.value = false;
      activeSale.value = foundSale;
    } else {
      saleError.value = true;
      activeSale.value = null;
    }
  };

  watch(totalPrice, () => {
    if (activeSale.value) {
      const discount = Math.round(
        (totalPrice.value * activeSale.value.value) / 100,
      );
      discountSale.value = discount;
      salePrice.value = totalPrice.value - discount;
    } else {
      discountSale.value = 0;
      salePrice.value = totalPrice.value;
    }
  });

  return {
    items,
    fetchCart,
    addToCart,
    delFromCart,
    removeFromCart,
    pizzaById,
    totalCount,
    totalPrice,
    getSale,
    salePrice,
    inputText,
    discountSale,
    saleError,
  };
});
