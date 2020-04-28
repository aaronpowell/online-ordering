import { ApolloServer } from "apollo-server-azure-functions"
import { importSchema } from "graphql-import"
import resolvers from "./resolvers"

// import { dataStore } from "../data/mock-data"
import { dataStore } from "../data/cosmos"

const server = new ApolloServer({
  typeDefs: importSchema("./graphql/schema.graphql"),
  resolvers,
  context: {
    dataStore,
  },
})
export default server.createHandler()
