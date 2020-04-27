import {
  QueryResolvers,
  MenuItem,
  Order,
  User,
  MutationResolvers,
} from "../generated/types"
import { IResolvers } from "apollo-server-azure-functions"
import { dataStore } from "../../mock-data"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
}

const resolvers: Resolvers = {
  Query: {
    menu(_, { offset }): MenuItem[] {
      return dataStore.menuItems(offset)
    },
    menuItem(_, { id }): MenuItem {
      return dataStore.menuItem(id)
    },

    order(_, { id }): Order {
      return dataStore.order(id)
    },
    orders(_, { userId }): Order[] {
      return dataStore.orders(userId)
    },
    user(_, { id }): User {
      return dataStore.user(id)
    },
  },
  Mutation: {
    createOrder(_, { sessionId, userId }): Order {
      return dataStore.createOrder(sessionId, userId)
    },
    addItemToOrder(_, { orderId, menuItemId, quantity }): Order {
      return dataStore.addItemToOrder(orderId, menuItemId, quantity)
    },
  },
}

export default resolvers
