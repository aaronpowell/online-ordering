import { Order } from "../../graphql/generated/types"

export type CosmosOrder = Pick<Order, "id" | "date" | "price" | "state"> & {
  userId: string
  items: {
    menuItemId: string
    menuItemName: string
    quantity: number
  }[]
}

export type UserOrderMapping = {
  id: string
  orderId: string
  partitionKey: string
}
