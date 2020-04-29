import { MenuItem, User } from "../graphql/generated/types"
import { OrderModel } from "./types"

export interface DataStore {
  // Query
  orders(userId: string): Promise<OrderModel[]>
  order(orderId: string): Promise<OrderModel>
  menuItems(offset: number): Promise<MenuItem[]>
  menuItem(id: string): Promise<MenuItem>
  user(userId: string): Promise<User>

  // Mutate
  createOrder(
    userId: string | null,
    sessionId: string | null
  ): Promise<OrderModel>
  addItemToOrder(
    orderId: string,
    menuItemId: string,
    quantity: number
  ): Promise<OrderModel>
}

export type ResolverContext = {
  dataStore: DataStore
}
