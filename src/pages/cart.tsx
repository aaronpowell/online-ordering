import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ViewCart from "../components/viewCart"

const CartPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="View Cart" />
      <ViewCart />
    </Layout>
  )
}

export default CartPage
