import type { IPizza } from "~/types/pizza";
import { pizzas } from "~/data/mockPizza";

export const pizzasL = ref<IPizza[]>([]);

export const fetchPizza = async () => {
  const { $api } = useNuxtApp();
  try {
    const data = await $api.pizzas.getPizzas();

    return (pizzasL.value = data);
  } catch (err) {
    console.log(err);
    pizzasL.value = pizzas;
  }
};
