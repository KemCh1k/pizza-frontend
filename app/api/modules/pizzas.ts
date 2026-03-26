import HttpFactory from "~/api/factory";
import type { ICartPizza, IOrder, IPizza } from "~/types/pizza";

class Pizzas extends HttpFactory {
  async getPizzasCart() {
    return this.call<ICartPizza[]>("GET", "/cart");
  }

  async getPizzas() {
    return this.call<IPizza[]>("GET", "/pizzas");
  }

  async addPizzaToCart(id: number, data: { quantity: number }) {
    return this.call<ICartPizza>("PATCH", `/cart/${id}`, data);
  }

  async addToCartNew(data: { pizzaId: number; quantity: number }) {
    return this.call<ICartPizza>("POST", `/cart`, data);
  }

  async deletePizza(id: number, data: { quantity: number }) {
    return this.call<ICartPizza>("PATCH", `/cart/${id}`, data);
  }

  async removePizzaFromCart(id: number) {
    return this.call<ICartPizza>("DELETE", `/cart/${id}`);
  }

  async addOrder(data: {
    items: ICartPizza[];
    totalPrice: number;
    salePrice: number;
  }) {
    return this.call<ICartPizza[]>("POST", `/orders`, data);
  }

  async getOrder() {
    return this.call<IOrder[]>("GET", `/orders`);
  }

  async clearCart(data: { items: ICartPizza[] }) {
    return this.call<ICartPizza>("PATCH", `/cart`, data.items);
  }
}

export default Pizzas;
