import { createContext } from "react"
import getSession from "../data/session"
import { OrderFieldsFragment } from "../graphql/generated"

export type CartContextType = {
  addToCart: (itemId: string, quantity: number) => Promise<void>
  order?: OrderFieldsFragment
  userId?: string
  sessionId: string
}

const OrderContext = createContext<CartContextType>({
  addToCart(itemId, quantity) {
    throw new Error("Not implemented")
  },
  sessionId: getSession(),
})

export default OrderContext
