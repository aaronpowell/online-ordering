import { Order } from "../graphql/generated/types"

export type CosmosOrder = Pick<Order, "id" | "date" | "price" | "state"> & {
  userId: string
  items: {
    menuItemId: string
    menuItemName: string
    quantity: number
  }[]
}
