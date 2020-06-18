import React from "react"
import { OrderFieldsFragment } from "../graphql/generated"
import { formatPrice } from "../numberUtils"
type ViewCartListingProps = {
  order: OrderFieldsFragment
}
const ViewCartListing: React.FC<ViewCartListingProps> = ({ order }) => {
  const { items } = order
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="border px-4 py-2">Item Name</th>
          <th className="border px-4 py-2">Price</th>
          <th className="border px-4 py-2">Quantity</th>
          <th className="border px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {!items.length && (
          <tr>
            <td colSpan={4} className="border px-4 py-2">
              Nothing in the cart
            </td>
          </tr>
        )}

        {items.length &&
          items.map((lineItem, i) => (
            <tr key={lineItem.item.id} className={i % 2 ? "bg-gray-200" : ""}>
              <td className="border px-4 py-2 text-right">
                {lineItem.item.name}
              </td>
              <td className="border px-4 py-2 text-center">
                ${lineItem.item.price}
              </td>
              <td className="border px-4 py-2 text-center">
                {lineItem.quantity}
              </td>
              <td className="border px-4 py-2 bg-green-200 text-center">
                {formatPrice(lineItem.quantity * lineItem.item.price)}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <th colSpan={3} className="border px-4 py-2 text-right">
          Order Total:
        </th>
        <th className="border px-4 py-2 bg-green-300">
          {formatPrice(order.price)}
        </th>
      </tfoot>
    </table>
  )
}

export default ViewCartListing
