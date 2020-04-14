import { ApolloServer } from "apollo-server-azure-functions"
import typeDefs from "./schema"
import resolvers from "./resolvers"

const server = new ApolloServer({ typeDefs, resolvers })
export default server.createHandler()
