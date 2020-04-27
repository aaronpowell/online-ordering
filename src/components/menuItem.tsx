import React, { useState } from "react"
import { MenuItemFragmentFragment } from "../graphql/generated"

type MenuItemProps = {
  item: MenuItemFragmentFragment
}

const Button: React.FC<{ onClick: () => void; title: string }> = ({
  onClick,
  title,
  children,
}) => (
  <button
    onClick={onClick}
    title={title}
    className="px-3 py-1 rounded-md shadow-lg bg-gray-400 text-sm text-black"
  >
    {children}
  </button>
)

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(0)
  return (
    <div className="w-1/3 p-2 text-gray-700 object-center text-center">
      <h3 className="font-bold text-lg">{item.name}</h3>
      <p>{item.description}</p>
      {item.picture && (
        <img
          src={item.picture}
          alt={item.name}
          className="mx-auto shadow-lg mt-2"
        />
      )}
      <div className="mt-2">
        <Button
          onClick={(): void =>
            quantity > 0 ? setQuantity(quantity - 1) : void 0
          }
          title="Decrease quantity"
        >
          -
        </Button>
        <input
          type="number"
          value={quantity}
          title="Enter the quantity"
          className="m-2 border-gray-600 border-2 text-center w-1/2"
        />
        <Button
          onClick={(): void => setQuantity(quantity + 1)}
          title="Increase quantity"
        >
          +
        </Button>
      </div>
      <div className="mt-2">
        <button
          title="Add to order"
          className="bg-green-600 px-3 py-1 rounded-md shadow-lg text-white font-semibold uppercase tracking-wider"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default MenuItem
