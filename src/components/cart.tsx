import React, { useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShoppingCart, faCartPlus } from "@fortawesome/free-solid-svg-icons"
import OrderContext from "../context/OrderContext"
import { Link } from "gatsby"

const Cart: React.FC = () => {
  const orderContext = useContext(OrderContext)

  if (orderContext.order) {
    return (
      <Link to="/cart">
        <FontAwesomeIcon icon={faCartPlus} />
      </Link>
    )
  }
  return <FontAwesomeIcon icon={faShoppingCart} />
}

export default Cart
