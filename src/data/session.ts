import { v4 as uuid } from "uuid"
const SESSION_KEY = "ONLINE_ORDER_SESSION"

const getSession = () => {
  if (typeof localStorage === "undefined") {
    return uuid()
  }

  let sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId) {
    sessionId = uuid()
    localStorage.setItem(SESSION_KEY, sessionId)
  }

  return sessionId
}

const destroySession = () => {
  if (typeof localStorage === "undefined") {
    return
  }
  localStorage.removeItem(SESSION_KEY)
}

export { getSession, destroySession }
