import React, { useContext, useState, useEffect } from "react"
import Loader from "./loader"
import OrderContext from "../context/OrderContext"
import ViewCartListing from "./viewCartListing"
import Title from "./title"
import { useSubmitOrderMutation } from "../graphql/generated"
import { navigate } from "gatsby"

const createPaymentRequest = (price: number) => {
  const methods: PaymentMethodData = {
    supportedMethods: ["basic-card"],
    data: {
      supportedNetworks: ["visa", "mastercard", "amex"],
      supportedTypes: ["credit", "debit"],
    },
  }

  const paymentDetails: PaymentDetailsInit = {
    total: {
      label: "Order Amount",
      amount: {
        currency: "AUD",
        value: price + "",
      },
    },
  }

  const opts: PaymentOptions = {
    requestPayerName: true,
    requestPayerPhone: true,
    requestPayerEmail: true,
  }

  return new PaymentRequest([methods], paymentDetails, opts)
}

const ViewCart: React.FC = () => {
  const { order, endSession } = useContext(OrderContext)
  const [requestingPayment, setRequestingPayment] = useState(false)
  const [submitOrder] = useSubmitOrderMutation()

  useEffect(() => {
    async function process() {
      if (!order) {
        throw "Somehow we tried to process a payment without an order"
      }
      const paymentRequest = createPaymentRequest(order.price)

      const instrument = await paymentRequest.show()

      submitOrder({
        variables: {
          orderId: order.id,
          user: {
            name: instrument.payerName || "",
            email: instrument.payerEmail || "",
            phone: instrument.payerPhone,
            address: {
              address: instrument.shippingAddress?.addressLine[0] || "",
              postcode: instrument.shippingAddress?.postalCode || "",
              state: instrument.shippingAddress?.region || "",
            },
          },
        },
      })

      instrument.complete("success")

      endSession()

      navigate("/order-complete")
    }
    if (requestingPayment) {
      process()
    }
  }, [order, requestingPayment, submitOrder, endSession])

  if (!order) {
    return <Loader />
  }

  return (
    <div>
      <Title title="Order Up!" />
      <ViewCartListing order={order} />
      <div className="text-right mt-3">
        <button
          onClick={() => setRequestingPayment(true)}
          className="px-5 py-3 rounded-lg shadow-lg bg-teal-300 hover:bg-teal-400 text-center inline-block object-right cursor-pointer"
        >
          Submit Order
        </button>
      </div>
    </div>
  )
}

export default ViewCart
