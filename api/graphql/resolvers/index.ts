import { QueryResolvers, MenuItem, Order, User } from "../generated/types"
import { IResolvers } from "apollo-server-azure-functions"
import { menuItems, orders, users } from "../../mock-data"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
}

const itemsPerPage = 5

const resolvers: Resolvers = {
  Query: {
    menu(_, { offset }): MenuItem[] {
      const items = menuItems.slice(offset, offset + itemsPerPage)

      return items.length ? items : null
    },
    menuItem(_, { id }): MenuItem {
      return menuItems.find(items => items.id === id)
    },

    order(_, { id }): Order {
      return orders.find(order => order.id === id)
    },
    orders(_, { userId }): Order[] {
      return orders.filter(order => order.orderer.id === userId)
    },
    user(_, { id }): User {
      return users.find(user => user.id === id)
    },
  },
}

export default resolvers
