import { Link } from "gatsby"
import React from "react"
import Cart from "./cart"

const Header: React.FC<{ siteTitle: string }> = (
  { siteTitle } = { siteTitle: "" }
) => (
  <header className="p-1 bg-gray-200 align-middle text-center">
    <h1 className="font-bold text-2xl inline-block">
      <Link to="/">{siteTitle}</Link>
    </h1>
    <div className="inline-block float-right pr-4">
      <Cart />
    </div>
  </header>
)

export default Header
