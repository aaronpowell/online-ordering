import { Order, MenuItem, User } from "./graphql/generated/types"

export interface DataStore {
  // Query
  orders(userId: string): Order[]
  order(orderId: string): Order
  menuItems(offset: number): MenuItem[]
  menuItem(id: string): MenuItem
  user(userId: string): User

  // Mutate
  createOrder(userId: string | null, sessionId: string | null): Order
  addItemToOrder(
    orderId: string,
    menuItemId: string,
    quantity: number
  ): Order
}
