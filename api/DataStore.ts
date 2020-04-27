import { Order, MenuItem, User } from "./graphql/generated/types"

export interface DataStore {
  // Query
  orders(userId: string): Promise<Order[]>
  order(orderId: string): Promise<Order>
  menuItems(offset: number): Promise<MenuItem[]>
  menuItem(id: string): Promise<MenuItem>
  user(userId: string): Promise<User>

  // Mutate
  createOrder(userId: string | null, sessionId: string | null): Promise<Order>
  addItemToOrder(
    orderId: string,
    menuItemId: string,
    quantity: number
  ): Promise<Order>
}
