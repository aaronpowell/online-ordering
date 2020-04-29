import {
  QueryResolvers,
  Order,
  MutationResolvers,
  OrderResolvers,
} from "../generated/types"
import { IResolvers } from "apollo-server-azure-functions"
import { DataStore } from "../../data/DataStore"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
  Mutation: MutationResolvers
  Order: OrderResolvers
}

type ResolverContext = {
  dataStore: DataStore
}

const resolvers: Resolvers = {
  Query: {
    menu(_, { offset }, { dataStore }: ResolverContext) {
      return dataStore.menuItems(offset)
    },
    order(_, { id }, { dataStore }: ResolverContext) {
      return dataStore.order(id)
    },
    async orders(_, { userId }, { dataStore }: ResolverContext) {
      const orders = await dataStore.orders(userId)
      return orders.map((order) => Object.assign({}, order, { userId }))
    },
    user(_, { id }, { dataStore }: ResolverContext) {
      return dataStore.user(id)
    },
  },
  Mutation: {
    createOrder(_, { sessionId, userId }, { dataStore }: ResolverContext) {
      return dataStore.createOrder(userId, sessionId)
    },
    addItemToOrder(
      _,
      { orderId, menuItemId, quantity },
      { dataStore }: ResolverContext
    ) {
      return dataStore.addItemToOrder(orderId, menuItemId, quantity)
    },
  },

  Order: {
    orderer(
      order: Order & { userId: string },
      _,
      { dataStore }: ResolverContext
    ) {
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
