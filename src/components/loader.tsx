import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import "./loader.css"

const Loader: React.FC = () => (
  <div className="spinner">
    <FontAwesomeIcon icon={faSpinner} />
  </div>
)

export default Loader
