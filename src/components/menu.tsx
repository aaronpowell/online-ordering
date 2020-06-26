import React, { useState } from "react"
import { useGetMenuItemsQuery } from "../graphql/generated"
import MenuItem from "./menuItem"
import Title from "./title"
import Loader from "./loader"

const Menu: React.FC = () => {
  const { data, loading, fetchMore } = useGetMenuItemsQuery()
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
  if (loading) {
    return <Loader />
  }
  if (!loading && data?.menu) {
    return (
      <div>
        <Title title="Menu" />
        <div className="flex flex-wrap content-center">
          {data.menu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
        {hasMore && (
          <div className="text-center">
            <button
              onClick={(): void => loadMore(data.menu?.length || 0)}
              className="px-5 py-3 rounded-lg shadow-lg bg-indigo-600 text-sm text-white uppercase tracking-wider font-semibold"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    )
  }

  return null
}

export default Menu
