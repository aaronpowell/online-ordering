import React, { useState } from "react"
import { OrderFieldsFragment, User } from "../../graphql/generated"
import Input from "./input"

type DeliveryOptionProps = {
  order: OrderFieldsFragment
  nextStep: () => void
}

const unpackAddress = (userDetails: User) =>
  userDetails.address || {
    address: "",
    state: "",
    postcode: "",
  }

const DeliveryOption: React.FC<DeliveryOptionProps> = ({ order }) => {
  const [userDetails, setUserDetails] = useState<User>({
    id: order.orderer.id,
    name: order.orderer.name,
    email: "",
    phone: "",
    address: {
      address: "",
      postcode: "",
      state: "",
    },
  })
  return (
    <div>
      <form className="w-full">
        <Input label="Name" id="name">
          <input
            id="name"
            type="text"
            value={userDetails.name}
            required
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Input>
        <Input label="Phone number" id="phone">
          <input
            id="phone"
            type="text"
            value={userDetails.phone || ""}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phone: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Input>
        <Input label="Email Address" id="email">
          <input
            id="email"
            type="email"
            value={userDetails.email}
            required
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Input>

        <Input label="Address" id="address">
          <input
            id="address"
            type="text"
            value={userDetails.address?.address}
            required
            onChange={(e) => {
              const address = unpackAddress(userDetails)
              setUserDetails({
                ...userDetails,
                address: { ...address, address: e.target.value },
              })
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Input>

        <Input label="State" id="state">
          <input
            id="state"
            type="text"
            value={userDetails.address?.state}
            required
            onChange={(e) => {
              const address = unpackAddress(userDetails)
              setUserDetails({
                ...userDetails,
                address: { ...address, state: e.target.value },
              })
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Input>

        <Input label="Postcode" id="postcode">
          <input
            id="postcode"
            type="text"
            value={userDetails.address?.postcode}
            required
            onChange={(e) => {
              const address = unpackAddress(userDetails)
              setUserDetails({
                ...userDetails,
                address: { ...address, postcode: e.target.value },
              })
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </Input>
      </form>
    </div>
  )
}

export default DeliveryOption
