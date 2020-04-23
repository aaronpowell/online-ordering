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
    <h2>Menu</h2>
    {menu.map(item => (
      <MenuItem key={item.id} item={item} />
    ))}
    {hasMore && <button onClick={(): void => onLoadMore()}>Load More</button>}
  </div>
)

export default Menu
