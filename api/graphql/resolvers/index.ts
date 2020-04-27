import {
  QueryResolvers,
  MenuItem,
  Order,
  User,
  MutationResolvers,
  OrderState,
} from "../generated/types"
import { IResolvers, UserInputError } from "apollo-server-azure-functions"
import { menuItems, orders, users } from "../../mock-data"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
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
  Mutation: {
    createOrder(_, { sessionId, userId }): Order {
      if (!userId && !sessionId) {
        throw new UserInputError(
          "Please provide either a user or session to create the order for"
        )
      }

      if (userId) {
        const user = users.find(u => u.id === userId)
        if (!user) {
          throw new UserInputError("UserID did not match a valid user")
        }

        const order = {
          id: (orders.length + 1).toString(),
          orderer: user,
          items: [],
          date: new Date(),
          price: 0,
          state: OrderState.Ordering,
        }

        orders.push(order)
        return order
      }

      if (sessionId) {
        const user = {
          id: sessionId,
          email: "",
          name: "",
          address: {
            address: "",
            postcode: "",
            state: "",
          },
        }

        users.push(user)
        const order = {
          id: orders.length.toString(),
          orderer: user,
          items: [],
          date: new Date(),
          price: 0,
          state: OrderState.Ordering,
        }

        orders.push(order)
        return order
      }

      throw new Error(
        "The order could not be created using the provided information"
      )
    },
    addItemToOrder(_, { orderId, menuItemId, quantity }): Order {
      const order = orders.find(o => o.id === orderId)

      if (!order) {
        throw new UserInputError("The order was not found in the system")
      }

      if (order.state !== OrderState.Ordering) {
        throw new UserInputError(
          "The order has passed the ordering phase and can't have new items added to it"
        )
      }

      const menuItem = menuItems.find(mi => mi.id === menuItemId)

      if (!menuItem) {
        throw new UserInputError("That item isn't on the menu")
      }

      if (quantity < 1) {
        throw new UserInputError(
          "Must add at least one of the item to the menu"
        )
      }

      order.items.push({
        item: menuItem,
        quantity,
      })
      order.price = order.items.reduce(
        (price, item) => (price += item.item.price * quantity),
        0
      )

      return order
    },
  },
}

export default resolvers
