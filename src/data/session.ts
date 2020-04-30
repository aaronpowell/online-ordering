import { v4 as uuid } from "uuid"

const getSession = () => {
  let sessionId = localStorage.getItem("ONLINE_ORDER_SESSION")
  if (!sessionId) {
    sessionId = uuid()
    localStorage.setItem("ONLINE_ORDER_SESSION", sessionId)
  }

  return sessionId
}

export default getSession
