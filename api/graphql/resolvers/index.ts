import {
  QueryResolvers,
  MutationResolvers,
  OrderResolvers,
} from "../generated/types"
import { IResolvers } from "apollo-server-azure-functions"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
  Order: OrderResolvers
}

const resolvers: Resolvers = {
  Query: {
    menu(_, { offset }, { dataStore }) {
      return dataStore.menuItems(offset)
    },
    order(_, { id }, { dataStore }) {
      return dataStore.order(id)
    },
    async orders(_, { userId }, { dataStore }) {
      const orders = await dataStore.orders(userId)
      return orders.map((order) => Object.assign({}, order, { userId }))
    },
    user(_, { id }, { dataStore }) {
      return dataStore.user(id)
    },
  },
  Mutation: {
    createOrder(_, { sessionId, userId }, { dataStore }) {
      return dataStore.createOrder(userId, sessionId)
    },
    addItemToOrder(_, { orderId, menuItemId, quantity }, { dataStore }) {
      return dataStore.addItemToOrder(orderId, menuItemId, quantity)
    },
  },

  Order: {
    orderer(order, _, { dataStore }) {
      return dataStore.user(order.userId)
    },
    date(order) {
      return order.date
    },
    id(order) {
      return order.id
    },
    items(order) {
      return []
    },
    price(order) {
      return order.price
    },
    state(order) {
      return order.state
    },
  },
}

export default resolvers
