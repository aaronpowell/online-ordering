import { OrderState } from "../../graphql/generated/types"
import { aaron, jane } from "./user"
import { menuItems } from "./menu"
import { OrderModel } from "../types"

const orders: OrderModel[] = [
  {
    id: "order-1",
    userId: aaron.id,
    _type: "order",
    partitionKey: "order-1",
    items: [
      {
        menuItemId: menuItems[0].id,
        menuItemName: menuItems[0].name,
        price: menuItems[0].price,
        quantity: 1,
      },
    ],
    price: menuItems[0].price,
    state: OrderState.Placed,
    date: new Date(),
  },
  {
    id: "order-2",
    userId: aaron.id,
    _type: "order",
    partitionKey: "order-2",
    items: [
      {
        menuItemId: menuItems[0].id,
        menuItemName: menuItems[0].name,
        price: menuItems[0].price,
        quantity: 1,
      },
    ],
    price: menuItems[0].price,
    state: OrderState.Complete,
    date: new Date(),
  },
  {
    id: "order-3",
    userId: jane.id,
    _type: "order",
    partitionKey: "order-3",
    items: [
      {
        menuItemId: menuItems[0].id,
        menuItemName: menuItems[0].name,
        price: menuItems[0].price,
        quantity: 1,
      },
    ],
    price: menuItems[0].price,
    state: OrderState.Preparing,
    date: new Date(),
  },
]

export { orders }
