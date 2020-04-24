import React from "react"
import { MenuItemFragmentFragment } from "../graphql/generated"

type MenuItemProps = {
  item: MenuItemFragmentFragment
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => (
  <div className="w-1/3 p-2 text-gray-700">
    <h3 className="font-bold text-lg">{item.name}</h3>
    <p>{item.description}</p>
    {item.picture && <img src={item.picture} alt={item.name} />}
  </div>
)

export default MenuItem
