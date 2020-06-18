import React, { useContext, useState } from "react"
import OrderContext from "../../context/OrderContext"
import Loader from "../loader"
import { OrderStep } from "./types"
import Title from "../title"
import DeliveryOption from "./deliveryOption"
import Payment from "./payment"

const Checkout: React.FC = () => {
  const { order } = useContext(OrderContext)
  const [orderStep, setStep] = useState(OrderStep.DeliveryOption)

  if (!order) {
    return <Loader />
  }

  return (
    <div>
      <Title title="Checkout" />
      {orderStep === OrderStep.DeliveryOption && (
        <DeliveryOption
          order={order}
          nextStep={() => setStep(OrderStep.Payment)}
        />
      )}

      {orderStep === OrderStep.Payment && (
        <Payment order={order} nextStep={() => setStep(OrderStep.Complete)} />
      )}
    </div>
  )
}

export default Checkout
