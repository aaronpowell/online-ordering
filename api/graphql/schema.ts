import { gql } from "apollo-server-azure-functions"

const typeDefs = gql`
  scalar DateTime

  type MenuItem {
    id: ID!
    name: String!
    description: String!
    price: Float!
    glutenFree: Boolean!
    vegetarian: Boolean!
    notes: String
    ingredients: [String!]!
    picture: String
  }

  type Address {
    address: String!
    state: String!
    postcode: String!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    address: Address
  }

  type OrderItem {
    quantity: Int!
    item: MenuItem!
  }

  enum OrderState {
    Placed
    Preparing
    Ready
    Complete
  }

  type Order {
    id: ID!
    items: [OrderItem!]!
    state: OrderState!
    price: Float!
    date: DateTime
    orderer: User!
  }

  type MenuResult {
    items: [MenuItem!]
    page: Int!
    totalPages: Int!
  }

  type Query {
    menu(page: Int = 0): MenuResult!
    menuItem(id: ID): MenuItem
    findOrder(id: ID): Order
    findOrdersForUser(userId: ID): [Order!]!
  }
`

export default typeDefs
