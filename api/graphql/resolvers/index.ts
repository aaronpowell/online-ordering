import { QueryResolvers, Menu, MenuItem, Order, User } from "../generated/types"
import { IResolvers } from "apollo-server-azure-functions"
import { menuItems, orders, users } from "../../mock-data"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
}

const itemsPerPage = 5

const resolvers: Resolvers = {
  Query: {
    menu(_, { page }): Menu {
      const items = menuItems.slice(
        itemsPerPage * page,
        itemsPerPage * page + itemsPerPage
      )

      return {
        page: page,
        totalPages: Math.floor(menuItems.length / itemsPerPage) - 1,
        items,
      }
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
