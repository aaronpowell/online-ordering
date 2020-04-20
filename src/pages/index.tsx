import React from "react"
import ApolloClient from "apollo-boost"
import { useFindOrdersForUserQuery } from "../graphql/generated"

const client = new ApolloClient({
  uri: `${process.env.GATSBY_BACKEND_URI || ""}/api/graphql`,
})

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage: React.FC = () => {
  const { data, loading } = useFindOrdersForUserQuery({
    client,
    variables: {
      userId: "aaronpowell",
    },
  })

  console.log({ data, loading })

  return (
    <Layout>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
