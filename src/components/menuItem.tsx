import React from "react"
import { MenuItemFragmentFragment } from "../graphql/generated"

type MenuItemProps = {
  item: MenuItemFragmentFragment
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => <div>{item.name}</div>

export default MenuItem
