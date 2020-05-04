import React, { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import OrderContext from "../context/OrderContext"

const Cart: React.FC = () => {
  const orderContext = useContext(OrderContext)

  if (orderContext.order) {
    return <FontAwesomeIcon icon={faCartPlus} />
  }
  return <FontAwesomeIcon icon={faShoppingCart} />
}

export default Cart
