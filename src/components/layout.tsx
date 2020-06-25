import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.css"
import Header from "./header"
import OrderContext from "../context/OrderContext"
import { getSession, destroySession } from "../data/session"
import {
  OrderFieldsFragment,
  useCreateOrderMutation,
  useAddItemToOrderMutation,
  useCurrentOrderForUserLazyQuery,
} from "../graphql/generated"
import { client } from "../data/apollo"

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const sessionId = getSession()

  const [order, setOrder] = useState<OrderFieldsFragment>()
  const [createOrder] = useCreateOrderMutation({ client })
  const [addToCart] = useAddItemToOrderMutation({ client })

  const [
    getCurrentOrder,
    currentOrderResponse,
  ] = useCurrentOrderForUserLazyQuery({
    client,
  })

  useEffect(() => {
    if (!order) {
      getCurrentOrder({
        variables: {
          userId: sessionId,
        },
      })
    }
  }, [order, getCurrentOrder, sessionId])

  useEffect(() => {
    if (currentOrderResponse.data?.currentOrderForUser) {
      setOrder(currentOrderResponse.data?.currentOrderForUser)
    }
  }, [currentOrderResponse])

  return (
    <OrderContext.Provider
      value={{
        sessionId,
        order,
        addToCart: async (menuItemId, quantity) => {
          let mutatingOrder = order
          if (!mutatingOrder) {
            const response = await createOrder({
              variables: {
                sessionId: sessionId,
                userId: null,
              },
            })

            if (!response.errors && response.data?.createOrder) {
              mutatingOrder = response.data.createOrder
            } else {
              console.error(response)
              return
            }
          }

          const addResponse = await addToCart({
            variables: {
              orderId: mutatingOrder?.id,
              menuItemId,
              quantity,
            },
          })

          if (!addResponse.errors && addResponse.data?.addItemToOrder) {
            setOrder(addResponse.data.addItemToOrder)
          } else {
            console.error(addResponse)
          }
        },
        endSession: destroySession,
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="mx-auto max-w-full px-12">
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </OrderContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
