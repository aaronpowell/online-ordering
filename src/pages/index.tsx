import React, { useState } from "react"
import { useGetMenuItemsQuery } from "../graphql/generated"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Loader from "../components/loader"
import Menu from "../components/menu"
import { client } from "../data/apollo"

const IndexPage: React.FC = () => {
  const { data, loading, fetchMore } = useGetMenuItemsQuery({
    client,
  })
  const [hasMore, setHasMore] = useState(true)

  const loadMore = (offset: number): void => {
    fetchMore({
      variables: {
        offset,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || !fetchMoreResult.menu) {
          setHasMore(false)
          return prev
        }

        return Object.assign({}, prev, {
          menu: (prev.menu || []).concat(fetchMoreResult.menu),
        })
      },
    })
  }

  return (
    <Layout>
      <SEO title="Home" />
      {loading && <Loader />}
      {!loading && data?.menu && (
        <Menu
          menu={data.menu}
          onLoadMore={loadMore.bind(null, data.menu?.length || 0)}
          hasMore={hasMore}
        />
      )}
    </Layout>
  )
}

export default IndexPage
