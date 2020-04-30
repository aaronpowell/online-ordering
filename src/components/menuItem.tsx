import React, { useState, useContext } from "react"
import { MenuItemFragmentFragment } from "../graphql/generated"
import OrderContext from "../context/OrderContext"

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
  const { addToCart } = useContext(OrderContext)
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
          onClick={() => (quantity > 0 ? setQuantity(quantity - 1) : void 0)}
          title="Decrease quantity"
        >
          -
        </Button>
        <input
          type="number"
          value={quantity}
          title="Enter the quantity"
          className="m-2 border-gray-600 border-2 text-center w-1/2"
          min={0}
          onChange={(e) => {
            let quantity = Number(e.target.value)
            if (isNaN(quantity) || quantity < 0) {
              quantity = 0
            }
            setQuantity(quantity)
          }}
        />
        <Button
          onClick={() => setQuantity(quantity + 1)}
          title="Increase quantity"
        >
          +
        </Button>
      </div>
      <div className="mt-2">
        <button
          title="Add to order"
          className="bg-green-600 px-3 py-1 rounded-md shadow-lg text-white font-semibold uppercase tracking-wider"
          onClick={() => addToCart(item.id, quantity)}
          disabled={quantity === 0}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default MenuItem
