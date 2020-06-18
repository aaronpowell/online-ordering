import React from "react"

type InputProps = {
  label: string
  id: string
}

const Input: React.FC<InputProps> = ({ label, id, children }) => {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/2">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <div className="md:w-1/3">{children}</div>
    </div>
  )
}

export default Input
