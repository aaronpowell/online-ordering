import { gql } from "apollo-server-azure-functions"

const typeDefs = gql`
  type Query {
    hello: String
    more: Int
    again: String
  }
`

export default typeDefs
