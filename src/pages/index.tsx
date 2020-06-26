import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Menu from "../components/menu"

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <Menu />
    </Layout>
  )
}

export default IndexPage
