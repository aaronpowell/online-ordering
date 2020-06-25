import { menuItems } from "./menu"
import { orders } from "./order"
import { users } from "./user"
import { DataStore } from "../DataStore"
import { OrderState, UserInput } from "../../graphql/generated/types"
import { UserInputError } from "apollo-server-azure-functions"

const itemsPerPage = 5

class MockDataStoreImpl implements DataStore {
  // Query
  orders(userId: string) {
    return Promise.resolve(orders.filter((o) => o.userId === userId))
  }
  order(orderId: string) {
    return Promise.resolve(orders.find((o) => o.id === orderId))
  }
  menuItems(offset: number) {
    const items = menuItems.slice(offset, offset + itemsPerPage)

    return Promise.resolve(items.length ? items : null)
  }
  menuItem(id: string) {
    return Promise.resolve(menuItems.find((m) => m.id === id))
  }
  user(userId: string) {
    return Promise.resolve(users.find((u) => u.id === userId))
  }
  menuItemsByIds(ids: string[]) {
    return Promise.resolve(menuItems.filter((m) => ids.indexOf(m.id) >= 0))
  }
  currentOrderForUser(userId: string) {
    return Promise.resolve(
      orders.find((o) => o.userId === userId && o.state === OrderState.Ordering)
    )
  }

  // Mutation
  createOrder(userId: string, sessionId: string) {
    if (!userId && !sessionId) {
      throw new UserInputError(
        "Please provide either a user or session to create the order for"
      )
    }

    if (userId) {
      const user = users.find((u) => u.id === userId)
      if (!user) {
        throw new UserInputError("UserID did not match a valid user")
      }

      const order = {
        id: (orders.length + 1).toString(),
        userId: user.id,
        items: [],
        date: new Date(),
        price: 0,
        state: OrderState.Ordering,
        _type: "order",
        partitionKey: (orders.length + 1).toString(),
      }

      orders.push(order)
      return Promise.resolve(order)
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
        _type: "user",
        partitionKey: sessionId,
        phone: "",
      }

      users.push(user)
      const order = {
        id: (orders.length + 1).toString(),
        userId: user.id,
        items: [],
        date: new Date(),
        price: 0,
        state: OrderState.Ordering,
        partitionKey: (orders.length + 1).toString(),
        _type: "order",
      }

      orders.push(order)
      return Promise.resolve(order)
    }

    throw new Error(
      "The order could not be created using the provided information"
    )
  }
  addItemToOrder(orderId: string, menuItemId: string, quantity: number) {
    const order = orders.find((o) => o.id === orderId)

    if (!order) {
      throw new UserInputError("The order was not found in the system")
    }

    if (order.state !== OrderState.Ordering) {
      throw new UserInputError(
        "The order has passed the ordering phase and can't have new items added to it"
      )
    }

    const menuItem = menuItems.find((mi) => mi.id === menuItemId)

    if (!menuItem) {
      throw new UserInputError("That item isn't on the menu")
    }

    if (quantity < 1) {
      throw new UserInputError("Must add at least one of the item to the menu")
    }

    order.items.push({
      menuItemId: menuItem.id,
      menuItemName: menuItem.name,
      price: menuItem.price,
      quantity,
    })
    order.price = order.items.reduce(
      (price, item) => (price += item.price * quantity),
      0
    )

    return Promise.resolve(order)
  }

  submitOrder(orderId: string, inputUser: UserInput) {
    const order = orders.find((o) => o.id === orderId)

    if (!order) {
      throw new UserInputError("The order was not found in the system")
    }

    if (order.state !== OrderState.Ordering) {
      throw new UserInputError(
        "The order has passed the ordering phase and can't have new items added to it"
      )
    }

    order.state = OrderState.Placed

    const user = users.find((u) => u.id === order.userId)

    user.name = inputUser.name
    user.email = inputUser.email
    user.phone = inputUser.phone
    user.address = inputUser.address

    return Promise.resolve(order)
  }
}

export const dataStore: DataStore = new MockDataStoreImpl()
