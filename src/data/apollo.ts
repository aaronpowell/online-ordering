import ApolloClient from "apollo-boost"

const client = new ApolloClient<object>({
  uri: `${process.env.GATSBY_BACKEND_URI || ""}/api/graphql`,
})

export { client }
