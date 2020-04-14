import { ApolloServer, gql } from "apollo-server-azure-functions"

const typeDefs = gql`
  type Query {
    hello: string
  }
`
const resolvers = {
  Query: {
    hello(): string {
      return "Hello"
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
export default server.createHandler()
