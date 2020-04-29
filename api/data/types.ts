import { Order } from "../graphql/generated/types"

export type OrderModel = Pick<Order, "id" | "date" | "price" | "state"> & {
  userId: string
  items: {
    menuItemId: string
    menuItemName: string
    price: number
    quantity: number
  }[]
}

export type UserOrderMapping = {
  id: string
  orderId: string
  partitionKey: string
}
