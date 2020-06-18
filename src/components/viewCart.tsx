import React, { useContext } from "react"
import Loader from "./loader"
import OrderContext from "../context/OrderContext"
import ViewCartListing from "./viewCartListing"
import Title from "./title"

const ViewCart: React.FC = () => {
  const { order } = useContext(OrderContext)

  if (!order) {
    return <Loader />
  }

  return (
    <div>
      <Title title="Order Up!" />
      <ViewCartListing order={order} />
      <div className="text-right mt-3">
        <a
          href="/checkout"
          className="px-5 py-3 rounded-lg shadow-lg bg-teal-300 hover:bg-teal-400 text-center inline-block object-right cursor-pointer"
        >
          Submit Order
        </a>
      </div>
    </div>
  )
}

export default ViewCart
