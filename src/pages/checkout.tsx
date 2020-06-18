import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import CheckoutComponent from "../components/checkout"

const Checkout: React.FC = () => {
  return (
    <Layout>
      <SEO title="Checkout" />
      <CheckoutComponent />
    </Layout>
  )
}

export default Checkout
