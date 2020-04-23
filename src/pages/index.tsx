import React from "react"
import ApolloClient from "apollo-boost"
import { useGetMenuItemsQuery } from "../graphql/generated"

const client = new ApolloClient({
  uri: `${process.env.GATSBY_BACKEND_URI || ""}/api/graphql`,
})

import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/loader"

const IndexPage: React.FC = () => {
  const { data, loading, fetchMore } = useGetMenuItemsQuery({
    client,
  })

  console.log({ data, loading })

  if (data?.menu) {
    setTimeout(() => {
      fetchMore({
        variables: {
          offset: data.menu?.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev
          }
          return Object.assign({}, prev, {
            menu: fetchMoreResult.menu,
          })
        },
      })
    }, 1000)
  }

  return (
    <Layout>
      <SEO title="Home" />
      {loading && <Loader />}
    </Layout>
  )
}

export default IndexPage
