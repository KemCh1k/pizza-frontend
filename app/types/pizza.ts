export interface IPizza {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  isAdded?: boolean;
}
export interface ICartPizza extends IPizza {
  pizzaId: number;
  quantity: number;
}

export interface ICreateOrder {
  items: ICartPizza[];
  totalPrice: number;
  salePrice: number;
}

export interface IOrder extends ICreateOrder {
  id: number;
}
