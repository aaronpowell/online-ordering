import {
  QueryResolvers,
  MenuItem,
  Order,
  User,
  MutationResolvers,
} from "../generated/types"
import { IResolvers } from "apollo-server-azure-functions"
import { dataStore } from "../../mock-data"
// import { dataStore } from "../../cosmos"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
}

const resolvers: Resolvers = {
  Query: {
    menu(_, { offset }): Promise<MenuItem[]> {
      return dataStore.menuItems(offset)
    },
    menuItem(_, { id }): Promise<MenuItem> {
      return dataStore.menuItem(id)
    },

    order(_, { id }): Promise<Order> {
      return dataStore.order(id)
    },
    orders(_, { userId }): Promise<Order[]> {
      return dataStore.orders(userId)
    },
    user(_, { id }): Promise<User> {
      return dataStore.user(id)
    },
  },
  Mutation: {
    createOrder(_, { sessionId, userId }): Promise<Order> {
      return dataStore.createOrder(userId, sessionId)
    },
    addItemToOrder(_, { orderId, menuItemId, quantity }): Promise<Order> {
      return dataStore.addItemToOrder(orderId, menuItemId, quantity)
    },
  },
}

export default resolvers
