import { Link } from "gatsby"
import React from "react"

const Header: React.FC<{ siteTitle: string }> = (
  { siteTitle } = { siteTitle: "" }
) => (
  <header className="p-1 bg-gray-200 align-middle text-center">
    <h1 className="font-bold text-2xl">
      <Link to="/">{siteTitle}</Link>
    </h1>
  </header>
)

export default Header
