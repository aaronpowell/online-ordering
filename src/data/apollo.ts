import { ApolloClient } from "apollo-client"
import { createHttpLink } from "apollo-link-http"
import { InMemoryCache } from "apollo-cache-inmemory"
import "isomorphic-fetch"

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: `${process.env.GATSBY_BACKEND_URI || ""}/api/graphql`,
  }),
  cache: new InMemoryCache(),
})

export { client }
