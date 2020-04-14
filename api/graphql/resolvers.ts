import { QueryResolvers } from "./generated-types"
import { IResolvers } from "apollo-server-azure-functions"

interface Resolvers extends IResolvers {
  Query: QueryResolvers
}

const resolvers: Resolvers = {
  Query: {
    hello(): string {
      return "Hello World"
    },
    more(): number {
      return 10
    },
    again(): string {
      return "Again"
    },
  },
}

export default resolvers
