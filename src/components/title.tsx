import React from "react"

const Title: React.FC<{ title: string }> = ({ title }) => (
  <h2 className="text-center text-2xl font-semibold">{title}</h2>
)

export default Title
