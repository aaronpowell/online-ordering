import React from "react"
import { MenuItemFragmentFragment } from "../graphql/generated"
import MenuItem from "./menuItem"

type MenuProps = {
  menu: MenuItemFragmentFragment[]
  onLoadMore: () => void
  hasMore: boolean
}

const Menu: React.FC<MenuProps> = ({ menu, onLoadMore, hasMore }) => (
  <div>
    <h2 className="text-center text-2xl font-semibold">Menu</h2>
    <div className="flex flex-wrap content-center">
      {menu.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
    {hasMore && (
      <div className="text-center">
        <button
          onClick={(): void => onLoadMore()}
          className="px-5 py-3 rounded-lg shadow-lg bg-indigo-600 text-sm text-white uppercase tracking-wider font-semibold"
        >
          Load More
        </button>
      </div>
    )}
  </div>
)

export default Menu
