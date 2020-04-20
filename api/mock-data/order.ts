import { Order, OrderState } from "../graphql/generated/types"
import { aaron, jane } from "./user"
import { menuItems } from "./menu"

const orders: Order[] = [
  {
    id: "1",
    orderer: aaron,
    items: [
      {
        item: menuItems[0],
        quantity: 1,
      },
    ],
    price: menuItems[0].price,
    state: OrderState.Placed,
    date: new Date(),
  },
  {
    id: "2",
    orderer: jane,
    items: [
      {
        item: menuItems[2],
        quantity: 1,
      },
      {
        item: menuItems[5],
        quantity: 1,
      },
    ],
    price: menuItems[2].price + menuItems[5].price,
    state: OrderState.Placed,
    date: new Date(),
  },
  {
    id: "3",
    orderer: aaron,
    items: [
      {
        item: menuItems[0],
        quantity: 1,
      },
      {
        item: menuItems[4],
        quantity: 1,
      },
      {
        item: menuItems[8],
        quantity: 1,
      },
      {
        item: menuItems[9],
        quantity: 1,
      },
    ],
    price: menuItems[0].price,
    state: OrderState.Complete,
    date: new Date(),
  },
]

export { orders }
