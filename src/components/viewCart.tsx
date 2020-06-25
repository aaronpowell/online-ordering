import React, { useContext, useState, useEffect } from "react"
import Loader from "./loader"
import OrderContext from "../context/OrderContext"
import ViewCartListing from "./viewCartListing"
import Title from "./title"
import {
  useSubmitOrderMutation,
  OrderFieldsFragment,
} from "../graphql/generated"
import { navigate } from "gatsby"
import { client } from "../data/apollo"

enum ShippingOption {
  PickUp = "pickup",
  Delivery = "delivered",
}

const makePaymentDetails = (
  order: OrderFieldsFragment,
  shippingOption: ShippingOption
) => {
  const shippingOptions = [
    {
      id: ShippingOption.PickUp,
      label: "Pick-up",
      amount: { currency: "AUD", value: "0.00" },
      selected: shippingOption === ShippingOption.PickUp,
    },
    {
      id: ShippingOption.Delivery,
      label: "Uber/Deliveroo/etc.",
      amount: { currency: "AUD", value: "5.00" },
      selected: shippingOption === ShippingOption.Delivery,
    },
  ]

  const paymentDetails: PaymentDetailsInit = {
    total: {
      label: "Order Amount",
      amount: {
        currency: "AUD",
        value:
          order.price +
          parseInt(
            shippingOptions.find((o) => o.selected)?.amount.value || "0",
            10
          ) +
          "",
      },
    },
    displayItems: order.items.map((item) => {
      return {
        label: item.item.name,
        amount: {
          currency: "AUD",
          value: (item.quantity * item.item.price).toString(),
        },
      }
    }),
    shippingOptions,
  }
  return paymentDetails
}

const createPaymentRequest = (order: OrderFieldsFragment) => {
  const methods: PaymentMethodData = {
    supportedMethods: ["basic-card"],
    data: {
      supportedNetworks: ["visa", "mastercard", "amex"],
      supportedTypes: ["credit", "debit"],
    },
  }

  const paymentDetails = makePaymentDetails(order, ShippingOption.PickUp)

  const opts: PaymentOptions = {
    requestPayerName: true,
    requestPayerPhone: true,
    requestPayerEmail: true,
    requestShipping: true,
  }

  const request = new PaymentRequest([methods], paymentDetails, opts)

  request.addEventListener("shippingaddresschange", (evt) => {
    const e = evt as PaymentRequestUpdateEvent
    e.updateWith(Promise.resolve(paymentDetails))
  })

  request.addEventListener("shippingoptionchange", (evt) => {
    const e = evt as PaymentRequestUpdateEvent
    e.updateWith(
      makePaymentDetails(order, request.shippingOption as ShippingOption)
    )
  })

  return request
}

const ViewCart: React.FC = () => {
  const { order, endSession } = useContext(OrderContext)
  const [requestingPayment, setRequestingPayment] = useState(false)
  const [submitOrder] = useSubmitOrderMutation({ client })

  useEffect(() => {
    async function process() {
      if (!order) {
        throw "Somehow we tried to process a payment without an order"
      }
      const paymentRequest = createPaymentRequest(order)

      try {
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
      } catch (e) {
        setRequestingPayment(false)
      }
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
