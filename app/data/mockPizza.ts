import type { IPizza } from "~/types/pizza";

export const pizzas: IPizza[] = [
  {
    id: 1,
    name: "Маргарита",
    description: "Классическая пицца с соусом и моцареллой",
    price: 450,
    image: "/img/margherita.jpg",
  },
  {
    id: 2,
    name: "Пепперони",
    description: "Пикантная пепперони и сыр моцарелла",
    price: 550,
    image: "/img/pepperoni.jpg",
  },
  {
    id: 3,
    name: "4 Сыра",
    description: "Моцарелла, дорблю, пармезан и гауда",
    price: 600,
    image: "/img/four-cheese.jpg",
  },
];
