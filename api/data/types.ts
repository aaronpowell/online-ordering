import { Order, MenuItem, User } from "../graphql/generated/types"

interface Model {
  id: string
  _type: string
  partitionKey: string
}

export type OrderModel = Pick<Order, "id" | "date" | "price" | "state"> & {
  userId: string
  items: {
    menuItemId: string
    menuItemName: string
    price: number
    quantity: number
  }[]
} & Model

export type OrderUserMapping = {
  orderId: string
  partitionKey: string
} & Model

export type MenuItemModel = MenuItem & Model
export type UserModel = User & Model
