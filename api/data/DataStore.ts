import { OrderModel, UserModel, MenuItemModel } from "./types"
import { UserInput } from "../graphql/generated/types"

export interface DataStore {
  // Query
  orders(userId: string): Promise<OrderModel[]>
  order(orderId: string): Promise<OrderModel>
  menuItems(offset: number): Promise<MenuItemModel[]>
  menuItem(id: string): Promise<MenuItemModel>
  user(userId: string): Promise<UserModel>
  menuItemsByIds(ids: string[]): Promise<MenuItemModel[]>
  currentOrderForUser(userId: string): Promise<OrderModel>

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
  submitOrder(orderId: string, user: UserInput): Promise<OrderModel>
}

export type ResolverContext = {
  dataStore: DataStore
}
