import React from "react"
import { OrderFieldsFragment } from "../../graphql/generated"

type PaymentProps = {
  order: OrderFieldsFragment
  nextStep: () => void
}

const Payment: React.FC<PaymentProps> = ({ order }) => {
  return <div>Payment</div>
}

export default Payment
