import {
  QueryResolvers,
  MenuItem,
  Order,
  User,
  MutationResolvers,
  OrderResolvers,
  OrderItem,
  OrderState,
  QueryOrdersArgs,
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
    menu(_, { offset }, { dataStore }: ResolverContext): Promise<MenuItem[]> {
      return dataStore.menuItems(offset)
    },
    order(_, { id }, { dataStore }: ResolverContext): Promise<Order> {
      return dataStore.order(id)
    },
    async orders(
      _,
      { userId },
      { dataStore }: ResolverContext
    ): Promise<(Order & QueryOrdersArgs)[]> {
      const orders = await dataStore.orders(userId)
      return orders.map((order) => Object.assign({}, order, { userId }))
    },
    user(_, { id }, { dataStore }: ResolverContext): Promise<User> {
      return dataStore.user(id)
    },
  },
  Mutation: {
    createOrder(
      _,
      { sessionId, userId },
      { dataStore }: ResolverContext
    ): Promise<Order> {
      return dataStore.createOrder(userId, sessionId)
    },
    addItemToOrder(
      _,
      { orderId, menuItemId, quantity },
      { dataStore }: ResolverContext
    ): Promise<Order> {
      return dataStore.addItemToOrder(orderId, menuItemId, quantity)
    },
  },

  Order: {
    orderer(
      order: Order & QueryOrdersArgs,
      _,
      { dataStore }: ResolverContext
    ): Promise<User> {
      return dataStore.user(order.userId)
    },
    date(order): Date {
      return order.date
    },
    id(order): string {
      return order.id
    },
    items(order): OrderItem[] {
      return []
    },
    price(order): number {
      return order.price
    },
    state(order): OrderState {
      return order.state
    },
  },
}

export default resolvers
