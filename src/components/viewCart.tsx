import React, { useContext } from "react"
import Loader from "./loader"
import OrderContext from "../context/OrderContext"
import ViewCartListing from "./viewCartListing"

const ViewCart: React.FC = () => {
  const { order } = useContext(OrderContext)

  if (!order) {
    return <Loader />
  }

  return (
    <div>
      <h2 className="text-center text-2xl font-semibold pb-5">Order up!</h2>
      <ViewCartListing order={order} />
    </div>
  )
}

export default ViewCart
